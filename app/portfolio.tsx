import type { Content } from "./content";
import SiteNav from "./site-nav";
import CopyEmail from "./copy-email";

const EMAIL = "jonas.qa.software@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/jonasdavila/";
const GITHUB = "https://github.com/jonasqasoftware";

function NewTab({ label }: { label: string }) {
  return <span className="sr-only"> {label}</span>;
}

function Arrow({ external = false }: { external?: boolean }) {
  return <span aria-hidden="true">{external ? "↗︎" : "→"}</span>;
}

export default function Portfolio({ t }: { t: Content }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const { hero, evidence, experience, about, principles, skills, cases, labs, aima, works, recommendations, education, contact } = t;

  return (
    <>
      <a className="skip-link" href="#top">{t.nav.skip}</a>
      <SiteNav nav={t.nav} lang={t.lang} />
      <main>
        <section className="hero shell" id="top" aria-label={hero.label}>
          <div className="hero-id">
            <h1 className="name">
              <span className="big">Jonas<br />Davila<i>.</i></span>
              <span className="role"><span>{hero.roleA}</span> <span>{hero.roleB}</span></span>
            </h1>
            <ul className="profile-tags">
              {hero.facts.map((fact) => <li key={fact}><span>{fact}</span></li>)}
            </ul>
          </div>

          <figure className="portrait-frame">
            <img
              src={`${basePath}/jonas-davila-hero.webp`}
              alt={hero.portraitAlt}
              width={682}
              height={960}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <span className="portrait-vertical" aria-hidden="true">{hero.vertical}</span>
            <figcaption><strong>{hero.captionTitle}</strong><span>{hero.captionStatus}</span></figcaption>
          </figure>

          <div className="hero-copy">
            <p className="tagline">{hero.tagline}</p>
            <p className="hero-lead">{hero.intro}</p>
            <div className="actions">
              <a className="button button-dark" href="#contato" data-ga-event="primary_cta_click" data-placement="hero_contact">
                {hero.contact} <Arrow />
              </a>
              <a
                className="button button-light"
                href={contact.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                data-ga-event="contact_click"
                data-contact-method="whatsapp"
              >
                {hero.whatsapp} <Arrow external /><NewTab label={t.newTab} />
              </a>
              <a
                className="button button-light"
                href={`${basePath}/cv-jonas-davila.pdf`}
                download
                data-ga-event="cv_download"
                data-placement="hero"
              >
                {hero.cv} <span aria-hidden="true">↓</span>
              </a>
              <a
                className="button button-light"
                href={LINKEDIN}
                target="_blank"
                rel="noreferrer"
                data-ga-event="primary_cta_click"
                data-placement="hero_linkedin"
              >
                {hero.linkedin} <Arrow external /><NewTab label={t.newTab} />
              </a>
            </div>
            <p className="hero-note">{hero.sub}</p>
          </div>
        </section>

        <section className="evidence" aria-label={evidence.label}>
          <div className="shell evidence-grid">
            <div>
              <div className="hero-index">
                {evidence.figures.map(({ value, accent, label }) => (
                  <div key={label}>
                    <strong>
                      {accent === "−" && <em>{accent}</em>}
                      {value}
                      {accent === "+" && <em>{accent}</em>}
                    </strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
              <p className="evidence-note">{evidence.note}</p>
            </div>
            <div className="gate">
              <div className="gate-head"><span>{evidence.head}</span><span>{evidence.run}</span></div>
              <ul className="criteria">
                {evidence.criteria.map(({ href, label, value }) => (
                  <li key={href + label}>
                    <a href={href}>
                      <span className="criteria-check" aria-hidden="true">✓</span>
                      <span className="criteria-label">{label} <span aria-hidden="true">→</span></span>
                      <span className="criteria-value">{value}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="gate-foot"><span>{evidence.foot}</span><span className="verdict">GO</span></div>
            </div>
          </div>
        </section>

        <section className="section shell" id="experiencia">
          <div className="section-heading" data-reveal>
            <h2>{experience.title}</h2>
            <p>{experience.lede}</p>
          </div>
          <div className="timeline">
            {experience.jobs.map(({ id, when, company, role, points, chip }) => (
              <article className="job" id={id} key={id}>
                <p className="job-when">{when}</p>
                <div>
                  <h3>{company}</h3>
                  <p className="job-role">{role}</p>
                  <ul>
                    {points.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                  {chip && (
                    <p className="job-chip">{chip.label} <b>{chip.strong}</b> {chip.rest}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section shell" id="sobre">
          <div className="about-grid" data-reveal>
            <h2 className="about-quote">{about.quote} <span>{about.quoteAccent}</span></h2>
            <div className="about-copy">
              {about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </section>

        <section className="section shell section-tight" id="como-penso">
          <div className="section-heading" data-reveal>
            <h2>{principles.title}</h2>
            <p>{principles.lede}</p>
          </div>
          <ol className="risk-flow" aria-label={principles.chainLabel}>
            {principles.chain.map((step, index) => (
              <li key={step}>
                <span>{step}</span>
                {index < principles.chain.length - 1 && <i aria-hidden="true">→</i>}
              </li>
            ))}
          </ol>
          <div className="expertise-grid" data-reveal>
            {principles.items.map(([title, text]) => (
              <article className="expertise-card" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section shell" id="competencias">
          <div className="section-heading" data-reveal>
            <h2>{skills.title}</h2>
            <p>{skills.lede}</p>
          </div>
          <div className="skills" data-reveal>
            {skills.groups.map(({ title, chips }) => (
              <div className="skill" key={title}>
                <h3>{title}</h3>
                <ul className="chips">
                  {chips.map(({ label, core }) => (
                    <li key={label} className={core ? "chip chip-core" : "chip"}>{label}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="section shell" id="cases">
          <div className="section-heading" data-reveal>
            <h2>{cases.title}</h2>
            <p>{cases.lede}</p>
          </div>
          <div className="case-grid" data-reveal>
            {cases.items.map(({ slug, title, question, summary, tags }) => (
              <article className="case-card" key={slug}>
                <h3>{title}</h3>
                <p className="project-repo">{slug}</p>
                <p className="case-question">{question}</p>
                <p>{summary}</p>
                <div className="project-tags">
                  {tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <div className="case-actions">
                  <a
                    className="button button-dark"
                    href={`${basePath}/cases/${slug}/`}
                    data-ga-event="case_open"
                    data-case-slug={slug}
                    data-placement="cases_grid"
                  >
                    {cases.read} <Arrow />
                  </a>
                  <a
                    className="button button-light"
                    href={`${GITHUB}/${slug}`}
                    target="_blank"
                    rel="noreferrer"
                    data-ga-event="project_click"
                    data-project-slug={slug}
                  >
                    {cases.code} <Arrow external /><NewTab label={t.newTab} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section shell section-follow" id="laboratorios">
          <div className="section-heading section-heading-small" data-reveal>
            <h2>{labs.title}</h2>
            <p>{labs.lede}</p>
          </div>
          <div className="expertise-grid" data-reveal>
            {labs.items.map(({ title, repo, description, tags }) => (
              <article className="expertise-card" key={repo}>
                <h3>{title}</h3>
                <p className="project-repo">{repo}</p>
                <p>{description}</p>
                <div className="project-tags">
                  {tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <a
                  className="project-link"
                  href={`${GITHUB}/${repo}`}
                  target="_blank"
                  rel="noreferrer"
                  data-ga-event="project_click"
                  data-project-slug={repo}
                >
                  {labs.code} <Arrow external /><NewTab label={t.newTab} />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="aima section" id="aima">
          <div className="shell aima-grid" data-reveal>
            <div className="aima-copy">
              <h2>{aima.title} <span>{aima.accent}</span></h2>
              <p>{aima.lede}</p>
              <p>
                {aima.numbersBefore} <strong>20</strong> {aima.numbersMiddle} <strong>28</strong> {aima.numbersAfter}
              </p>
              <div className="aima-actions">
                <a
                  className="button button-coral"
                  href="https://aima20.dev"
                  target="_blank"
                  rel="noreferrer"
                  data-ga-event="primary_cta_click"
                  data-placement="aima_product"
                >
                  {aima.product} <Arrow external /><NewTab label={t.newTab} />
                </a>
                <a
                  className="button button-outline-on-dark"
                  href="https://github.com/jonasqasoftware/aima-agentic-qe"
                  target="_blank"
                  rel="noreferrer"
                  data-ga-event="project_click"
                  data-project-slug="aima-agentic-qe"
                >
                  {aima.code} <Arrow external /><NewTab label={t.newTab} />
                </a>
              </div>
            </div>
            <ol className="decision-diagram" aria-label={aima.stagesLabel}>
              {aima.stages.map((stage, index) => (
                <li key={stage}><span>{String(index + 1).padStart(2, "0")}</span><strong>{stage}</strong></li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section shell" id="autoria">
          <div className="section-heading" data-reveal>
            <h2>{works.title}</h2>
          </div>
          <div className="expertise-grid" data-reveal>
            {works.items.map(({ meta, title, text, href, cta }) => (
              <article className="expertise-card" key={title}>
                <h3>{title}</h3>
                <p className="project-repo">{meta}</p>
                <p>{text}</p>
                <a className="project-link" href={href} target="_blank" rel="noreferrer">
                  {cta} <Arrow external /><NewTab label={t.newTab} />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="section shell" id="recomendacoes">
          <div className="section-heading" data-reveal>
            <h2>{recommendations.title}</h2>
          </div>
          <div className="expertise-grid" data-reveal>
            {recommendations.items.map(({ name, relation, quote }) => (
              <figure className="expertise-card testimonial-card" key={name}>
                <blockquote><p>&ldquo;{quote}&rdquo;</p></blockquote>
                <figcaption><strong>{name}</strong><span>{relation}</span></figcaption>
              </figure>
            ))}
          </div>
          {recommendations.note && <p className="translation-note">{recommendations.note}</p>}
          <a
            className="project-link testimonials-cta"
            href="https://www.linkedin.com/in/jonasdavila/details/recommendations/?detailScreenTabIndex=0"
            target="_blank"
            rel="noreferrer"
          >
            {recommendations.cta} <Arrow external /><NewTab label={t.newTab} />
          </a>
        </section>

        <section className="section shell" id="formacao">
          <div className="section-heading" data-reveal>
            <h2>{education.title}</h2>
          </div>
          <div className="ia-credentials" data-reveal>
            {education.items.map(({ title, text, status, cert }) => (
              <div key={title} className={cert ? "credential-cert" : undefined}>
                <strong>{title}</strong>
                <span>{text}</span>
                {status && <em>{status}</em>}
              </div>
            ))}
          </div>
        </section>

        <section className="contact section" id="contato">
          <div className="shell contact-grid" data-reveal>
            <div>
              <h2>{contact.title} <span>{contact.accent}</span></h2>
              <p className="contact-lede">{contact.lede}</p>
              <ul className="roles">
                {contact.roles.map((role) => <li key={role}>{role}</li>)}
              </ul>
              <div className="contact-links">
                <div className="channel channel-main">
                  <span>{contact.email}</span>
                  <p className="channel-value" id="email-address">{EMAIL}</p>
                  <div className="channel-actions">
                    <CopyEmail email={EMAIL} label={contact.copy} copied={contact.copied} failed={contact.copyFail} />
                    <a
                      className="button button-light button-small"
                      href={`mailto:${EMAIL}`}
                      data-ga-event="contact_click"
                      data-contact-method="email"
                    >
                      {contact.openMail}
                    </a>
                  </div>
                </div>
                <div className="channel channel-main">
                  <span>{contact.whatsapp}</span>
                  <p className="channel-value">+55 51 99263-2426</p>
                  <div className="channel-actions">
                    <a
                      className="button button-dark button-small"
                      href={contact.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      data-ga-event="contact_click"
                      data-contact-method="whatsapp"
                    >
                      {contact.whatsappCta} <Arrow external /><NewTab label={t.newTab} />
                    </a>
                  </div>
                </div>
                <div className="channel">
                  <span>LinkedIn</span>
                  <p className="channel-value">/in/jonasdavila</p>
                  <div className="channel-actions">
                    <a
                      className="button button-light button-small"
                      href={LINKEDIN}
                      target="_blank"
                      rel="noreferrer"
                      data-ga-event="contact_click"
                      data-contact-method="linkedin"
                    >
                      {contact.linkedinCta} <Arrow external /><NewTab label={t.newTab} />
                    </a>
                  </div>
                </div>
                <div className="channel">
                  <span>GitHub</span>
                  <p className="channel-value">/jonasqasoftware</p>
                  <div className="channel-actions">
                    <a
                      className="button button-light button-small"
                      href={GITHUB}
                      target="_blank"
                      rel="noreferrer"
                      data-ga-event="contact_click"
                      data-contact-method="github"
                    >
                      {contact.githubCta} <Arrow external /><NewTab label={t.newTab} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <figure className="contact-photo">
              <img
                src={`${basePath}/jonas-davila-contato.jpg`}
                alt={contact.photoAlt}
                width={560}
                height={644}
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </section>
      </main>

      <footer>
        <div className="shell">
          <span>{t.footer.left}</span>
          <span>{t.footer.right} · © {new Date().getFullYear()}</span>
        </div>
      </footer>
    </>
  );
}
