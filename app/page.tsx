import SiteNav from "./site-nav";

const expertise = [
  ["01", "Estratégia de Qualidade", "Estratégia de testes baseada em risco, conectando qualidade a produto e resultado de negócio."],
  ["02", "Automação sustentável", "Automação web, mobile e de APIs, com arquiteturas úteis, confiáveis e economicamente justificáveis."],
  ["03", "APIs e integrações", "Testes de performance, segurança, integração e contrato, além da interface, cobrindo dados e serviços críticos."],
  ["04", "Métricas e decisões", "CI/CD, métricas e melhoria contínua — indicadores que transformam evidências técnicas em decisões melhores."],
  ["05", "IA aplicada a QA", "Uso responsável de IA para análise, suporte e evolução contínua da qualidade."],
  ["06", "Liderança técnica", "Facilitação, mentoria e construção de uma cultura de qualidade compartilhada."],
];

const services = [
  ["Diagnóstico", "Avaliação do contexto, riscos, maturidade e oportunidades de evolução."],
  ["Estratégia", "Roadmap de qualidade alinhado aos objetivos do produto e da engenharia."],
  ["Workshop", "Sessões práticas sobre decisões, riscos, métricas, automação e IA em QA."],
  ["Mentoria", "Acompanhamento de profissionais e lideranças em Quality Engineering."],
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#top">Pular para o conteúdo</a>
      <SiteNav />
      <main>
        <section className="hero container" id="top">
          <div className="hero-copy">
            <p className="eyebrow">QUALITY ENGINEERING · ESTRATÉGIA · AUTOMAÇÃO</p>
            <h1>Engenharia de Qualidade que transforma <em>evidências</em> em decisões.</h1>
            <p className="hero-lead">
              Atuo há 18 anos em tecnologia, sendo 10 dedicados à Qualidade de Software. Conecto
              estratégia de testes baseada em risco, automação, APIs, performance, segurança e
              indicadores a objetivos de negócio para aumentar a confiança nas entregas. Atualmente
              amplio essa atuação com estudos e projetos de inteligência artificial aplicada à
              Qualidade de Software.
            </p>
            <div className="actions">
              <a className="button button-dark" href="https://aima20.dev" target="_blank" rel="noreferrer">
                Conhecer o AIMA 2.0 <span>↗</span>
              </a>
              <a className="button button-light" href="#contato">Entrar em contato</a>
            </div>
          </div>
          <aside className="hero-index" aria-label="Resumo profissional">
            <div><strong>18</strong><span>anos em tecnologia</span></div>
            <div><strong>10</strong><span>anos em qualidade</span></div>
            <div><strong>20</strong><span>frameworks no AIMA</span></div>
          </aside>
        </section>

        <section className="about section" id="sobre">
          <div className="container about-grid">
            <figure className="portrait-frame">
              <img
                src="/jonas-davila.jpeg"
                alt="Retrato profissional de Jonas Dávila"
                width={390}
                height={520}
                loading="lazy"
                decoding="async"
              />
              <figcaption>JONAS DÁVILA · QUALITY ENGINEER</figcaption>
            </figure>
            <div className="about-copy">
              <p className="section-number light">01 — SOBRE</p>
              <h2>Qualidade não é produzida por testes. É construída por decisões.</h2>
              <p>
                Sou Jonas Dávila, Senior Quality Engineer e autor do AIMA 2.0. Minha trajetória combina
                engenharia, automação, estratégia e liderança para ampliar o papel da qualidade dentro das
                organizações.
              </p>
              <p>
                Atuo com estratégia de testes baseada em risco, automação web, mobile e de APIs, testes de
                performance, segurança, integração e contrato, além de CI/CD, métricas e melhoria contínua —
                sempre traduzindo sinais técnicos em decisões que fazem sentido para o negócio.
              </p>
              <div className="profile-tags" aria-label="Principais tecnologias">
                <span>Cypress</span><span>Playwright</span><span>Selenium</span><span>Java/JUnit</span><span>REST</span><span>SQL</span>
              </div>
              <div className="education" aria-label="Formação acadêmica">
                <p className="education-eyebrow">Formação</p>
                <div className="education-item">
                  <strong>PUC Minas</strong>
                  <span>Pós-graduação Lato Sensu em Engenharia de Qualidade e Teste de Software</span>
                  <span className="education-meta">Ago 2026 – Fev 2028 · Em andamento</span>
                </div>
                <div className="education-item">
                  <strong>Unisinos</strong>
                  <span>Gestão da Tecnologia da Informação</span>
                  <span className="education-meta">2015 – 2020</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section container" id="especialidades">
          <div className="section-heading">
            <div><p className="section-number">02 — ESPECIALIDADES</p><h2>Onde gero valor</h2></div>
            <p>Da estratégia à implementação, com foco em confiança, sustentabilidade e impacto.</p>
          </div>
          <div className="expertise-grid">
            {expertise.map(([number, title, text]) => (
              <article className="expertise-card" key={number}>
                <span className="card-index">{number}</span><h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="aima section" id="projetos">
          <div className="container aima-grid">
            <div className="aima-copy">
              <p className="section-number light">PROJETO AUTORAL EM DESTAQUE</p>
              <p className="version">AIMA 2.0 / PREVIEW EDITION</p>
              <h2>Uma metodologia de Engenharia de Qualidade baseada em decisões.</h2>
              <p>
                O AIMA 2.0 conecta evidências, riscos, estratégia e ação. São 20 frameworks, 28 conceitos e um
                sistema prático para equipes que querem ir além de cobertura e volume de testes.
              </p>
              <a className="button button-gold" href="https://aima20.dev" target="_blank" rel="noreferrer">
                Explorar a metodologia <span>↗</span>
              </a>
            </div>
            <div className="decision-diagram" aria-label="Fluxo do AIMA: contexto, evidências, riscos, decisão e ação">
              {['Contexto', 'Evidências', 'Riscos', 'Decisão', 'Ação'].map((item, index) => (
                <div key={item}><span>0{index + 1}</span><strong>{item}</strong>{index < 4 && <i>↓</i>}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="section container" id="conteudos">
          <div className="section-heading">
            <div><p className="section-number">03 — CONHECIMENTO</p><h2>Conhecimento e IA aplicada à Qualidade de Software</h2></div>
            <p>Produção editorial, estudos e experimentação em inteligência artificial aplicada à Engenharia de Qualidade.</p>
          </div>
          <div className="content-grid">
            <a className="content-card featured" href="https://www.thoughtworks.com/pt-br/insights/blog/aima-how-increase-performance-qa-analysts-through-indicators" target="_blank" rel="noreferrer">
              <span>ARTIGO · THOUGHTWORKS</span>
              <h3>Como expandir a atuação de QAs através de indicadores</h3>
              <p>Uma abordagem para conectar métricas, protagonismo e impacto organizacional.</p><b>LER ARTIGO ↗</b>
            </a>
            <a className="content-card" href="https://aima20.dev" target="_blank" rel="noreferrer">
              <span>METODOLOGIA · OPEN PREVIEW</span>
              <h3>AIMA 2.0</h3><p>Frameworks, diagramas e um léxico para aplicar Engenharia de Qualidade baseada em decisões.</p><b>ACESSAR ↗</b>
            </a>
            <a className="content-card" href="https://www.linkedin.com/in/jonasdavila/" target="_blank" rel="noreferrer">
              <span>NEWSLETTER · LINKEDIN</span>
              <h3>Quality Insights</h3><p>Qualidade, automação e IA para reduzir riscos e gerar valor ao negócio.</p><b>ACOMPANHAR ↗</b>
            </a>
          </div>
          <div className="ia-credentials" aria-label="Estudos e produção em IA aplicada à Qualidade">
            <div><strong>Livro</strong><span>“Introdução à Inteligência Artificial nos Testes de Software”</span></div>
            <div><strong>QualityLAB</strong><span>Experimentos com IA aplicada a processos de qualidade de software</span></div>
            <div><strong>Claude Code 101</strong><span>Estudo de coding agents, contexto, permissões, checkpoints e fluxos agentivos</span></div>
            <div><strong>Formação complementar</strong><span>Ética na Era da Inteligência Artificial Generativa</span></div>
          </div>
        </section>

        <section className="services section">
          <div className="container">
            <div className="section-heading">
              <div><p className="section-number">04 — COLABORAÇÕES</p><h2>Como podemos trabalhar juntos</h2></div>
            </div>
            <div className="services-grid">
              {services.map(([title, text], index) => <article key={title}><span className="card-index">0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}
            </div>
          </div>
        </section>

        <section className="contact section" id="contato">
          <div className="container contact-grid">
            <div><p className="section-number light">05 — CONTATO</p><h2>Vamos transformar qualidade em uma capacidade estratégica?</h2></div>
            <div className="contact-links">
              <a href="mailto:jonas.qa.software@gmail.com"><span>E-MAIL</span>jonas.qa.software@gmail.com ↗</a>
              <a href="https://www.linkedin.com/in/jonasdavila/" target="_blank" rel="noreferrer"><span>LINKEDIN</span>/in/jonasdavila ↗</a>
              <a href="https://github.com/jonasqasoftware" target="_blank" rel="noreferrer"><span>GITHUB</span>/jonasqasoftware ↗</a>
              <a href="https://aima20.dev" target="_blank" rel="noreferrer"><span>AIMA 2.0</span>aima20.dev ↗</a>
            </div>
          </div>
        </section>
      </main>

      <footer><div className="container"><span>JONAS DÁVILA · QUALITY ENGINEERING</span><span>PORTO ALEGRE · BRASIL</span><span>© {new Date().getFullYear()}</span></div></footer>
    </>
  );
}
