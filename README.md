# Impulso.IA — Landing Page

Landing page premium (dark, conversão otimizada) para o serviço de **Implantação de IA para Pequenos Negócios e Profissionais Autônomos**.

## 🎯 Copy & Estrutura

- **Framework Hormozi $100M**: lead value, oferta, garantia, escassez
- **Estrutura AIDA + PAS** (Problem-Agitate-Solution)
- **8 blocos**: Hero · Dor · Solução (3 passos) · Valor incluso · Autoridade · Garantia · FAQ · CTA final

## 🛠 Stack

- HTML5 semântico
- CSS3 puro (variáveis, grid, flexbox, animações, glassmorphism)
- JavaScript vanilla (zero dependência)
- Fontes: Inter + JetBrains Mono via Google Fonts
- Sem build step. Hospeda em qualquer lugar (Vercel, Netlify, GitHub Pages, S3, etc.)

## 📁 Arquivos

```
implantacao-ia-landing/
├── index.html       # Página completa
├── style.css        # Design system + tema dark premium
├── script.js        # Reveal, máscara WhatsApp, form
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

Acesse `http://localhost:8000`.

## 🔌 Integração do formulário

O `script.js` simula o submit e loga o lead no console. Para integrar com serviço real, substitua o `setTimeout` por:

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
      DESAFIO: data.desafio,
    },
    listIds: [LISTA_PRINCIPAL_ID],
  }),
});
```

## 🎨 Customização rápida

- **Cores da marca**: edite as variáveis CSS em `:root` no `style.css` (`--accent`, `--accent-2`, etc.)
- **Preço / oferta**: procure `R$ 397` no `index.html`
- **Logo / nome**: procure `Impulso.IA` no `index.html`
- **WhatsApp de contato**: adicione link `https://wa.me/55...` no botão CTA

## 📊 Conversão — ajustes finos

- A/B test de headline (já tem 2 variantes no `.hero__title`)
- Adicionar pixel Meta / Google Ads antes do `</head>`
- Adicionar Schema.org `FAQPage` no JSON-LD pra SEO
- Lazy load do Google Fonts com `display=swap` (já configurado)

## 📜 Licença

MIT — use, modifique, venda.