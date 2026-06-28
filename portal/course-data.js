/**
 * Dados do curso: "Implantação de IA — Do Zero ao Sistema Rodando (14 dias)"
 * 6 módulos + 3 aulas bônus, todos com aulas, durações e materiais.
 * Editável — pra adicionar/remover aulas basta mexer aqui.
 */
window.COURSE_DATA = {
  meta: {
    title: 'Implantação de IA — Do Zero ao Sistema Rodando',
    subtitle: '14 dias · 6 módulos · 23 aulas · 8h de conteúdo prático',
    instructor: 'Gabriel · Impulso.IA',
    certificateHours: 8,
  },
  modules: [
    {
      id: 'm1',
      num: '01',
      title: 'Fundamentos',
      subtitle: 'O que IA pode (e não pode) fazer pelo seu negócio',
      days: 'Dia 1',
      duration: '30 min',
      progress: 0,
      lessons: [
        { id: 'm1-a1', title: 'O que IA pode (e não pode) fazer pelo seu negócio', duration: '8 min', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        { id: 'm1-a2', title: 'Os 3 tipos de IA que importam pra você', duration: '12 min', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        { id: 'm1-a3', title: 'Matriz impacto × esforço: por onde começar', duration: '10 min', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      ],
      materials: [
        { name: '📄 Checklist: 10 perguntas pra decidir se uma tarefa vale IA', type: 'PDF' },
        { name: '🧮 Planilha: Matriz impacto × esforço (template editável)', type: 'XLSX' },
      ],
    },
    {
      id: 'm2',
      num: '02',
      title: 'Mapeamento do Seu Negócio',
      subtitle: 'Auditoria completa das suas tarefas',
      days: 'Dia 2–3',
      duration: '40 min',
      progress: 0,
      lessons: [
        { id: 'm2-a1', title: 'Auditoria de tempo: onde vai sua semana', duration: '15 min', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        { id: 'm2-a2', title: 'Como mapear tarefas repetitivas', duration: '12 min', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        { id: 'm2-a3', title: 'Lista de ferramentas por função (atend., vendas, conteúdo, admin)', duration: '13 min', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      ],
      materials: [
        { name: '📋 Template: Auditoria de tempo (7 dias)', type: 'XLSX' },
        { name: '📊 Mapa de tarefas automatizáveis', type: 'DOCX' },
        { name: '💰 Tabela comparativa de custos (Make × n8n × Zapier)', type: 'PDF' },
      ],
    },
    {
      id: 'm3',
      num: '03',
      title: 'Prompts que Convertem',
      subtitle: '200 prompts prontos pra copiar e colar',
      days: 'Dia 4–5',
      duration: '1h 20min',
      progress: 0,
      lessons: [
        { id: 'm3-a1', title: 'Anatomia de um prompt eficaz (estrutura PERC)', duration: '14 min', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        { id: 'm3-a2', title: '50 prompts de atendimento ao cliente', duration: '18 min', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        { id: 'm3-a3', title: '50 prompts de vendas e follow-up', duration: '20 min', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        { id: 'm3-a4', title: '50 prompts de conteúdo (Instagram, e-mail, blog)', duration: '16 min', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        { id: 'm3-a5', title: '50 prompts administrativos (planilha, relatório, proposta)', duration: '15 min', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      ],
      materials: [
        { name: '🎁 BÔNUS: Biblioteca com 200 prompts prontos (Notion + PDF)', type: 'NOTION' },
        { name: '📝 Template: estrutura PERC (Persona, Objetivo, Restrições, Contexto)', type: 'PDF' },
      ],
    },
    {
      id: 'm4',
      num: '04',
      title: 'Agentes de IA',
      subtitle: '3 agentes prontos pra usar no seu negócio',
      days: 'Dia 6–8',
      duration: '1h 30min',
      progress: 0,
      lessons: [
        { id: 'm4-a1', title: 'O que é um agente e quando vale a pena', duration: '10 min', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        { id: 'm4-a2', title: 'Agente de atendimento WhatsApp (passo a passo)', duration: '22 min', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        { id: 'm4-a3', title: 'Agente de vendas (qualificação + follow-up)', duration: '18 min', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        { id: 'm4-a4', title: 'Agente de conteúdo (posts, e-mails, roteiros)', duration: '16 min', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        { id: 'm4-a5', title: 'Como treinar no SEU tom de voz (few-shot examples)', duration: '14 min', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      ],
      materials: [
        { name: '🤖 Agente de atendimento (template configurável)', type: 'JSON' },
        { name: '🤖 Agente de vendas (template configurável)', type: 'JSON' },
        { name: '🤖 Agente de conteúdo (template configurável)', type: 'JSON' },
        { name: '📖 Guia: Few-shot training pra capturar seu tom de voz', type: 'PDF' },
      ],
    },
    {
      id: 'm5',
      num: '05',
      title: 'Automações',
      subtitle: 'Make / n8n — fluxos prontos pra copiar',
      days: 'Dia 9–11',
      duration: '1h 24min',
      progress: 0,
      lessons: [
        { id: 'm5-a1', title: 'Make × n8n × Zapier: qual usar e quando', duration: '12 min', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        { id: 'm5-a2', title: 'Conectando WhatsApp + planilha + e-mail', duration: '24 min', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        { id: 'm5-a3', title: '5 templates de automação prontos (JSON export)', duration: '28 min', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        { id: 'm5-a4', title: 'Integração com seu CRM (HubSpot, RD, Pipedrive, Kommo)', duration: '20 min', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      ],
      materials: [
        { name: '⚙️ 5 fluxos de automação prontos (Make)', type: 'JSON' },
        { name: '⚙️ 5 fluxos de automação prontos (n8n)', type: 'JSON' },
        { name: '📊 Planilha: comparativo de ferramentas (preço, features, limites)', type: 'XLSX' },
      ],
    },
    {
      id: 'm6',
      num: '06',
      title: 'Métricas & Escala',
      subtitle: 'Medir ROI, montar dashboard, escalar com equipe',
      days: 'Dia 12–14',
      duration: '1h',
      progress: 0,
      lessons: [
        { id: 'm6-a1', title: 'Como medir ROI de IA (fórmula + 5 indicadores)', duration: '12 min', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        { id: 'm6-a2', title: 'Dashboard de acompanhamento (Notion + planilha)', duration: '15 min', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        { id: 'm6-a3', title: 'Roadmap dos próximos 90 dias', duration: '14 min', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        { id: 'm6-a4', title: 'Como treinar a equipe pra usar IA no dia a dia', duration: '18 min', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      ],
      materials: [
        { name: '📊 Dashboard template (Notion + Google Sheets)', type: 'NOTION' },
        { name: '📈 Planilha: ROI de IA por área', type: 'XLSX' },
        { name: '🗓️ Roadmap 90 dias (template editável)', type: 'DOCX' },
        { name: '🎓 Guia de onboarding interno (treinar equipe)', type: 'PDF' },
      ],
    },
  ],
  bonus: [
    {
      id: 'b1',
      title: 'Caso real — Clínica odontológica',
      duration: '30 min',
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      desc: 'Como a Dra. Renata economizou 22h/semana automatizando confirmação de consultas, follow-up pós-procedimento e lembretes.',
    },
    {
      id: 'b2',
      title: 'Caso real — Escritório de advocacia',
      duration: '28 min',
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      desc: 'Como o Lucas cortou R$ 4.800/mês substituindo uma assistente por agente de IA que faz triagem de clientes e gera minutas.',
    },
    {
      id: 'b3',
      title: 'Caso real — Agência de marketing',
      duration: '32 min',
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      desc: 'Como a Camila triplicou a produção de conteúdo da agência usando IA na operação, sem perder a identidade visual da marca.',
    },
  ],
};

// ============================================
// STORAGE — progresso do aluno via localStorage
// ============================================
window.AlunoStorage = {
  KEY: 'impulso_aluno_v1',

  load() {
    try {
      const raw = localStorage.getItem(this.KEY);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  },

  save(data) {
    try { localStorage.setItem(this.KEY, JSON.stringify(data)); } catch {}
  },

  /** Garante que tem um objeto aluno válido. Auto-cadastra demo se não existir. */
  getOrCreate() {
    let aluno = this.load();
    if (!aluno) {
      aluno = {
        id: 'demo-' + Math.random().toString(36).slice(2, 9),
        nome: 'Aluno Demo',
        email: 'demo@impulsoia.com.br',
        plano: 'full',
        progress: {}, // { 'm1-a1': true, 'm2-a1': true, ... }
        startedAt: new Date().toISOString(),
      };
      this.save(aluno);
    }
    return aluno;
  },

  isDone(lessonId) {
    const aluno = this.load();
    return !!(aluno && aluno.progress && aluno.progress[lessonId]);
  },

  toggle(lessonId) {
    const aluno = this.load();
    if (!aluno) return false;
    aluno.progress = aluno.progress || {};
    aluno.progress[lessonId] = !aluno.progress[lessonId];
    this.save(aluno);
    return aluno.progress[lessonId];
  },

  /** Calcula % de progresso geral */
  calcProgress(aluno, courseData) {
    const all = courseData.modules.flatMap((m) => m.lessons.map((l) => l.id));
    const bonus = courseData.bonus.map((b) => b.id);
    const total = all.length + bonus.length;
    const done = all.filter((id) => aluno.progress?.[id]).length
      + bonus.filter((id) => aluno.progress?.[id]).length;
    return total > 0 ? Math.round((done / total) * 100) : 0;
  },

  /** Calcula % por módulo */
  calcModuleProgress(module, aluno) {
    if (!module.lessons.length) return 0;
    const done = module.lessons.filter((l) => aluno.progress?.[l.id]).length;
    return Math.round((done / module.lessons.length) * 100);
  },
};