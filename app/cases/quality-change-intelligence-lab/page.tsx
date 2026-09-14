import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quality Change Intelligence Lab | Case — Jonas Dávila",
  description:
    "Ferramenta determinística em Go que prioriza verificações sob restrição de tempo, maximiza a cobertura de risco e torna explícito o risco residual.",
  alternates: { canonical: "/cases/quality-change-intelligence-lab" },
  openGraph: {
    title: "Quality Change Intelligence Lab | Case — Jonas Dávila",
    description:
      "Quando não é possível executar tudo, Quality Engineering precisa decidir o que verificar primeiro.",
    type: "article",
  },
};

export default function QualityChangeIntelligenceCase() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const repoUrl = "https://github.com/jonasqasoftware/quality-change-intelligence-lab";

  return (
    <>
      <header className="nav-wrap">
        <nav className="nav shell" aria-label="Navegação do case">
          <a className="brand" href={`${basePath}/`} aria-label="Jonas Dávila — início">
            JD<span>.</span>
          </a>
          <a className="nav-cta" href={`${basePath}/#cases`}>← Voltar ao portfólio</a>
        </nav>
      </header>

      <main className="case-page shell">
        <div className="case-page-header">
          <p className="eyebrow">CASE EM DESTAQUE</p>
          <h1>Quality Change Intelligence Lab</h1>
          <p className="case-page-lead">
            Quando não é possível executar tudo, Quality Engineering precisa decidir o que verificar
            primeiro e tornar explícito o risco que permanece. Este laboratório em Go formaliza essa
            decisão — sem inteligência artificial, apenas raciocínio determinístico sobre risco.
          </p>
          <div className="case-page-tags">
            {["Go", "CLI", "Risk-Based Testing", "GitHub Actions"].map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>

        <section className="case-page-block">
          <h2>Problema</h2>
          <p>
            Dada uma mudança e um catálogo de verificações candidatas, nem sempre há tempo (ou orçamento de
            CI) para executar tudo. A ferramenta recebe uma descrição estruturada da mudança e decide, dentro
            de um orçamento de tempo, qual subconjunto de verificações maximiza a cobertura de risco
            disponível.
          </p>
        </section>

        <section className="case-page-block">
          <h2>Risco</h2>
          <p>
            O risco de cada componente alterado é calculado como criticidade × tipo de mudança. As
            verificações do catálogo são associadas a esses riscos por palavra-chave de componente e por tag
            de risco, o que torna o mapeamento auditável em vez de implícito.
          </p>
        </section>

        <section className="case-page-block">
          <h2>Estratégia</h2>
          <p>
            A seleção usa um método declarado como <code>exact-maximum-risk-coverage</code>: dentro do
            orçamento de tempo informado, escolhe o conjunto de verificações que maximiza a cobertura de
            risco. Cada entrada do catálogo é classificada como selecionada, não selecionada (risco já
            coberto por outra verificação) ou excluída (nível não permitido) — com o motivo explícito no
            relatório gerado.
          </p>
        </section>

        <section className="case-page-block">
          <h2>Decisões de engenharia</h2>
          <ul>
            <li>Deliberadamente sem IA, banco de dados, API ou dashboard: apenas a biblioteca padrão do Go, para manter o raciocínio central auditável e sem dependências.</li>
            <li>A ferramenta não prevê defeitos nem substitui a decisão de quem faz QA/QE — formaliza e documenta a priorização, não a automatiza cegamente.</li>
            <li>Limite conhecido e documentado: a otimização exata cobre até 20 candidatos mapeados, com fallback guloso para catálogos maiores — uma restrição assumida, não escondida.</li>
          </ul>
        </section>

        <section className="case-page-block">
          <h2>Evidências</h2>
          <ul>
            <li>Relatório de exemplo no README mostra 3 verificações selecionadas de um catálogo maior, com uma marcada &ldquo;não selecionada&rdquo; por risco já coberto e outra &ldquo;excluída&rdquo; por nível não permitido.</li>
            <li>Documentação dedicada: <code>docs/DECISION_MODEL.md</code>, <code>docs/QUALITY_STRATEGY.md</code> e <code>docs/FORMATO-DAS-ENTRADAS.md</code>.</li>
            <li>CI (<code>.github/workflows/quality.yml</code>) executa gofmt, go vet, <code>go test -race -coverprofile</code>, build e gera um relatório sintético publicado como artefato.</li>
            <li>O próprio README classifica seus exemplos como sintéticos — não são evidência de produção nem de um release real, e o case preserva essa ressalva.</li>
          </ul>
        </section>

        <section className="case-page-block">
          <h2>Stack</h2>
          <div className="case-page-tags">
            {["Go 1.18+", "Biblioteca padrão (stdlib)", "CLI"].map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </section>

        <div className="case-page-actions">
          <a className="button button-dark" href={repoUrl} target="_blank" rel="noreferrer">
            Ver código no GitHub <span aria-hidden="true">{"↗︎"}</span>
          </a>
          <a className="button button-light" href={`${basePath}/#cases`}>
            Voltar ao portfólio
          </a>
        </div>
      </main>

      <footer><div className="shell"><span>JONAS DÁVILA · QUALITY ENGINEERING</span><span>PORTO ALEGRE · BRASIL</span><span>© {new Date().getFullYear()}</span></div></footer>
    </>
  );
}
