# CLAUDE.md

Portfólio pessoal de Jonas Dávila (Senior Quality Engineer, autor do AIMA 2.0). Página única em português, sem CMS — todo o conteúdo é código.

## Arquitetura

- **Next.js 16 (App Router) + React 19**, exportado como site estático para o **GitHub Pages**.
- `next.config.ts` usa `output: "export"`; o build oficial gera o diretório `out/`.
- O runtime **vinext** e os arquivos de Sites permanecem temporariamente apenas como rollback da hospedagem anterior. Não são o destino oficial de publicação.
- Estilo: Tailwind CSS v4 + CSS customizado extenso em `app/globals.css`. A maior parte do visual vem de classes CSS escritas à mão, não de utilitários Tailwind no JSX.
- Todo o conteúdo do site (textos, links, seções) está inline em `app/page.tsx` como arrays de dados — não há CMS nem arquivos de conteúdo separados.

## Deploy oficial: GitHub Pages

O repositório `jonasqasoftware/jonas-davila-portfolio` é a fonte oficial.

- `.github/workflows/deploy-pages.yml` executa o build e publica o artefato estático.
- `npm run build:pages` gera `out/` com o Next.js.
- `npm run test:pages` gera e valida o artefato que será publicado.
- O domínio oficial é `jonasdavila.com.br`; o domínio personalizado é configurado no GitHub Pages e no DNS da KingHost.
- Nunca trocar o DNS antes de a publicação do GitHub Pages estar concluída e acessível.
- `.openai/hosting.json`, `worker/`, `build/` e os scripts de Sites são legado temporário para rollback. Não usá-los para novas publicações nem removê-los sem uma decisão explícita.

## Requisitos de ambiente

- Node **>=22.13.0** (verificar `node -v` antes de rodar scripts — builds falham/comportam-se de forma imprevisível com versões menores).
- Para validar a hospedagem oficial, usar `npm ci` e `npm run test:pages`.
- Os scripts `*.sh` e requisitos Linux pertencem somente ao fluxo legado do Sites.

## Testes

- `npm test` mantém a suíte do runtime legado.
- `npm run test:pages` valida a exportação estática oficial, incluindo o HTML principal, conteúdo crítico, canonical e ativos.

## Regras permanentes

- Manter todo o conteúdo visível do site em **português (pt-BR)** — é o idioma de todo o texto existente em `app/page.tsx`.
- Não introduzir dependências ou padrões de deploy específicos de Vercel (ex.: `next start`, Vercel Analytics, `vercel.json`) — o app não roda em Vercel.
- O site oficial deve continuar totalmente estático: não introduzir SSR, API Routes ou dependências de servidor incompatíveis com GitHub Pages.
- `db/schema.ts` está intencionalmente vazio. Não ativar/usar banco real sem decisão explícita.
- `app/chatgpt-auth.ts` (helpers de SIWC) está presente mas **não é usado hoje** — nenhuma rota chama `getChatGPTUser`/`requireChatGPTUser`. Não remover silenciosamente nem ativar sem confirmar a intenção com o usuário.
- Preferir editar `app/page.tsx`/`app/globals.css` diretamente a criar novos componentes/abstrações — é uma página única e deve continuar simples.
- Preservar os scripts legados de Sites enquanto o rollback for necessário; não misturá-los com o fluxo do GitHub Pages.
- Nunca commitar `.env*`, `.sites-runtime/`, `.wrangler/` (já gitignored) — não remover essas entradas do `.gitignore`.

## UX e identidade visual

- Usar um sistema de cores centralizado em variáveis CSS dentro de `app/globals.css`. Não espalhar cores hexadecimais diretamente pelos componentes.
- Manter a identidade profissional baseada em:
  - grafite principal: `#111111`;
  - branco: `#FFFFFF`;
  - dourado de destaque: `#D4A017`;
  - fundos claros e neutros derivados dessa identidade;
  - cores de estado com contraste acessível.
- Garantir contraste mínimo **WCAG AA**.
- Usar o dourado com moderação: CTAs, indicadores, links ativos e detalhes de hierarquia.
- Evitar excesso de gradientes, brilhos, sombras, cards arredondados e elementos que deixem o site com aparência genérica de template ou "feito por IA".
- Priorizar uma estética editorial, técnica e autoral, inspirada em publicações de tecnologia e design.
- Manter consistência de espaçamento, tipografia, bordas, estados interativos e componentes.
- Toda mudança visual deve funcionar em desktop e celular.
- Não alterar conteúdo profissional, links, fotografia ou estrutura de deploy sem autorização.
