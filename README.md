# Jonas Dávila — Quality Engineering Portfolio

Portfólio profissional de **Jonas Dávila**, Senior QA Engineer / Quality Engineer, autor do projeto AIMA 2.0.

Produção: **https://jonasdavila.com.br**

## Objetivo

Página única, em português, que apresenta de forma escaneável:

- experiência profissional (empresa, cargo, período e impacto);
- competências técnicas e estratégicas;
- AIMA 2.0, projeto autoral de pesquisa aplicada;
- formação e estudos contínuos;
- currículo para download;
- contato.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4 + CSS customizado (`app/globals.css`)
- Export estático (`next build` com `output: "export"`)
- GitHub Actions + GitHub Pages

## Arquitetura

- Todo o conteúdo visível do site está inline em `app/page.tsx`, como arrays de dados — não há CMS.
- `app/layout.tsx` define metadata, Open Graph e o grafo JSON-LD (`Person` + `CreativeWork`).
- `app/site-nav.tsx` implementa a navegação, incluindo o menu mobile.
- `app/robots.ts`, `app/sitemap.ts` e `app/manifest.ts` geram os artefatos técnicos de SEO/PWA.
- `public/` contém os assets estáticos servidos diretamente, incluindo o currículo em PDF.
- `next.config.ts` usa `output: "export"` com `basePath` controlado por `NEXT_PUBLIC_BASE_PATH`, para funcionar tanto no domínio próprio quanto em um subcaminho do GitHub Pages.

## Qualidade

- CI/CD via GitHub Actions, com build e validação automática a cada push em `main`.
- Validação do artefato de export estático (`scripts/validate-pages-build.mjs`) antes da publicação.
- Suíte de testes de SEO técnico sobre o HTML exportado (`tests/pages/`): canonical, JSON-LD, robots, sitemap, ícones e manifest.
- Suíte adicional (`tests/`) que valida estrutura, conteúdo e regressões de CSS/acessibilidade.
- Skip link, foco visível, navegação por teclado, menu mobile com `aria-expanded`/`aria-controls` e suporte a `Escape`, e respeito a `prefers-reduced-motion`.

## Executar e testar

```bash
npm ci
npm run test:pages   # build de export estático + validação do artefato + suíte de SEO (fluxo oficial de publicação)
npm test              # build e suíte legada adicional (runtime Vinext, mantida por compatibilidade)
```

O script `npm run dev` usa o runtime **Vinext/Vite** (fluxo legado, descrito abaixo), não o `next dev` — para desenvolvimento local orientado ao export estático, use `npm run build:pages` para gerar `out/` e inspecionar o resultado.

## Deploy

1. Push para `main`.
2. `.github/workflows/deploy-pages.yml` executa `npm ci` e `npm run test:pages`.
3. O artefato estático (`out/`) é publicado como GitHub Pages Artifact.
4. O GitHub Pages publica o conteúdo no domínio configurado (`jonasdavila.com.br`, via domínio personalizado no GitHub Pages e DNS na KingHost).

## Legado / compatibilidade

O repositório ainda mantém arquivos e scripts de uma hospedagem anterior baseada em **Vinext/Cloudflare** (`worker/`, `build/`, `.openai/hosting.json`, `db/`, `drizzle/`, scripts `*.sh`), preservados temporariamente apenas como caminho de rollback. Eles não fazem parte do fluxo oficial de publicação (GitHub Pages) e não devem ser usados para novas mudanças de conteúdo ou deploy.
