# Impulso.IA — Landing Page

Landing page premium (dark, conversão otimizada) para o serviço de **Implantação de IA para Pequenos Negócios e Profissionais Autônomos**.

## 🎯 Versões disponíveis

A landing tem **2 versões** com a mesma copy base mas abordagens diferentes:

| Página | URL | Objetivo | Tempo de decisão |
|---|---|---|---|
| **Completa** | `/` (`index.html`) | Mostrar autoridade, cases, FAQ detalhado, 3 tiers | 5–8 min |
| **Light** | `/light` (`light.html`) | Decisão rápida, copy enxuta, oferta única destacada | 2–3 min |

Ambas compartilham `style.css` + `script.js` e estão linkadas no nav (pill "Versão light" / "Versão completa").

## 🎯 Copy & Estrutura (v2.0 — Hormozi upgrade)

- **Value Equation**: Dream Outcome ↑ (15h/semana + R$ 3.2k/mês) · Likelihood ↑ (+120 clientes, 0 reembolsos) · Time ↓ (14 dias) · Effort ↓ (zero código)
- **Grand Slam Offer**:
  - 3 tiers (LIGHT R$ 1.497 · **FULL R$ 3.970 [78% escolhe]** · PRO R$ 7.970) preenchendo o Value Grid
  - Bônus empilhado: 3 agentes + 200 prompts + comunidade + mentorias + roadmap
  - Bônus semanal: **IA Masterclass Express** (R$ 997)
  - Stack visual de valor: R$ 30.197 → R$ 3.970 (87% off)
- **Garantia blindada** de 30 dias: 10h/semana OU R$ 1.500/mês — senão devolve 100%
- **Escassez real**: turma de 8/mês, "3 vagas restantes" com countdown implícito
- **Mechanism section**: explica POR QUE funciona (diferencial vs curso genérico)
- **Estrutura AIDA + PAS + Stack Reversal**

## 🛠 Stack

- HTML5 semântico
- CSS3 puro (variáveis, grid, flexbox, animações, glassmorphism)
- JavaScript vanilla (zero dependência)
- Fontes: Inter + JetBrains Mono via Google Fonts
- Sem build step. Hospeda em qualquer lugar (Vercel, Netlify, GitHub Pages, S3, etc.)

## 📁 Arquivos

```
implantacao-ia-landing/
├── index.html       # Landing completa (8 seções, 3 tiers)
├── light.html       # Landing enxuta (single-screen, decisão rápida)
├── style.css        # Design system + tema dark premium (v2.0)
├── script.js        # Reveal, máscara WhatsApp, form, tier tracking
├── package.json     # Scripts de dev/preview (opcional)
├── vercel.json      # Config de deploy
└── README.md        # Este arquivo
```

## 🚀 Rodar localmente

```bash
# Opção 1 — abrir direto
abrir index.html no browser

# Opção 2 — servidor estático
npx serve .
# ou
python -m http.server 8000
```

Acesse `http://localhost:8000` (completa) ou `http://localhost:8000/light.html` (light).

## 🔌 Integração do formulário

O `script.js` simula o submit e loga o lead no console com payload completo:

```json
{
  "nome": "...",
  "whatsapp": "(11) 99999-9999",
  "email": "...",
  "segmento": "Advocacia",
  "tamanho": "2 a 5 pessoas",
  "desafio": "...",
  "tier": "full",
  "page_version": "full | light",
  "source": "landing-impulso-ia",
  "ts": "2026-06-28T..."
}
```

Substitua o `setTimeout` por integração real:

- **Webhook n8n / Make**: `fetch(WEBHOOK_URL, { method: 'POST', body: JSON.stringify(payload) })`
- **Brevo / Mailchimp**: criar contato via API
- **Google Sheets via Apps Script**: POST pra endpoint do Apps Script
- **Supabase / Firebase**: insert em tabela `leads`

Exemplo Brevo:

```js
await fetch('https://api.brevo.com/v3/contacts', {
  method: 'POST',
  headers: { 'api-key': 'SUA_KEY', 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: data.email,
    attributes: {
      NOME: data.nome,
      WHATSAPP: data.whatsapp,
      SEGMENTO: data.segmento,
      TIER: data.tier,
      PAGE: data.page_version,
    },
    listIds: [LISTA_PRINCIPAL_ID],
  }),
});
```

## 🎨 Customização rápida

- **Cores da marca**: edite as variáveis CSS em `:root` no `style.css` (`--accent`, `--accent-2`, etc.)
- **Preço / oferta**: procure `R$ 397` ou `R$ 3.970` no `index.html`
- **Tier featured**: alterar classe `tier--featured` no `index.html`
- **Logo / nome**: procure `Impulso.IA` em ambos HTMLs
- **WhatsApp de contato**: adicione link `https://wa.me/55...` no botão CTA

## 📊 A/B Testing recomendado

- **Headline**: já tem estrutura pra testar (variant com "Pare de gastar" vs "Recupere 15h")
- **Versão completa vs light**: medir conversão por origem de tráfego (Meta Ads → light · Google Org → completa)
- **Tier featured**: trocar entre FULL e PRO e medir AOV
- **Bônus semanal**: trocar a cada 7 dias pra criar escassez real

## 📈 Tracking & pixels

Adicione antes do `</head>` em ambos os HTMLs:

```html
<!-- Meta Pixel -->
<script>...</script>

<!-- Google Tag Manager -->
<script>...</script>

<!-- Schema.org FAQPage (SEO) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [...]
}
</script>
```

## 📜 Licença

MIT — use, modifique, venda.