import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expense Approval Quality Lab | Case — Jonas Dávila",
  description:
    "Estratégia de testes orientada a risco para um fluxo de aprovação de despesas: papéis, autorização, transições de estado, testes de API e E2E com Playwright e TypeScript.",
  alternates: { canonical: "/cases/expense-approval-quality-lab" },
  openGraph: {
    title: "Expense Approval Quality Lab | Case — Jonas Dávila",
    description:
      "Quem pode aprovar uma despesa e o que acontece quando alguém tenta violar as regras de autorização ou de estado.",
    type: "article",
  },
};

export default function ExpenseApprovalCase() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const repoUrl = "https://github.com/jonasqasoftware/expense-approval-quality-lab";

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
          <h1>Expense Approval Quality Lab</h1>
          <p className="case-page-lead">
            Um colaborador envia uma despesa; um gestor aprova ou rejeita. O laboratório trata esse fluxo
            como um problema de autorização e de estado, não apenas como um formulário — e usa testes de
            API e E2E para provar isso.
          </p>
          <div className="case-page-tags">
            {["Playwright", "TypeScript", "Express", "better-sqlite3", "GitHub Actions"].map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>

        <section className="case-page-block">
          <h2>Problema</h2>
          <p>
            O fluxo tem dois papéis — <strong>employee</strong> e <strong>manager</strong> — e um estado
            imutável após a decisão: uma despesa nasce <code>pending</code> e vai para{" "}
            <code>approved</code> ou <code>rejected</code>, sem volta. O problema de engenharia real não é
            &ldquo;o caminho feliz funciona&rdquo;, é: quem pode decidir uma despesa e o que acontece quando
            alguém tenta contornar essa regra.
          </p>
        </section>

        <section className="case-page-block">
          <h2>Risco</h2>
          <p>
            A regra de autorização documentada no laboratório é direta e testável: um gestor só pode decidir
            despesas de colaboradores que se reportam a ele e, independentemente do papel, ninguém pode
            decidir a própria despesa. O risco relevante não está no formulário de envio — está na borda de
            autorização e nas tentativas de violação dela.
          </p>
        </section>

        <section className="case-page-block">
          <h2>Estratégia</h2>
          <p>
            Oito cenários documentados, divididos deliberadamente entre camadas: quatro testes de API e
            quatro E2E. A validação e a autorização — os pontos de maior risco — são comprovadas na camada
            de API, onde o resultado é determinístico e rápido de checar; a camada E2E cobre apenas o que um
            navegador precisa observar. Essa divisão está descrita em{" "}
            <code>docs/TEST_STRATEGY.md</code>, no próprio repositório.
          </p>
        </section>

        <section className="case-page-block">
          <h2>Decisões de engenharia</h2>
          <ul>
            <li>Autorização e transições de estado validadas em API, não replicadas em E2E, para manter o feedback rápido e determinístico.</li>
            <li>Contas fixas com seed conhecido (dois gestores, dois colaboradores) para tornar os cenários reprodutíveis.</li>
            <li>Escopo explicitamente delimitado: sem testes de performance/carga neste laboratório (ficam no laboratório de API com k6), sem suíte dedicada de acessibilidade, sem cobertura multi-browser — o README documenta essas exclusões como decisão, não como lacuna.</li>
          </ul>
        </section>

        <section className="case-page-block">
          <h2>Evidências</h2>
          <ul>
            <li>Cenário S4 — &ldquo;um gestor não pode aprovar a própria despesa&rdquo; (API, prioridade P0).</li>
            <li>Cenário S5 — &ldquo;um colaborador não pode chamar o endpoint de aprovação&rdquo; (API, prioridade P1).</li>
            <li>Cenário S7 — listagem de despesas com escopo por papel/time (API, prioridade P1).</li>
            <li>Cenário S8 — uma despesa decidida não pode ser editada pelo dono (E2E, prioridade P2).</li>
            <li>CI (<code>.github/workflows/tests.yml</code>) executa, em ordem, typecheck → lint → testes de API → testes E2E, com evidência (relatório e traces do Playwright) publicada como artefato em caso de falha.</li>
          </ul>
        </section>

        <section className="case-page-block">
          <h2>Stack</h2>
          <div className="case-page-tags">
            {["Node.js", "TypeScript", "Playwright Test", "Express", "better-sqlite3"].map((tag) => (
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
