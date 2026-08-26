import SiteNav from "./site-nav";

const experience = [
  {
    company: "KingHost",
    points: [
      "Estruturação da primeira frente de QA da empresa, com redução de 90% dos bugs em produção.",
      "Transformação do processo de onboarding de cerca de três dias para aproximadamente um minuto.",
    ],
  },
  {
    company: "HostGator",
    points: [
      "Redução de 20% dos bugs em produção por meio do fortalecimento da estratégia de automação e testes de APIs.",
    ],
  },
  {
    company: "Itaú Unibanco",
    points: [
      "Estratégia e execução de qualidade para produtos financeiros, pagamentos e aplicações web e mobile.",
    ],
  },
  {
    company: "ThoughtWorks",
    points: [
      "Quality Engineering e automação em API, web e mobile, com facilitação e colaboração entre engenharia, produto e negócio.",
    ],
  },
  {
    company: "QualityMap",
    points: [
      "Processos, estratégia, métricas, auditoria, melhoria contínua e experimentos de IA aplicada à qualidade.",
    ],
  },
  {
    company: "SPASSU",
    points: [
      "Estratégia de testes para produtos financeiros digitais, cobrindo funcionalidade, integração, regressão, segurança, desempenho e carga.",
    ],
  },
];

const competencies = [
  ["01", "Estratégia de qualidade", "Quality Engineering, Test Strategy, Risk-Based Testing, planejamento, cobertura, métricas e melhoria contínua."],
  ["02", "Automação", "Cypress, Playwright, Selenium, Jest, JUnit, Cucumber, BDD, Appium e Percy."],
  ["03", "APIs e testes não funcionais", "REST, Postman, Insomnia, SoapUI, contrato, integração, JMeter, K6, performance, carga, segurança e OWASP."],
  ["04", "Engenharia e entrega", "JavaScript, TypeScript, Java, Python, CI/CD, GitHub Actions, Jenkins, Git, React, Node.js, PostgreSQL e PowerShell."],
  ["05", "Liderança e colaboração", "Mentoria, facilitação, stakeholders, chapters, comunidades de prática, Scrum e qualidade orientada ao negócio."],
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
            <a className="button button-dark" href="#experiencia">Ver experiência</a>
            <a className="button button-light" href="https://www.linkedin.com/in/jonasdavila/" target="_blank" rel="noreferrer">
              Acessar LinkedIn <span>↗</span>
            </a>
            <a className="button button-light" href="#contato">Entrar em contato</a>
          </div>
          <aside className="hero-index" aria-label="Resumo profissional">
            <div><strong>18</strong><span>anos em tecnologia</span></div>
            <div><strong>10</strong><span>anos em qualidade de software</span></div>
            <div><strong>90%</strong><span>redução de bugs em produção · KingHost</span></div>
          </aside>
        </section>

        <section className="about section" id="sobre">
          <div className="shell about-copy">
            <p className="section-number light">01 — SOBRE</p>
            <h2>Qualidade não é produzida por testes. É construída por decisões.</h2>
            <p>
              Minha trajetória combina engenharia, automação, estratégia e liderança técnica para ampliar
              o papel da qualidade dentro das organizações — da estruturação de frentes de QA do zero à
              atuação em produtos financeiros e plataformas de grande escala.
            </p>
            <p>
              Atuo com estratégia de testes baseada em risco, automação web, mobile e de APIs, testes de
              performance, segurança, integração e contrato, além de CI/CD, métricas e melhoria contínua —
              sempre traduzindo sinais técnicos em decisões que fazem sentido para o negócio.
            </p>
            <div className="profile-tags" aria-label="Principais tecnologias">
              <span>Cypress</span><span>Playwright</span><span>Selenium</span><span>Java/JUnit</span><span>REST</span><span>SQL</span>
            </div>
          </div>
        </section>

        <section className="section shell" id="experiencia">
          <div className="section-heading">
            <div><p className="section-number">02 — EXPERIÊNCIA</p><h2>Experiência e impacto</h2></div>
            <p>Evidências de atuação dentro de empresas, com foco em resultado e redução de risco.</p>
          </div>
          <div className="expertise-grid">
            {experience.map(({ company, points }, index) => (
              <article className="expertise-card" key={company}>
                <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
                <h3>{company}</h3>
                <ul>
                  {points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section shell" id="competencias">
          <div className="section-heading">
            <div><p className="section-number">03 — COMPETÊNCIAS</p><h2>Competências técnicas e estratégicas</h2></div>
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

        <section className="aima section" id="projetos">
          <div className="shell aima-grid">
            <div className="aima-copy">
              <p className="section-number light">PROJETO AUTORAL</p>
              <p className="version">AIMA 2.0 / PREVIEW EDITION</p>
              <h2>Um projeto autoral que evidencia pensamento estratégico e pesquisa aplicada.</h2>
              <p>
                AIMA 2.0 é um projeto autoral por meio do qual exploro indicadores, inteligência artificial e
                pensamento estratégico aplicados à atuação de profissionais de Quality Engineering.
              </p>
              <p>
                São 20 frameworks e 28 conceitos que aplico em pesquisa, escrita e experimentação de IA
                aplicada à Qualidade de Software.
              </p>
              <a className="button button-gold" href="https://aima20.dev" target="_blank" rel="noreferrer">
                Conhecer o projeto AIMA 2.0 <span>↗</span>
              </a>
            </div>
            <div className="decision-diagram" aria-label="Fluxo do AIMA: contexto, evidências, riscos, decisão e ação">
              {['Contexto', 'Evidências', 'Riscos', 'Decisão', 'Ação'].map((item, index) => (
                <div key={item}><span>0{index + 1}</span><strong>{item}</strong>{index < 4 && <i>↓</i>}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="section shell" id="formacao">
          <div className="section-heading">
            <div><p className="section-number">04 — FORMAÇÃO</p><h2>Formação e evolução contínua</h2></div>
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
              <p className="section-number light">05 — CONTATO</p>
              <h2>Procurando experiência sênior em Qualidade de Software?</h2>
              <p>
                Estou aberto a oportunidades como Senior QA Engineer, Quality Engineer, QA Automation Engineer
                e Senior QA Analyst, especialmente em contextos que valorizem estratégia, automação,
                colaboração e qualidade orientada ao negócio.
              </p>
            </div>
            <div className="contact-links">
              <a href="mailto:jonas.qa.software@gmail.com"><span>ENVIAR E-MAIL</span>jonas.qa.software@gmail.com ↗</a>
              <a href="https://www.linkedin.com/in/jonasdavila/" target="_blank" rel="noreferrer"><span>FALAR PELO LINKEDIN</span>/in/jonasdavila ↗</a>
              <a href="https://github.com/jonasqasoftware" target="_blank" rel="noreferrer"><span>VER GITHUB</span>/jonasqasoftware ↗</a>
            </div>
          </div>
        </section>
      </main>

      <footer><div className="shell"><span>JONAS DÁVILA · QUALITY ENGINEERING</span><span>PORTO ALEGRE · BRASIL</span><span>© {new Date().getFullYear()}</span></div></footer>
    </>
  );
}
