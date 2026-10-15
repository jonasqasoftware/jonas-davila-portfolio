/**
 * Conteúdo do portfólio em português (pt) e inglês (en).
 * Todo o texto visível da página vive aqui; app/portfolio.tsx só monta a estrutura.
 */

export type Lang = "pt" | "en";

type Chip = { label: string; strong: string; rest?: string };
type Job = {
  id: string;
  when: string;
  company: string;
  role: string;
  points: string[];
  chip?: Chip;
};
type Criterion = { href: string; label: string; value: string };
type CaseItem = {
  slug: string;
  title: string;
  question: string;
  summary: string;
  tags: string[];
};
type Lab = { title: string; repo: string; description: string; tags: string[] };
type Work = { meta: string; title: string; text: string; href: string; cta: string };
type Testimonial = { name: string; relation: string; quote: string };
type Education = { title: string; text: string; status?: string; cert?: boolean };
type SkillGroup = { title: string; chips: { label: string; core?: boolean }[] };

export type Content = {
  lang: Lang;
  htmlLang: string;
  nav: {
    label: string;
    home: string;
    skip: string;
    links: { href: string; label: string }[];
    cta: string;
    open: string;
    close: string;
    language: string;
  };
  hero: {
    label: string;
    roleA: string;
    roleB: string;
    facts: string[];
    tagline: string;
    intro: string;
    sub: string;
    whatsapp: string;
    cv: string;
    portraitAlt: string;
    vertical: string;
    captionTitle: string;
    captionStatus: string;
  };
  evidence: {
    label: string;
    figures: { value: string; accent?: string; label: string }[];
    note: string;
    head: string;
    run: string;
    criteria: Criterion[];
    foot: string;
  };
  experience: { title: string; lede: string; jobs: Job[] };
  about: { quote: string; quoteAccent: string; paragraphs: string[] };
  principles: { title: string; lede: string; chainLabel: string; chain: string[]; items: [string, string][] };
  skills: { title: string; lede: string; groups: SkillGroup[] };
  cases: { title: string; lede: string; items: CaseItem[]; read: string; code: string };
  labs: { title: string; lede: string; items: Lab[]; code: string };
  aima: {
    title: string;
    accent: string;
    lede: string;
    numbersBefore: string;
    numbersMiddle: string;
    numbersAfter: string;
    product: string;
    code: string;
    stagesLabel: string;
    stages: string[];
  };
  works: { title: string; items: Work[] };
  recommendations: { title: string; items: Testimonial[]; note?: string; cta: string };
  education: { title: string; items: Education[] };
  contact: {
    title: string;
    accent: string;
    lede: string;
    roles: string[];
    email: string;
    emailCta: string;
    whatsapp: string;
    whatsappCta: string;
    whatsappUrl: string;
    linkedinCta: string;
    githubCta: string;
    photoAlt: string;
  };
  footer: { left: string; right: string };
  newTab: string;
};

const WHATSAPP = "5551992632426";
const waUrl = (text: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

const repos = {
  expense: "expense-approval-quality-lab",
  change: "quality-change-intelligence-lab",
};

const labRepos = [
  "api-quality-engineering-lab",
  "sql-quality-checker",
  "subscription-change-quality-lab",
  "inventory-reservation-quality-lab",
];

export const pt: Content = {
  lang: "pt",
  htmlLang: "pt-BR",
  nav: {
    label: "Navegação principal",
    home: "Jonas Davila — início",
    skip: "Pular para o conteúdo",
    links: [
      { href: "#experiencia", label: "Experiência" },
      { href: "#sobre", label: "Sobre" },
      { href: "#cases", label: "Cases" },
      { href: "#aima", label: "AIMA 2.0" },
      { href: "#recomendacoes", label: "Recomendações" },
      { href: "#formacao", label: "Formação" },
    ],
    cta: "Falar comigo",
    open: "Abrir menu",
    close: "Fechar menu",
    language: "Idioma",
  },
  hero: {
    label: "Apresentação",
    roleA: "Senior QA Engineer ·",
    roleB: "Quality Engineer",
    facts: ["Porto Alegre, RS", "Remoto ou híbrido", "Inglês intermediário"],
    tagline: "Engenharia de qualidade para produtos mais confiáveis.",
    intro:
      "São mais de 17 anos em tecnologia, 10 deles dedicados à Qualidade de Software. Conecto estratégia baseada em risco, automação, APIs, performance, segurança, CI/CD e AI Quality para aumentar a confiança nas entregas.",
    sub: "Pós-graduando em Engenharia de Qualidade e Teste de Software pela PUC Minas, com estudos em IA aplicada à qualidade.",
    whatsapp: "Conversar no WhatsApp",
    cv: "Baixar currículo (PDF)",
    portraitAlt: "Jonas Davila, de óculos redondos e paletó xadrez, com a mão no queixo",
    vertical: "Porto Alegre · Brasil",
    captionTitle: "Quality Engineering",
    captionStatus: "Aberto a novas oportunidades",
  },
  evidence: {
    label: "Resumo do perfil no formato de um quality gate",
    figures: [
      { value: "17", accent: "+", label: "anos em tecnologia" },
      { value: "10", label: "anos em qualidade de software" },
      { value: "90%", accent: "−", label: "bugs em produção na KingHost" },
    ],
    note: "Cada critério do quality gate leva à seção que o comprova.",
    head: "quality-gate · perfil",
    run: "run 2026.10",
    criteria: [
      { href: "#experiencia", label: "Trajetória em QA", value: "10 anos · desde 2016" },
      { href: "#cases", label: "Estratégia baseada em risco", value: "2 cases públicos" },
      { href: "#competencias", label: "Automação web e mobile", value: "Playwright · Appium" },
      { href: "#job-spassu", label: "Produtos financeiros", value: "Itaú · Caixa · Banrisul" },
      { href: "#job-kinghost", label: "Impacto em produção", value: "−90% bugs" },
      { href: "#aima", label: "IA aplicada à qualidade", value: "GenAI testing · AIMA 2.0" },
    ],
    foot: "6 de 6 critérios com evidência",
  },
  experience: {
    title: "Experiência e impacto",
    lede: "Atuação dentro de empresas, com foco em resultado e redução de risco. Da mais recente para a mais antiga.",
    jobs: [
      {
        id: "job-spassu",
        when: "07/2025 — 07/2026",
        company: "SPASSU",
        role: "Senior QA Engineer · Senior Quality Automation Engineer · projeto Caixa Econômica Federal",
        points: [
          "Estruturou cobertura de testes em seis frentes (funcional, integração, regressão, segurança, desempenho e carga) para produtos financeiros digitais, com práticas OWASP.",
          "Aplicou IA generativa e prompt engineering na análise de cenários, investigação de problemas e geração de casos de teste, avaliando contexto, consistência e alucinações antes de usar cada resultado.",
          "Consolidou evidências técnicas e recomendações de qualidade para Produto e Tecnologia, com automações, simuladores, mocks e stubs na estratégia de testes.",
        ],
        chip: { label: "escopo:", strong: "6 frentes de teste", rest: "· OWASP · GenAI" },
      },
      {
        id: "job-qualitymap",
        when: "10/2024 — 05/2025",
        company: "QualityMap",
        role: "Engenheiro de Qualidade de Software Sênior · Team Leader · Prompt Engineer for Testing",
        points: [
          "Estruturou estratégias de qualidade alinhadas aos objetivos de negócio e definiu métricas para guiar a melhoria contínua dos processos de QA.",
          "Conduziu experimentos no QualityLAB com IA generativa aplicada a Quality Engineering, avaliando respostas, limitações e inconsistências de modelos na geração de cenários, análise de riscos e apoio à automação.",
          "Liderou avaliações de risco, auditorias de processo e ações corretivas, mediando decisões de qualidade entre clientes, times técnicos e negócio.",
        ],
        chip: { label: "papel:", strong: "Team Leader", rest: "· QualityLAB" },
      },
      {
        id: "job-hostgator",
        when: "04/2024 — 08/2024",
        company: "HostGator",
        role: "Engenheiro de Qualidade de Software Sênior · Automação",
        points: [
          "Fortaleceu a estratégia de automação e de testes de APIs, com testes de contrato, performance e segurança em APIs REST.",
          "Estruturou planos, documentação e métricas de qualidade alinhados a cada sprint, e apoiou inspeções de código para melhorar a manutenibilidade.",
        ],
        chip: { label: "impacto:", strong: "−20%", rest: "bugs em produção" },
      },
      {
        id: "job-itau",
        when: "05/2021 — 08/2023",
        company: "Itaú Unibanco",
        role: "Senior Quality Analyst · QA Automation",
        points: [
          "Automatizou cenários e jornadas de produtos financeiros e de pagamentos com Selenium, JUnit, Cucumber/BDD, Percy e Appium, em web e mobile.",
          "Executou testes de performance com JMeter, acompanhou indicadores no Tableau e colaborou com Engenharia e Produto do refinamento ao release.",
        ],
        chip: { label: "escopo:", strong: "web + mobile", rest: "· performance" },
      },
      {
        id: "job-thoughtworks",
        when: "04/2020 — 05/2021",
        company: "Thoughtworks",
        role: "Quality Analyst Consultant · QA Automation",
        points: [
          "Consultoria de Quality Engineering para clientes internacionais, com estratégia baseada em risco, testes exploratórios e automação com Postman, Insomnia, Jest e JavaScript.",
          "Facilitou discussões de qualidade e liderou melhorias em chapters e comunidades de prática.",
        ],
        chip: { label: "clientes:", strong: "Lenovo · PwC", rest: "América do Norte" },
      },
      {
        id: "job-kinghost",
        when: "09/2019 — 04/2020",
        company: "KingHost",
        role: "Quality Analyst · QA Automation",
        points: [
          "Estruturou a primeira frente de QA da empresa, com automação e validação de APIs e integrações.",
          "Reduziu um processo técnico de cerca de três dias para aproximadamente um minuto, com automação, versionamento e integração contínua.",
        ],
        chip: { label: "impacto:", strong: "−90%", rest: "bugs em produção" },
      },
      {
        id: "job-tag",
        when: "04/2019 — 09/2019",
        company: "TAG Livros",
        role: "Desenvolvedor Full Stack · QA Automation",
        points: [
          "Desenvolveu funcionalidades web com React, Node.js e PostgreSQL, com testes em Cypress: a base de engenharia que hoje sustenta a atuação em Quality Engineering.",
        ],
      },
      {
        id: "job-dbserver",
        when: "11/2016 — 01/2019",
        company: "DBServer",
        role: "Quality Analyst · QA Automation · projetos Banrisul e PROCERGS",
        points: [
          "Atuou em projetos do setor financeiro, para o Banrisul, e do setor público, para a PROCERGS.",
          "Planejou e executou testes funcionais, de APIs e integrações, além de testes de performance com JMeter e SoapUI.",
          "Investigou, documentou e comunicou defeitos em colaboração com as equipes de desenvolvimento.",
        ],
        chip: { label: "início em", strong: "QA", rest: "· APIs · performance" },
      },
      {
        id: "job-inicio",
        when: "06/2009 — 11/2016",
        company: "Início em tecnologia",
        role: "Suporte de TI · Performática (Compulab) e TOTVS (Personal Med)",
        points: [
          "Sete anos de suporte especializado a softwares de saúde para laboratórios e clínicas: diagnóstico de problemas, treinamento de usuários e análise de negócio.",
        ],
      },
    ],
  },
  about: {
    quote: "Qualidade não é produzida por testes.",
    quoteAccent: "É construída por decisões.",
    paragraphs: [
      "Minha trajetória combina engenharia, automação e liderança técnica para ampliar o papel da qualidade nas organizações. Estruturei frentes de QA do zero, atuei em produtos financeiros e plataformas de grande escala, e sempre traduzi sinais técnicos em decisões que fazem sentido para o negócio.",
      "Começo pelo risco do produto para escolher a estratégia e a camada de teste certa: unitária, integração, API, E2E, exploratória ou não funcional. Em sistemas com IA, também avalio consistência, contexto, confiabilidade e comportamentos inesperados.",
    ],
  },
  principles: {
    title: "Como penso Quality Engineering",
    lede: "Antes da execução, uma forma de pensar que atravessa todos os projetos abaixo.",
    chainLabel: "Como penso Quality Engineering",
    chain: ["Risco", "Evidência", "Decisão", "Confiança"],
    items: [
      ["Risco antes de volume", "Cobertura não se mede só pela quantidade de testes. O objetivo é ter mais informação sobre os riscos que realmente importam."],
      ["Automação é uma decisão de engenharia", "Automatizo quando feedback, repetibilidade, criticidade e custo de manutenção justificam o investimento. Não defendo automatizar tudo."],
      ["Quality Gates precisam de evidência", "Pipeline verde, sozinho, não garante produto confiável. Gates devem refletir risco, evidência, contexto e critérios de qualidade."],
      ["Qualidade vai além dos testes", "Inclui arquitetura, observabilidade, segurança, performance, acessibilidade, processos e experiência do usuário."],
      ["IA precisa de controles técnicos", "Prompts não substituem permissões, isolamento, validação, quality gates, observabilidade e aprovação humana quando necessária."],
    ],
  },
  skills: {
    title: "Da estratégia à execução técnica",
    lede: "As ferramentas em destaque são as que mais usei em projetos reais.",
    groups: [
      { title: "Estratégia de qualidade", chips: [{ label: "Risk-Based Testing", core: true }, { label: "Test Strategy", core: true }, { label: "Quality Engineering" }, { label: "Cobertura e métricas" }, { label: "Melhoria contínua" }] },
      { title: "AI Quality e GenAI Testing", chips: [{ label: "Prompt Engineering", core: true }, { label: "Avaliação de LLMs", core: true }, { label: "Alucinações e riscos" }, { label: "IA generativa em QA" }, { label: "Geração de cenários" }] },
      { title: "Automação", chips: [{ label: "Playwright", core: true }, { label: "Cypress", core: true }, { label: "Selenium", core: true }, { label: "Appium" }, { label: "Jest" }, { label: "JUnit" }, { label: "Cucumber / BDD" }, { label: "Percy" }] },
      { title: "APIs e não funcionais", chips: [{ label: "REST", core: true }, { label: "k6", core: true }, { label: "JMeter", core: true }, { label: "Postman" }, { label: "Contrato · OpenAPI" }, { label: "OWASP" }, { label: "Insomnia" }, { label: "SoapUI" }] },
      { title: "Engenharia e entrega", chips: [{ label: "TypeScript", core: true }, { label: "Java", core: true }, { label: "GitHub Actions", core: true }, { label: "JavaScript" }, { label: "Python" }, { label: "Go" }, { label: "Jenkins" }, { label: "Git" }, { label: "PostgreSQL" }] },
      { title: "Liderança e colaboração", chips: [{ label: "Mentoria", core: true }, { label: "Team Leader", core: true }, { label: "Facilitação" }, { label: "Stakeholders" }, { label: "Chapters e comunidades" }, { label: "Scrum" }] },
    ],
  },
  cases: {
    title: "Estratégia de qualidade aplicada, não só automação",
    lede: "Dois laboratórios públicos tratados como estudo de caso: problema, risco, estratégia e decisões de engenharia.",
    items: [
      {
        slug: repos.expense,
        title: "Expense Approval Quality Lab",
        question: "Quem pode decidir uma despesa, e o que acontece quando alguém tenta violar as regras de autorização ou de estado?",
        summary: "Estratégia de testes orientada a risco para um fluxo de aprovação de despesas, cobrindo E2E e API.",
        tags: ["Playwright", "TypeScript", "E2E", "API Testing", "Risk-Based Testing"],
      },
      {
        slug: repos.change,
        title: "Quality Change Intelligence Lab",
        question: "Quando não dá para executar tudo, o que verificar primeiro, e qual risco fica de fora?",
        summary: "Priorização de verificação a partir da mudança, deixando explícito o risco que permanece fora da execução.",
        tags: ["Go", "Risk-Based Testing", "Test Strategy", "GitHub Actions"],
      },
    ],
    read: "Ler o estudo de caso",
    code: "Ver código no GitHub",
  },
  labs: {
    title: "Outros laboratórios técnicos",
    lede: "Demais laboratórios públicos de Quality Engineering, cada um com código e CI no GitHub.",
    items: [
      { title: "API Quality Engineering Lab", repo: labRepos[0], description: "Testes funcionais, contrato OpenAPI, segurança, acessibilidade, performance com k6 e CI/CD.", tags: ["API Testing", "OpenAPI", "k6", "Segurança", "Acessibilidade", "CI/CD"] },
      { title: "SQL Quality Checker", repo: labRepos[1], description: "Python e SQLite para validar regras de negócio nos dados e gerar relatórios rastreáveis em CSV e HTML.", tags: ["SQL", "Python", "SQLite", "Qualidade de Dados"] },
      { title: "Subscription Change Quality Lab", repo: labRepos[2], description: "Cypress e JavaScript para alteração de assinaturas, com estado determinístico, login programático e resiliência de rede.", tags: ["Cypress", "JavaScript", "E2E", "Network Testing", "CI/CD"] },
      { title: "Inventory Reservation Quality Lab", repo: labRepos[3], description: "Selenium 4, Java e JUnit 5 para reserva de estoque, com Page Objects, Page Components, waits explícitos e CI.", tags: ["Selenium 4", "Java", "JUnit 5", "Page Objects", "CI/CD"] },
    ],
    code: "Ver código no GitHub",
  },
  aima: {
    title: "AIMA",
    accent: "2.0",
    lede: "Projeto autoral, hoje em Preview Edition. Nele exploro como Quality Engineering, indicadores, inteligência artificial e pensamento estratégico se conectam para transformar evidências e riscos em decisões melhores.",
    numbersBefore: "Reúne",
    numbersMiddle: "frameworks e",
    numbersAfter: "conceitos desenvolvidos em pesquisa, escrita e experimentação, com o código aberto no GitHub. É a evolução do artigo que publiquei no blog da Thoughtworks em 2020.",
    product: "Conhecer o AIMA 2.0",
    code: "Ver código no GitHub",
    stagesLabel: "Fluxo de decisão do AIMA",
    stages: ["Contexto", "Evidências", "Riscos", "Decisão", "Ação"],
  },
  works: {
    title: "Produção intelectual sobre Quality Engineering",
    items: [
      {
        meta: "Artigo · blog da Thoughtworks · dez/2020",
        title: "AIMA: How to increase the performance of QA Analysts through indicators",
        text: "Artigo original com a primeira versão do pensamento por trás do AIMA.",
        href: "https://www.thoughtworks.com/en-us/insights/blog/aima-how-increase-performance-qa-analysts-through-indicators",
        cta: "Ler o artigo",
      },
      {
        meta: "LinkedIn · contínuo",
        title: "Publicações sobre Quality Engineering",
        text: "Reflexões técnicas sobre risco, automação, IA aplicada à qualidade e confiabilidade de produtos.",
        href: "https://www.linkedin.com/in/jonasdavila/recent-activity/all/",
        cta: "Ver publicações no LinkedIn",
      },
    ],
  },
  recommendations: {
    title: "O que dizem sobre trabalhar comigo",
    items: [
      { name: "Ellen Aquino", relation: "Liderança direta", quote: "O Jonas tem uma maneira muito própria de olhar para a qualidade de software. Seu trabalho traz uma entrega consistente, mas também abre espaço para outras camadas: criatividade e experimentação." },
      { name: "Eros Luiz Garzuzi da Costa", relation: "QA Engineer · colega na HostGator", quote: "Junto com o Jonas conseguimos arquitetar e estruturar o projeto de automação utilizando o Cypress. Aprendi muito com ele na parte de padronização e boas práticas." },
      { name: "Thaís Ambrósio", relation: "QA Engineer · mentorada", quote: "Jonas é um mentor excepcional na área de testes de software. Sua capacidade de transmitir conhecimento de forma clara e eficaz é verdadeiramente admirável." },
    ],
    cta: "Ler todas no LinkedIn",
  },
  education: {
    title: "Formação e evolução contínua",
    items: [
      { title: "PUC Minas", text: "Pós-graduação em Engenharia de Qualidade e Teste de Software", status: "em andamento · 2026–2028" },
      { title: "ISTQB CTFL", text: "Certified Tester Foundation Level", cert: true },
      { title: "Unisinos", text: "Gestão da Tecnologia da Informação · 2015–2020" },
      { title: "QI Escola Técnica", text: "Técnico em Tecnologia da Informação · 2009–2013" },
      { title: "Web Accessibility for Developers", text: "Acessibilidade web para times de desenvolvimento" },
      { title: "Ética na IA Generativa", text: "Uso responsável de inteligência artificial" },
    ],
  },
  contact: {
    title: "Procurando experiência sênior em",
    accent: "Qualidade de Software?",
    lede: "Estou aberto a oportunidades em contextos que valorizem estratégia, automação, colaboração e qualidade orientada ao negócio.",
    roles: ["Senior QA Engineer", "Quality Engineer", "QA Automation Engineer", "Senior QA Analyst"],
    email: "E-mail",
    emailCta: "Enviar e-mail",
    whatsapp: "WhatsApp",
    whatsappCta: "Conversar no WhatsApp",
    whatsappUrl: waUrl("Olá, Jonas! Vi seu portfólio e gostaria de conversar sobre uma oportunidade."),
    linkedinCta: "Ver LinkedIn",
    githubCta: "Ver GitHub",
    photoAlt: "Jonas Davila encostado em uma parede de pedra, segurando a lapela do paletó",
  },
  footer: { left: "Jonas Davila · Quality Engineering", right: "Porto Alegre · Brasil" },
  newTab: "(abre em nova aba)",
};

export const en: Content = {
  lang: "en",
  htmlLang: "en",
  nav: {
    label: "Main navigation",
    home: "Jonas Davila — home",
    skip: "Skip to content",
    links: [
      { href: "#experiencia", label: "Experience" },
      { href: "#sobre", label: "About" },
      { href: "#cases", label: "Cases" },
      { href: "#aima", label: "AIMA 2.0" },
      { href: "#recomendacoes", label: "Recommendations" },
      { href: "#formacao", label: "Education" },
    ],
    cta: "Get in touch",
    open: "Open menu",
    close: "Close menu",
    language: "Language",
  },
  hero: {
    label: "Introduction",
    roleA: "Senior QA Engineer ·",
    roleB: "Quality Engineer",
    facts: ["Porto Alegre, Brazil", "Remote or hybrid", "Intermediate English"],
    tagline: "Quality engineering that makes products more reliable.",
    intro:
      "17+ years in tech, 10 of them in software quality. I bring together risk-based strategy, automation, APIs, performance, security, CI/CD and AI quality so teams can ship with confidence.",
    sub: "Currently completing a graduate specialization in Software Quality Engineering and Testing at PUC Minas, with ongoing study of AI in quality.",
    whatsapp: "Chat on WhatsApp",
    cv: "Download CV (PDF, PT)",
    portraitAlt: "Jonas Davila, wearing round glasses and a houndstooth blazer, hand on chin",
    vertical: "Porto Alegre · Brazil",
    captionTitle: "Quality Engineering",
    captionStatus: "Open to new opportunities",
  },
  evidence: {
    label: "Profile summary in the form of a quality gate",
    figures: [
      { value: "17", accent: "+", label: "years in technology" },
      { value: "10", label: "years in software quality" },
      { value: "90%", accent: "−", label: "production bugs at KingHost" },
    ],
    note: "Each criterion in the quality gate links to the evidence behind it.",
    head: "quality-gate · profile",
    run: "run 2026.10",
    criteria: [
      { href: "#experiencia", label: "QA track record", value: "10 years · since 2016" },
      { href: "#cases", label: "Risk-based strategy", value: "2 public case studies" },
      { href: "#competencias", label: "Web and mobile automation", value: "Playwright · Appium" },
      { href: "#job-spassu", label: "Financial products", value: "Itaú · Caixa · Banrisul" },
      { href: "#job-kinghost", label: "Production impact", value: "−90% bugs" },
      { href: "#aima", label: "AI in quality engineering", value: "GenAI testing · AIMA 2.0" },
    ],
    foot: "6 of 6 criteria backed by evidence",
  },
  experience: {
    title: "Experience and impact",
    lede: "In-house roles focused on outcomes and risk reduction, most recent first.",
    jobs: [
      {
        id: "job-spassu",
        when: "07/2025 — 07/2026",
        company: "SPASSU",
        role: "Senior QA Engineer · Senior Quality Automation Engineer · Caixa Econômica Federal project",
        points: [
          "Built test coverage across six areas (functional, integration, regression, security, performance and load) for digital financial products, applying OWASP practices.",
          "Used generative AI and prompt engineering for scenario analysis, issue investigation and test case generation, checking context, consistency and hallucinations before relying on any output.",
          "Consolidated technical evidence and quality recommendations for Product and Technology, using automation, simulators, mocks and stubs in the test strategy.",
        ],
        chip: { label: "scope:", strong: "6 test areas", rest: "· OWASP · GenAI" },
      },
      {
        id: "job-qualitymap",
        when: "10/2024 — 05/2025",
        company: "QualityMap",
        role: "Senior Software Quality Engineer · Team Leader · Prompt Engineer for Testing",
        points: [
          "Shaped quality strategies around business goals and defined metrics to drive continuous improvement of QA processes.",
          "Ran generative AI experiments for Quality Engineering at QualityLAB, evaluating model outputs, limitations and inconsistencies in scenario generation, risk analysis and automation support.",
          "Led risk assessments, process audits and corrective actions, brokering quality decisions between clients, engineering teams and the business.",
        ],
        chip: { label: "role:", strong: "Team Leader", rest: "· QualityLAB" },
      },
      {
        id: "job-hostgator",
        when: "04/2024 — 08/2024",
        company: "HostGator",
        role: "Senior Software Quality Engineer · Automation",
        points: [
          "Strengthened the automation and API testing strategy, adding contract, performance and security tests for REST APIs.",
          "Set up test plans, documentation and quality metrics for each sprint, and supported code reviews to improve maintainability.",
        ],
        chip: { label: "impact:", strong: "−20%", rest: "production bugs" },
      },
      {
        id: "job-itau",
        when: "05/2021 — 08/2023",
        company: "Itaú Unibanco",
        role: "Senior Quality Analyst · QA Automation",
        points: [
          "Automated scenarios and journeys for financial and payment products with Selenium, JUnit, Cucumber/BDD, Percy and Appium, on web and mobile.",
          "Ran performance tests with JMeter, tracked quality metrics in Tableau and worked with Engineering and Product from refinement to release.",
        ],
        chip: { label: "scope:", strong: "web + mobile", rest: "· performance" },
      },
      {
        id: "job-thoughtworks",
        when: "04/2020 — 05/2021",
        company: "Thoughtworks",
        role: "Quality Analyst Consultant · QA Automation",
        points: [
          "Quality Engineering consulting for international clients, with risk-based strategy, exploratory testing and automation using Postman, Insomnia, Jest and JavaScript.",
          "Facilitated quality discussions and led improvements in chapters and communities of practice.",
        ],
        chip: { label: "clients:", strong: "Lenovo · PwC", rest: "North America" },
      },
      {
        id: "job-kinghost",
        when: "09/2019 — 04/2020",
        company: "KingHost",
        role: "Quality Analyst · QA Automation",
        points: [
          "Built the company's first QA practice, with automation and validation of APIs and integrations.",
          "Cut a technical process from about three days to roughly one minute through automation, version control and continuous integration.",
        ],
        chip: { label: "impact:", strong: "−90%", rest: "production bugs" },
      },
      {
        id: "job-tag",
        when: "04/2019 — 09/2019",
        company: "TAG Livros",
        role: "Full Stack Developer · QA Automation",
        points: [
          "Built web features with React, Node.js and PostgreSQL, tested with Cypress: the engineering foundation behind my Quality Engineering work today.",
        ],
      },
      {
        id: "job-dbserver",
        when: "11/2016 — 01/2019",
        company: "DBServer",
        role: "Quality Analyst · QA Automation · Banrisul and PROCERGS projects",
        points: [
          "Worked on financial-sector projects for Banrisul and public-sector projects for PROCERGS, Rio Grande do Sul's state IT company.",
          "Planned and ran functional, API and integration tests, plus performance tests with JMeter and SoapUI.",
          "Investigated, documented and reported defects together with the development teams.",
        ],
        chip: { label: "start in", strong: "QA", rest: "· APIs · performance" },
      },
      {
        id: "job-inicio",
        when: "06/2009 — 11/2016",
        company: "Start in technology",
        role: "IT Support · Performática (Compulab) and TOTVS (Personal Med)",
        points: [
          "Seven years of specialist support for healthcare software used by labs and clinics: troubleshooting, user training and business analysis.",
        ],
      },
    ],
  },
  about: {
    quote: "Quality isn't produced by testing.",
    quoteAccent: "It's built through decisions.",
    paragraphs: [
      "My career combines engineering, automation and technical leadership to expand the role of quality in organizations. I've built QA practices from scratch, worked on financial products and large-scale platforms, and always turned technical signals into decisions that make sense for the business.",
      "I start from product risk to choose the right strategy and test layer: unit, integration, API, E2E, exploratory or non-functional. In AI systems I also assess consistency, context, reliability and unexpected behavior.",
    ],
  },
  principles: {
    title: "How I think about Quality Engineering",
    lede: "Before execution, a way of thinking that runs through every project below.",
    chainLabel: "How I think about Quality Engineering",
    chain: ["Risk", "Evidence", "Decision", "Confidence"],
    items: [
      ["Risk before volume", "Coverage isn't just a test count. The goal is better information about the risks that matter."],
      ["Automation is an engineering decision", "I automate when feedback, repeatability, criticality and maintenance cost justify the investment. I don't advocate automating everything."],
      ["Quality Gates need evidence", "A green pipeline alone doesn't make a product reliable. Gates should reflect risk, evidence, context and quality criteria."],
      ["Quality goes beyond testing", "It includes architecture, observability, security, performance, accessibility, processes and user experience."],
      ["AI needs technical controls", "Prompts don't replace permissions, isolation, validation, quality gates, observability and human sign-off where it's needed."],
    ],
  },
  skills: {
    title: "From strategy to technical execution",
    lede: "Highlighted tools are the ones I've used most in real projects.",
    groups: [
      { title: "Quality strategy", chips: [{ label: "Risk-Based Testing", core: true }, { label: "Test Strategy", core: true }, { label: "Quality Engineering" }, { label: "Coverage and metrics" }, { label: "Continuous improvement" }] },
      { title: "AI Quality and GenAI Testing", chips: [{ label: "Prompt Engineering", core: true }, { label: "LLM evaluation", core: true }, { label: "Hallucinations and risk" }, { label: "Generative AI in QA" }, { label: "Scenario generation" }] },
      { title: "Automation", chips: [{ label: "Playwright", core: true }, { label: "Cypress", core: true }, { label: "Selenium", core: true }, { label: "Appium" }, { label: "Jest" }, { label: "JUnit" }, { label: "Cucumber / BDD" }, { label: "Percy" }] },
      { title: "APIs and non-functional testing", chips: [{ label: "REST", core: true }, { label: "k6", core: true }, { label: "JMeter", core: true }, { label: "Postman" }, { label: "Contract · OpenAPI" }, { label: "OWASP" }, { label: "Insomnia" }, { label: "SoapUI" }] },
      { title: "Engineering and delivery", chips: [{ label: "TypeScript", core: true }, { label: "Java", core: true }, { label: "GitHub Actions", core: true }, { label: "JavaScript" }, { label: "Python" }, { label: "Go" }, { label: "Jenkins" }, { label: "Git" }, { label: "PostgreSQL" }] },
      { title: "Leadership and collaboration", chips: [{ label: "Mentoring", core: true }, { label: "Team Leader", core: true }, { label: "Facilitation" }, { label: "Stakeholders" }, { label: "Chapters and communities" }, { label: "Scrum" }] },
    ],
  },
  cases: {
    title: "Applied quality strategy, not just automation",
    lede: "Two public labs written up as case studies: problem, risk, strategy and engineering decisions.",
    items: [
      {
        slug: repos.expense,
        title: "Expense Approval Quality Lab",
        question: "Who can decide on an expense, and what happens when someone tries to break the authorization or state rules?",
        summary: "Risk-based test strategy for an expense approval flow, covering E2E and API.",
        tags: ["Playwright", "TypeScript", "E2E", "API Testing", "Risk-Based Testing"],
      },
      {
        slug: repos.change,
        title: "Quality Change Intelligence Lab",
        question: "When you can't run everything, what should you check first, and which risk is left out?",
        summary: "Deciding what to verify based on what changed, and stating the risk that stays outside the test run.",
        tags: ["Go", "Risk-Based Testing", "Test Strategy", "GitHub Actions"],
      },
    ],
    read: "Read the case study (PT)",
    code: "View code on GitHub",
  },
  labs: {
    title: "Other technical labs",
    lede: "More public Quality Engineering labs, each with code and CI on GitHub.",
    items: [
      { title: "API Quality Engineering Lab", repo: labRepos[0], description: "Functional tests, OpenAPI contract, security, accessibility, k6 performance and CI/CD.", tags: ["API Testing", "OpenAPI", "k6", "Security", "Accessibility", "CI/CD"] },
      { title: "SQL Quality Checker", repo: labRepos[1], description: "Python and SQLite to validate business rules directly in the data and produce traceable CSV and HTML reports.", tags: ["SQL", "Python", "SQLite", "Data Quality"] },
      { title: "Subscription Change Quality Lab", repo: labRepos[2], description: "Cypress and JavaScript for subscription changes, with deterministic state, programmatic login and network resilience.", tags: ["Cypress", "JavaScript", "E2E", "Network Testing", "CI/CD"] },
      { title: "Inventory Reservation Quality Lab", repo: labRepos[3], description: "Selenium 4, Java and JUnit 5 for stock reservation, with Page Objects, Page Components, explicit waits and CI.", tags: ["Selenium 4", "Java", "JUnit 5", "Page Objects", "CI/CD"] },
    ],
    code: "View code on GitHub",
  },
  aima: {
    title: "AIMA",
    accent: "2.0",
    lede: "A personal project, now in Preview Edition. In it I explore how Quality Engineering, metrics, artificial intelligence and strategic thinking connect to turn evidence and risk into better decisions.",
    numbersBefore: "It brings together",
    numbersMiddle: "frameworks and",
    numbersAfter: "concepts developed through research, writing and experimentation, with open-source code on GitHub. It builds on the article I published on the Thoughtworks blog in 2020.",
    product: "Explore AIMA 2.0",
    code: "View code on GitHub",
    stagesLabel: "AIMA decision flow",
    stages: ["Context", "Evidence", "Risks", "Decision", "Action"],
  },
  works: {
    title: "Writing on Quality Engineering",
    items: [
      {
        meta: "Article · Thoughtworks blog · Dec 2020",
        title: "AIMA: How to increase the performance of QA Analysts through indicators",
        text: "Original article with the first version of the thinking behind AIMA.",
        href: "https://www.thoughtworks.com/en-us/insights/blog/aima-how-increase-performance-qa-analysts-through-indicators",
        cta: "Read the article",
      },
      {
        meta: "LinkedIn · ongoing",
        title: "Posts on Quality Engineering",
        text: "Technical reflections on risk, automation, AI applied to quality and product reliability.",
        href: "https://www.linkedin.com/in/jonasdavila/recent-activity/all/",
        cta: "View posts on LinkedIn",
      },
    ],
  },
  recommendations: {
    title: "What people say about working with me",
    items: [
      { name: "Ellen Aquino", relation: "Direct manager", quote: "Jonas has a very distinctive way of looking at software quality. His work delivers consistently, but also makes room for other layers: creativity and experimentation." },
      { name: "Eros Luiz Garzuzi da Costa", relation: "QA Engineer · colleague at HostGator", quote: "Together with Jonas we designed and structured the automation project using Cypress. I learned a lot from him about standardization and good practices." },
      { name: "Thaís Ambrósio", relation: "QA Engineer · mentee", quote: "Jonas is an exceptional mentor in software testing. His ability to share knowledge clearly and effectively is truly admirable." },
    ],
    note: "Translated from Portuguese.",
    cta: "Read all on LinkedIn",
  },
  education: {
    title: "Education and continuous learning",
    items: [
      { title: "PUC Minas", text: "Postgraduate degree in Software Quality Engineering and Testing", status: "in progress · 2026–2028" },
      { title: "ISTQB CTFL", text: "Certified Tester Foundation Level", cert: true },
      { title: "Unisinos", text: "Information Technology Management · 2015–2020" },
      { title: "QI Technical School", text: "IT Technician program · 2009–2013" },
      { title: "Web Accessibility for Developers", text: "Web accessibility for development teams" },
      { title: "Ethics in Generative AI", text: "Responsible use of artificial intelligence" },
    ],
  },
  contact: {
    title: "Need senior expertise in",
    accent: "Software Quality?",
    lede: "I'm open to roles in teams that value strategy, automation, collaboration and business-driven quality.",
    roles: ["Senior QA Engineer", "Quality Engineer", "QA Automation Engineer", "Senior QA Analyst"],
    email: "Email",
    emailCta: "Send email",
    whatsapp: "WhatsApp",
    whatsappCta: "Chat on WhatsApp",
    whatsappUrl: waUrl("Hi Jonas! I saw your portfolio and would like to talk about an opportunity."),
    linkedinCta: "View LinkedIn",
    githubCta: "View GitHub",
    photoAlt: "Jonas Davila leaning against a stone wall, holding his blazer lapel",
  },
  footer: { left: "Jonas Davila · Quality Engineering", right: "Porto Alegre · Brazil" },
  newTab: "(opens in a new tab)",
};
