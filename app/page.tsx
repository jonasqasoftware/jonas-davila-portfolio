import SiteNav from "./site-nav";

const experience = [
  {
    company: "SPASSU",
    role: "Analista de Testes e Qualidade de Software",
    period: "07/2025 — 07/2026",
    points: [
      "Estruturou cobertura de testes em seis frentes — funcional, integração, regressão, segurança, desempenho e carga — para produtos financeiros digitais do projeto Caixa Econômica Federal, com aplicação de práticas OWASP.",
      "Consolidou evidências técnicas e recomendações de qualidade para Produto e Tecnologia, com uso de automações, simuladores, mocks e stubs na estratégia de testes.",
    ],
  },
  {
    company: "QualityMap",
    role: "Engenheiro de Qualidade de Software — Processos e Estratégia",
    period: "10/2024 — 05/2025",
    points: [
      "Mapeou gargalos de qualidade e apoiou ações corretivas junto a clientes, equipes técnicas e áreas de negócio, em atuação consultiva de processos e estratégia.",
      "Conduziu experimentos de IA aplicada à qualidade no QualityLAB, voltados à eficiência e ao apoio a decisões de qualidade.",
    ],
  },
  {
    company: "HostGator",
    role: "Senior Software Quality Assurance Engineer",
    period: "04/2024 — 08/2024",
    points: [
      "Contribuiu para a redução de 20% dos bugs em produção por meio do fortalecimento da estratégia de automação e testes de APIs.",
    ],
  },
  {
    company: "Itaú Unibanco",
    role: "Senior Quality Analyst",
    period: "05/2021 — 08/2023",
    points: [
      "Automatizou cenários e jornadas de produtos financeiros e de pagamentos com Selenium, JUnit, Cucumber/BDD, Percy e Appium, em aplicações web e mobile.",
      "Executou testes de performance com JMeter, acompanhou indicadores e relatórios de qualidade no Tableau e colaborou com Engenharia e Produto do refinamento à validação e ao release.",
    ],
  },
  {
    company: "ThoughtWorks",
    role: "Quality Analyst Consultant (Trainee)",
    period: "04/2020 — 05/2021",
    points: [
      "Atuou em consultoria de Quality Engineering no contexto financeiro, com estratégia baseada em risco, testes exploratórios e automação com Postman, Insomnia, Jest e JavaScript.",
      "Facilitou discussões de qualidade e liderou melhorias em chapters e comunidades de prática de engenharia.",
    ],
  },
  {
    company: "KingHost",
    role: "Analista de Qualidade Júnior",
    period: "09/2019 — 04/2020",
    points: [
      "Estruturou a primeira frente de QA da empresa e contribuiu para a redução de 90% dos bugs em produção.",
      "Transformação do processo de onboarding de cerca de três dias para aproximadamente um minuto.",
    ],
  },
];

const principles = [
  ["01", "Risco antes de volume", "Cobertura não deve ser medida apenas pela quantidade de testes. O objetivo é aumentar a informação sobre os riscos que realmente importam."],
  ["02", "Automação é uma decisão de engenharia", "Automatizo quando feedback, repetibilidade, criticidade e custo de manutenção justificam o investimento — não defendo automatizar tudo."],
  ["03", "Quality Gates precisam de evidência", "Pipeline verde não significa, por si só, produto confiável. Gates devem refletir risco, evidência, contexto e critérios de qualidade."],
  ["04", "Qualidade vai além dos testes", "Inclui arquitetura, observabilidade, segurança, performance, acessibilidade, processos e experiência do usuário."],
  ["05", "IA precisa de controles técnicos", "Prompts não substituem permissões, isolamento, validação, quality gates, observabilidade e aprovação humana quando necessária."],
];

const competencies = [
  ["01", "Estratégia de qualidade", "Quality Engineering, Test Strategy, Risk-Based Testing, planejamento, cobertura, métricas e melhoria contínua."],
  ["02", "Automação", "Cypress, Playwright, Selenium, Jest, JUnit, Cucumber, BDD, Appium e Percy."],
  ["03", "APIs e testes não funcionais", "REST, Postman, Insomnia, SoapUI, contrato, integração, JMeter, K6, performance, carga, segurança e OWASP."],
  ["04", "Engenharia e entrega", "JavaScript, TypeScript, Java, Python, CI/CD, GitHub Actions, Jenkins, Git, React, Node.js, PostgreSQL e PowerShell."],
  ["05", "Liderança e colaboração", "Mentoria, facilitação, stakeholders, chapters, comunidades de prática, Scrum e qualidade orientada ao negócio."],
];

const cases = [
  {
    slug: "expense-approval-quality-lab",
    title: "Expense Approval Quality Lab",
    summary:
      "Estratégia de testes orientada a risco para um fluxo de aprovação de despesas: quem pode decidir uma despesa e o que acontece quando alguém tenta violar as regras de autorização ou de estado.",
    tags: ["Playwright", "TypeScript", "E2E", "API Testing", "Risk-Based Testing"],
    repo: "expense-approval-quality-lab",
    url: "https://github.com/jonasqasoftware/expense-approval-quality-lab",
  },
  {
    slug: "quality-change-intelligence-lab",
    title: "Quality Change Intelligence Lab",
    summary:
      "Quando não é possível executar tudo, Quality Engineering precisa decidir o que verificar primeiro — e tornar explícito o risco que permanece fora da execução.",
    tags: ["Go", "Risk-Based Testing", "Test Strategy", "GitHub Actions"],
    repo: "quality-change-intelligence-lab",
    url: "https://github.com/jonasqasoftware/quality-change-intelligence-lab",
  },
];

const projects = [
  {
    title: "API Quality Engineering Lab",
    repo: "api-quality-engineering-lab",
    description:
      "Laboratório de Quality Engineering para APIs com testes funcionais, contrato OpenAPI, segurança, acessibilidade, performance com k6 e CI/CD.",
    tags: ["API Testing", "OpenAPI", "k6", "Segurança", "Acessibilidade", "CI/CD"],
    url: "https://github.com/jonasqasoftware/api-quality-engineering-lab",
  },
  {
    title: "SQL Quality Checker",
    repo: "sql-quality-checker",
    description:
      "Ferramenta em Python e SQLite para validar regras de negócio diretamente nos dados, detectar inconsistências de qualidade e gerar relatórios rastreáveis em CSV e HTML.",
    tags: ["SQL", "Python", "SQLite", "Qualidade de Dados"],
    url: "https://github.com/jonasqasoftware/sql-quality-checker",
  },
  {
    title: "Subscription Change Quality Lab",
    repo: "subscription-change-quality-lab",
    description:
      "Laboratório com Cypress + JavaScript para fluxos de alteração de assinaturas, com estado determinístico, login programático e cenários de resiliência de rede.",
    tags: ["Cypress", "JavaScript", "E2E", "Network Testing", "CI/CD"],
    url: "https://github.com/jonasqasoftware/subscription-change-quality-lab",
  },
  {
    title: "Inventory Reservation Quality Lab",
    repo: "inventory-reservation-quality-lab",
    description:
      "Laboratório com Selenium 4 + Java + JUnit 5 para reserva e cancelamento de estoque, usando Page Objects, Page Components, waits explícitos e CI.",
    tags: ["Selenium 4", "Java", "JUnit 5", "Page Objects", "CI/CD"],
    url: "https://github.com/jonasqasoftware/inventory-reservation-quality-lab",
  },
];

const authorship = [
  {
    label: "ARTIGO ORIGINAL",
    title: "AIMA: How to increase the performance of QA Analysts through indicators",
    text: "Artigo original publicado no blog da Thoughtworks (dezembro de 2020), com a versão inicial do pensamento por trás do AIMA.",
    href: "https://www.thoughtworks.com/en-us/insights/blog/aima-how-increase-performance-qa-analysts-through-indicators",
    cta: "Ler no Thoughtworks",
    external: true,
  },
  {
    label: "PROJETO AUTORAL",
    title: "AIMA 2.0",
    text: "Evolução do AIMA original: 20 frameworks e 28 conceitos sobre Quality Engineering, indicadores e IA aplicada à qualidade.",
    href: "#aima",
    cta: "Ver seção do AIMA 2.0",
    external: false,
  },
  {
    label: "LINKEDIN",
    title: "Publicações sobre Quality Engineering",
    text: "Reflexões e conteúdo técnico sobre risco, automação, IA aplicada à qualidade e confiabilidade de produtos.",
    href: "https://www.linkedin.com/in/jonasdavila/",
    cta: "Ver publicações no LinkedIn",
    external: true,
  },
];

const testimonials = [
  {
    name: "Ellen Aquino",
    relation: "Liderança direta · colaboração profissional",
    quote:
      "O Jonas tem uma maneira muito própria de olhar para a qualidade de software. Seu trabalho traz uma entrega consistente, mas também abre espaço para outras camadas — criatividade e experimentação.",
  },
  {
    name: "Eros Luiz Garzuzi da Costa",
    relation: "QA Engineer · colega de equipe na HostGator",
    quote:
      "Junto com o Jonas conseguimos arquitetar e estruturar o projeto de automação utilizando o Cypress. Aprendi muito com o Jonas na parte de padronização e boas práticas.",
  },
  {
    name: "Thaís Ambrósio",
    relation: "QA Engineer · mentorada por Jonas",
    quote:
      "Jonas é um mentor excepcional na área de testes de software. Sua capacidade de transmitir esse conhecimento de forma clara e eficaz é verdadeiramente admirável.",
  },
];

const education = [
  ["PUC Minas", "Pós-graduação Lato Sensu em Engenharia de Qualidade e Teste de Software · Em andamento"],
  ["Unisinos", "Gestão da Tecnologia da Informação"],
  ["ISTQB CTFL", "Certified Tester Foundation Level"],
  ["Claude Code 101", "Estudo de coding agents, contexto, permissões, checkpoints e fluxos agentivos"],
  ["IA aplicada à Qualidade", "Estudos contínuos sobre inteligência artificial aplicada a processos de teste e qualidade"],
  ["Ética na IA Generativa", "Formação complementar sobre uso responsável de inteligência artificial"],
];

export default function Home() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <>
      <a className="skip-link" href="#top">Pular para o conteúdo</a>
      <SiteNav />
      <main>
        <section className="hero shell" id="top">
          <p className="eyebrow">SENIOR QA ENGINEER · QUALITY ENGINEER</p>
          <figure className="portrait-frame">
            <img
              src={`${basePath}/jonas-davila.jpeg`}
              alt="Retrato profissional de Jonas Dávila"
              width={390}
              height={520}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <figcaption>JONAS DÁVILA · QUALITY ENGINEER</figcaption>
          </figure>
          <h1>Engenharia de qualidade para produtos <em>mais confiáveis</em>.</h1>
          <p className="hero-lead">
            Sou Jonas Dávila, profissional de Quality Engineering com 18 anos em tecnologia, sendo 10
            dedicados à Qualidade de Software. Conecto estratégia baseada em risco, automação, APIs,
            performance, segurança e CI/CD para aumentar a confiança nas entregas.
          </p>
          <p className="hero-note">
            Pós-graduando em Engenharia de Qualidade e Teste de Software, com estudos em IA aplicada à
            Qualidade.
          </p>
          <div className="actions">
            <a className="button button-dark" href={`${basePath}/cv-jonas-davila.pdf`} download>
              Baixar currículo
            </a>
            <a className="button button-light" href="#experiencia">Ver experiência</a>
            <a className="button button-light" href="https://www.linkedin.com/in/jonasdavila/" target="_blank" rel="noreferrer">
              Acessar LinkedIn <span aria-hidden="true">{"↗︎"}</span>
            </a>
          </div>
          <aside className="hero-index" aria-label="Resumo profissional">
            <div><strong>18</strong><span>anos em tecnologia</span></div>
            <div><strong>10</strong><span>anos em qualidade de software</span></div>
            <div><strong>90%</strong><span>redução de bugs em produção · KingHost</span></div>
          </aside>
        </section>

        <section className="section shell" id="experiencia">
          <div className="section-heading">
            <div><p className="section-number">01 — EXPERIÊNCIA</p><h2>Experiência e impacto</h2></div>
            <p>Evidências de atuação dentro de empresas, com foco em resultado e redução de risco.</p>
          </div>
          <div className="expertise-grid">
            {experience.map(({ company, role, period, points }, index) => (
              <article className="expertise-card" key={company}>
                <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
                <h3>{company}</h3>
                <p className="experience-meta">
                  <strong>{role}</strong>
                  <span>{period}</span>
                </p>
                <ul>
                  {points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="about section" id="sobre">
          <div className="shell about-copy">
            <p className="section-number light">02 — SOBRE</p>
            <h2>Qualidade não é produzida por testes. É construída por decisões.</h2>
            <p>
              Minha trajetória combina engenharia, automação e liderança técnica para ampliar o papel da
              qualidade dentro das organizações — da estruturação de frentes de QA do zero à atuação em
              produtos financeiros e plataformas de grande escala, sempre traduzindo sinais técnicos em
              decisões que fazem sentido para o negócio.
            </p>
          </div>
        </section>

        <section className="section shell" id="como-penso">
          <div className="section-heading">
            <div><p className="section-number">03 — COMO PENSO QUALITY ENGINEERING</p><h2>Princípios que orientam minhas decisões de qualidade.</h2></div>
            <p>Antes da execução, uma forma de pensar que atravessa todos os projetos abaixo.</p>
          </div>
          <p className="risk-flow">
            <span>Risco</span><i aria-hidden="true">→</i>
            <span>Evidência</span><i aria-hidden="true">→</i>
            <span>Decisão</span><i aria-hidden="true">→</i>
            <span>Confiança</span>
          </p>
          <div className="expertise-grid">
            {principles.map(([number, title, text]) => (
              <article className="expertise-card" key={number}>
                <span className="card-index">{number}</span><h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section shell" id="competencias">
          <div className="section-heading">
            <div><p className="section-number">04 — COMPETÊNCIAS</p><h2>Competências técnicas e estratégicas</h2></div>
            <p>Da estratégia de qualidade à execução técnica, organizadas como empresas costumam avaliar.</p>
          </div>
          <div className="expertise-grid">
            {competencies.map(([number, title, text]) => (
              <article className="expertise-card" key={number}>
                <span className="card-index">{number}</span><h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section shell" id="cases">
          <div className="section-heading">
            <div><p className="section-number">05 — CASES EM DESTAQUE</p><h2>Estratégia de qualidade aplicada, não apenas automação</h2></div>
            <p>Dois laboratórios públicos aprofundados como estudo de caso: problema, risco, estratégia e decisões de engenharia.</p>
          </div>
          <div className="case-grid">
            {cases.map(({ slug, title, summary, tags, repo, url }, index) => (
              <article className="case-card" key={slug}>
                <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p className="project-repo">{repo}</p>
                <p>{summary}</p>
                <div className="project-tags">
                  {tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <div className="case-actions">
                  <a className="project-link" href={`${basePath}/cases/${slug}/`}>
                    Explorar case <span aria-hidden="true">{"→"}</span>
                  </a>
                  <a className="project-link" href={url} target="_blank" rel="noreferrer">
                    Ver código <span aria-hidden="true">{"↗︎"}</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section shell" id="laboratorios">
          <div className="section-heading">
            <div><p className="section-number">06 — PROJETOS TÉCNICOS</p><h2>Outros laboratórios técnicos</h2></div>
            <p>
              Demais laboratórios públicos de Quality Engineering. Os cases Expense Approval Quality Lab e
              Quality Change Intelligence Lab estão aprofundados na seção{" "}
              <a href="#cases">Cases em destaque</a>.
            </p>
          </div>
          <div className="expertise-grid">
            {projects.map(({ title, repo, description, tags, url }, index) => (
              <article className="expertise-card" key={title}>
                <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                {repo && <p className="project-repo">{repo}</p>}
                <p>{description}</p>
                <div className="project-tags">
                  {tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <a className="project-link" href={url} target="_blank" rel="noreferrer">
                  Ver código <span aria-hidden="true">{"↗︎"}</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="aima section" id="aima">
          <div className="shell aima-grid">
            <div className="aima-copy">
              <p className="section-number light">PROJETO AUTORAL</p>
              <p className="version">AIMA 2.0 / PREVIEW EDITION</p>
              <h2>Um projeto autoral que evidencia pensamento estratégico e pesquisa aplicada.</h2>
              <p>
                AIMA 2.0 é um projeto autoral no qual exploro, de forma estruturada, como Quality Engineering,
                indicadores, inteligência artificial e pensamento estratégico se conectam para transformar
                evidências e riscos em decisões melhores.
              </p>
              <p>
                São 20 frameworks e 28 conceitos que desenvolvo em pesquisa, escrita e experimentação de IA
                aplicada à Qualidade de Software — a capacidade técnica e analítica por trás do projeto pode
                ser verificada no código-fonte.
              </p>
              <div className="aima-actions">
                <a className="button button-gold" href="https://aima20.dev" target="_blank" rel="noreferrer">
                  Conhecer o AIMA 2.0 <span aria-hidden="true">{"↗︎"}</span>
                </a>
                <a className="button button-outline-on-dark" href="https://github.com/jonasqasoftware/aima-agentic-qe" target="_blank" rel="noreferrer">
                  Ver código no GitHub <span aria-hidden="true">{"↗︎"}</span>
                </a>
              </div>
            </div>
            <div className="decision-diagram" aria-label="Fluxo do AIMA: contexto, evidências, riscos, decisão e ação">
              {['Contexto', 'Evidências', 'Riscos', 'Decisão', 'Ação'].map((item, index) => (
                <div key={item}><span>0{index + 1}</span><strong>{item}</strong>{index < 4 && <i>↓</i>}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="section shell" id="autoria">
          <div className="section-heading">
            <div><p className="section-number">07 — AUTORIA &amp; CONTRIBUIÇÕES</p><h2>Produção intelectual sobre Quality Engineering</h2></div>
            <p>Pesquisa e escrita publicadas que sustentam a prática — não apenas execução de testes.</p>
          </div>
          <div className="expertise-grid">
            {authorship.map(({ label, title, text, href, cta, external }) => (
              <article className="expertise-card" key={title}>
                <p className="project-repo">{label}</p>
                <h3>{title}</h3>
                <p>{text}</p>
                {external ? (
                  <a className="project-link" href={href} target="_blank" rel="noreferrer">
                    {cta} <span aria-hidden="true">{"↗︎"}</span>
                  </a>
                ) : (
                  <a className="project-link" href={href}>{cta}</a>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="section shell" id="recomendacoes">
          <div className="section-heading">
            <div><p className="section-number">08 — RECOMENDAÇÕES</p><h2>O que dizem sobre trabalhar comigo</h2></div>
            <p>
              Qualidade também é construída nas relações de trabalho. Alguns relatos de pessoas com quem
              colaborei, construí soluções e compartilhei conhecimento ao longo da minha trajetória.
            </p>
          </div>
          <div className="expertise-grid">
            {testimonials.map(({ name, relation, quote }) => (
              <figure className="expertise-card testimonial-card" key={name}>
                <blockquote><p>&ldquo;{quote}&rdquo;</p></blockquote>
                <figcaption><strong>{name}</strong><span>{relation}</span></figcaption>
              </figure>
            ))}
          </div>
          <a
            className="project-link testimonials-cta"
            href="https://www.linkedin.com/in/jonasdavila/details/recommendations/?detailScreenTabIndex=0"
            target="_blank"
            rel="noreferrer"
          >
            Ver recomendações no LinkedIn <span aria-hidden="true">{"↗︎"}</span>
          </a>
        </section>

        <section className="section shell" id="formacao">
          <div className="section-heading">
            <div><p className="section-number">09 — FORMAÇÃO</p><h2>Formação e evolução contínua</h2></div>
            <p>Atualização constante alinhada à próxima evolução da Engenharia de Qualidade.</p>
          </div>
          <div className="ia-credentials" aria-label="Formação acadêmica e estudos contínuos">
            {education.map(([title, text]) => (
              <div key={title}><strong>{title}</strong><span>{text}</span></div>
            ))}
          </div>
        </section>

        <section className="contact section" id="contato">
          <div className="shell contact-grid">
            <div>
              <p className="section-number light">10 — CONTATO</p>
              <h2>Procurando experiência sênior em Qualidade de Software?</h2>
              <p>
                Estou aberto a oportunidades como Senior QA Engineer, Quality Engineer, QA Automation Engineer
                e Senior QA Analyst, especialmente em contextos que valorizem estratégia, automação,
                colaboração e qualidade orientada ao negócio.
              </p>
            </div>
            <div className="contact-links">
              <a href="mailto:jonas.qa.software@gmail.com"><span>ENVIAR E-MAIL</span>jonas.qa.software@gmail.com{" "}<span aria-hidden="true">{"↗︎"}</span></a>
              <a href="https://www.linkedin.com/in/jonasdavila/" target="_blank" rel="noreferrer"><span>FALAR PELO LINKEDIN</span>/in/jonasdavila{" "}<span aria-hidden="true">{"↗︎"}</span></a>
              <a href="https://github.com/jonasqasoftware" target="_blank" rel="noreferrer"><span>VER GITHUB</span>/jonasqasoftware{" "}<span aria-hidden="true">{"↗︎"}</span></a>
            </div>
          </div>
        </section>
      </main>

      <footer><div className="shell"><span>JONAS DÁVILA · QUALITY ENGINEERING</span><span>PORTO ALEGRE · BRASIL</span><span>© {new Date().getFullYear()}</span></div></footer>
    </>
  );
}
