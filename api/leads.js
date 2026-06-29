/**
 * POST /api/leads
 *
 * Recebe um lead do formulário da landing page e:
 *  1. Cria/atualiza o contato no Brevo (CRM / lista de e-mails)
 *  2. Aplica atributos personalizados (tier, segmento, dor, versão da página)
 *  3. Adiciona o contato à lista padrão de leads quentes
 *  4. Dispara e-mail transacional de boas-vindas (opcional)
 *
 * Variáveis de ambiente necessárias (configurar via `vercel env add`):
 *  - BREVO_API_KEY         (obrigatório)
 *  - BREVO_LIST_ID         (opcional — id numérico da lista de leads)
 *  - BREVO_WELCOME_TEMPLATE (opcional — id numérico do template de boas-vindas)
 *  - BREVO_FROM_EMAIL      (opcional — padrão: contato@impulsoia.com.br)
 *  - BREVO_FROM_NAME       (opcional — padrão: Impulso.IA)
 *
 * Body esperado (JSON):
 *  {
 *    nome, whatsapp, email, segmento,
 *    tamanho?, desafio?, tier, version, source, ts
 *  }
 *
 * Resposta:
 *  200 { ok: true, brevoContactId?: string }
 *  400 { ok: false, error: "validation_error", message }
 *  500 { ok: false, error: "brevo_error", message }
 */

const BREVO_API = 'https://api.brevo.com/v3';

const DEFAULT_FROM_EMAIL = process.env.BREVO_FROM_EMAIL || 'contato@impulsoia.com.br';
const DEFAULT_FROM_NAME = process.env.BREVO_FROM_NAME || 'Impulso.IA';

// Util — resolve api key: env > erro
function getApiKey() {
  const k = process.env.BREVO_API_KEY;
  if (!k) throw new Error('BREVO_API_KEY não configurada');
  return k;
}

// Util — fetch wrapper com api-key
async function brevoFetch(path, init = {}) {
  const apiKey = getApiKey();
  const res = await fetch(`${BREVO_API}${path}`, {
    ...init,
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(init.headers || {}),
    },
  });
  const text = await res.text();
  let body;
  try { body = text ? JSON.parse(text) : {}; } catch { body = { raw: text }; }
  if (!res.ok) {
    const msg = body?.message || body?.error || res.statusText;
    const err = new Error(`Brevo ${res.status}: ${msg}`);
    err.status = res.status;
    err.brevoBody = body;
    throw err;
  }
  return body;
}

// Validação server-side do payload
function validate(data) {
  const required = ['nome', 'whatsapp', 'email', 'segmento'];
  const missing = required.filter((k) => !data[k] || !String(data[k]).trim());
  if (missing.length) {
    return { ok: false, error: 'validation_error', missing };
  }
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(data.email)) {
    return { ok: false, error: 'validation_error', missing: ['email (formato inválido)'] };
  }
  return { ok: true };
}

// Limpa WhatsApp: mantém só dígitos
function cleanPhone(whatsapp) {
  return String(whatsapp || '').replace(/\D/g, '');
}

// ============================================================
// HANDLER
// ============================================================
module.exports = async function handler(req, res) {
  // CORS — aceita só do próprio domínio + dev
  const origin = req.headers.origin || '';
  const allowed = [
    'https://implantacao-ia-landing.vercel.app',
    'https://impulsoia.com.br',
    'http://localhost:3000',
    'http://localhost:5500',
  ];
  if (allowed.some((a) => origin === a)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const data = req.body || {};
  const v = validate(data);
  if (!v.ok) {
    return res.status(400).json({ ok: false, ...v });
  }

  const phone = cleanPhone(data.whatsapp);
  const listId = parseInt(process.env.BREVO_LIST_ID || '0', 10);

  // 1. Cria / atualiza contato
  // ⚠️ Brevo valida atributos "WHATSAPP" como número E.164 — se a string tiver
  //    caracteres não-numéricos ou faltar o código do país, retorna 400.
  //    Solução: passar apenas o E.164 puro (55 + DDD + número) num campo
  //    dedicado, sem conflitar com o atributo nativo "WHATSAPP".
  const e164 = phone.startsWith('55') ? phone : `55${phone}`;

  const contactPayload = {
    email: data.email,
    attributes: {
      NOME: data.nome,
      SMS: e164,                  // Brevo aceita SMS como nº puro (E.164)
      WHATSAPP_E164: e164,        // atributo custom pra guardar no contato
      WHATSAPP_RAW: data.whatsapp || '',
      SEGMENTO: data.segmento,
      TAMANHO: data.tamanho || '',
      DESAFIO: data.desafio || '',
      TIER: data.tier || 'full',
      PAGE_VERSION: data.version || 'full',
      SOURCE: data.source || 'landing-impulso-ia',
      LEAD_AT: data.ts || new Date().toISOString(),
    },
    listIds: listId > 0 ? [listId] : [],
    updateEnabled: true,
  };

  let contact;
  try {
    contact = await brevoFetch('/contacts', {
      method: 'POST',
      body: JSON.stringify(contactPayload),
    });
  } catch (err) {
    // Brevo retorna 204 em sucesso (sem body) ou 200 com id
    if (err.brevoBody?.id) {
      contact = err.brevoBody;
    } else {
      console.error('[leads] Brevo contact error:', err.message, err.brevoBody);
      return res.status(500).json({
        ok: false,
        error: 'brevo_error',
        message: err.message,
      });
    }
  }

  // 2. Email de boas-vindas (se template configurado)
  const welcomeTemplateId = parseInt(process.env.BREVO_WELCOME_TEMPLATE || '0', 10);
  let emailSent = false;
  if (welcomeTemplateId > 0) {
    try {
      await brevoFetch('/smtp/email', {
        method: 'POST',
        body: JSON.stringify({
          templateId: welcomeTemplateId,
          to: [{ email: data.email, name: data.nome }],
          params: {
            nome: data.nome.split(' ')[0],
            tier: data.tier || 'full',
            segmento: data.segmento,
          },
          sender: { email: DEFAULT_FROM_EMAIL, name: DEFAULT_FROM_NAME },
          replyTo: { email: DEFAULT_FROM_EMAIL },
          tags: ['lead-form', `tier-${data.tier || 'full'}`, `version-${data.version || 'full'}`],
        }),
      });
      emailSent = true;
    } catch (err) {
      // Falha no e-mail NÃO bloqueia o lead — só loga
      console.warn('[leads] welcome email failed (non-blocking):', err.message);
    }
  }

  return res.status(200).json({
    ok: true,
    brevoContactId: contact?.id || null,
    emailSent,
  });
};