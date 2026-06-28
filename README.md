# Impulso.IA — Landing Page + Portal do Aluno

Landing page premium + portal do aluno + integração Brevo para o serviço de **Implantação de IA para Pequenos Negócios e Profissionais Autônomos**.

## 🎯 Páginas

| Rota | Arquivo | Tema | Objetivo |
|---|---|---|---|
| `/` | `index.html` | Dark | Versão completa (autoridade, 3 tiers, cases, FAQ) |
| `/light.html` | `light.html` | **Branco** | Versão clara, decisão rápida |
| `/portal/` | `portal/login.html` | Dark | Login/cadastro |
| `/portal/dashboard.html` | `portal/dashboard.html` | Dark | Visão geral + progresso do aluno |
| `/portal/curso.html` | `portal/curso.html` | Dark | Conteúdo do curso (6 módulos + 3 bônus) |
| `/portal/modulo.html?id=X` | `portal/modulo.html` | Dark | Player de aula individual |
| `/api/leads` | `api/leads.js` | — | **Serverless function**: recebe form e envia pro Brevo |

## 🎯 Estrutura do Curso (23 aulas · ~8h)

**Módulo 1 — Fundamentos** (Dia 1)
- 1.1 O que IA pode (e não pode) fazer pelo seu negócio
- 1.2 Os 3 tipos de IA que importam pra você
- 1.3 Matriz impacto × esforço: por onde começar

**Módulo 2 — Mapeamento do Seu Negócio** (Dia 2-3)
- 2.1 Auditoria de tempo: onde vai sua semana
- 2.2 Como mapear tarefas repetitivas
- 2.3 Lista de ferramentas por função

**Módulo 3 — Prompts que Convertem** (Dia 4-5) — 5 aulas
- 200 prompts prontos (atend., vendas, conteúdo, admin)

**Módulo 4 — Agentes de IA** (Dia 6-8) — 5 aulas
- Atendimento WhatsApp, vendas, conteúdo + few-shot training

**Módulo 5 — Automações** (Dia 9-11) — 4 aulas
- Make × n8n × Zapier + 5 templates prontos + integração CRM

**Módulo 6 — Métricas & Escala** (Dia 12-14) — 4 aulas
- ROI, dashboard, roadmap 90 dias, treinamento de equipe

**🎁 Bônus (3 casos reais):**
- Clínica odontológica · 30 min
- Escritório de advocacia · 28 min
- Agência de marketing · 32 min

## 📁 Arquivos

```
implantacao-ia-landing/
├── index.html              # Landing dark completa
├── light.html              # Landing clara (light)
├── style.css               # Tema dark
├── style-light.css         # Tema claro
├── script.js               # Form submit → /api/leads + interações
├── api/
│   └── leads.js            # Serverless: cria contato + dispara e-mail no Brevo
├── portal/
│   ├── login.html          # Auth (cadastro/entrada)
│   ├── dashboard.html      # Dashboard do aluno
│   ├── curso.html          # Lista de módulos
│   ├── modulo.html         # Player de aula
│   ├── style-portal.css    # CSS do portal
│   ├── course-data.js      # Dados do curso + storage helpers
│   └── portal-helpers.js   # Sidebar + logout + auth guard
├── package.json
├── vercel.json
└── README.md
```

## 🔌 Integração Brevo

A landing coleta leads via `/api/leads` (serverless function). A função:

1. **Valida** o payload (nome, whatsapp, email, segmento obrigatórios)
2. **Cria/atualiza o contato** no Brevo (`POST /v3/contacts`) com atributos personalizados:
   - `NOME`, `WHATSAPP`, `WHATSAPP_E164`, `SEGMENTO`, `TAMANHO`, `DESAFIO`
   - `TIER` (light/full/pro), `PAGE_VERSION` (full/light), `SOURCE`, `LEAD_AT`
3. **Adiciona à lista** de leads (se `BREVO_LIST_ID` configurado)
4. **Dispara e-mail de boas-vindas** se `BREVO_WELCOME_TEMPLATE` configurado (id de template Brevo)

### Env vars no Vercel (configuradas):

```bash
BREVO_API_KEY           # xkeysib-... (criptografada no painel)
BREVO_LIST_ID           # id numérico da lista no Brevo (0 = sem lista)
BREVO_FROM_EMAIL        # remetente (default: contato@impulsoia.com.br)
BREVO_FROM_NAME         # nome do remetente (default: Impulso.IA)
BREVO_WELCOME_TEMPLATE  # id do template de boas-vindas (opcional)
```

### Adicionar env var:

```bash
echo "xkeysib-..." | vercel env add BREVO_API_KEY production
vercel env add BREVO_LIST_ID production --value "5" --yes
```

### Setup no painel Brevo:

1. Acesse https://app.brevo.com → Contacts → Lists → crie uma lista "Leads Impulso.IA"
2. Copie o ID numérico da lista (Settings → List ID)
3. Configure `BREVO_LIST_ID` no Vercel
4. (Opcional) Crie um template transacional de boas-vindas → Marketing → Templates → pegue o ID
5. Configure `BREVO_WELCOME_TEMPLATE` no Vercel
6. Verifique o remetente em Settings → Senders & IP → adicione `contato@impulsoia.com.br`

## 🚀 Rodar localmente

```bash
npx serve .
```

Acesse:
- `http://localhost:3000` — landing dark
- `http://localhost:3000/light.html` — landing clara
- `http://localhost:3000/portal/login.html` — portal
- `http://localhost:3000/api/leads` — endpoint (POST só)

## 🔐 Auth do Portal (DEMO)

A auth atual é **client-side via localStorage** — basta colocar e-mail/senha pra entrar. **Não use em produção sem trocar por:**

- **Supabase** (recomendado) — auth + DB em 5min
- **NextAuth** + Postgres
- **Firebase Auth**
- **Clerk** (paid, mais polido)

Estrutura já tá pronta pra evoluir: o `AlunoStorage.getOrCreate()` é o único ponto que precisa ser trocado por uma chamada `fetch('/api/auth/login')`.

## 📊 Progresso do Aluno

O progresso é salvo em `localStorage` (`impulso_aluno_v1`):

```json
{
  "id": "aluno-email",
  "nome": "...",
  "email": "...",
  "plano": "full",
  "progress": {
    "m1-a1": true,
    "m1-a2": true,
    "m2-a1": true
  },
  "startedAt": "2026-06-28T..."
}
```

Pra produção, sincronizar com backend (Supabase `user_progress` table com `user_id + lesson_id + done_at`).

## 🛠 Stack

- HTML5 + CSS3 (zero framework CSS)
- JavaScript vanilla (zero dependência)
- Serverless Function (Node.js) pra /api/leads
- Brevo API v3 (REST)
- Hospedagem: Vercel
- Fontes: Inter via Google Fonts

## 📜 Licença

MIT — use, modifique, venda.