# CLAUDE.md

Portfólio pessoal de Jonas Dávila (Senior Quality Engineer, autor do AIMA 2.0). Página única em português, sem CMS — todo o conteúdo é código.

## Arquitetura (não é Next.js/Vercel padrão)

- **Next.js 16 (App Router) + React 19**, mas o runtime de deploy é **vinext** (`cloudflare/vinext`): o app compila para um **Cloudflare Worker**, não para Node nem para a plataforma Vercel.
- `worker/index.ts` é o entrypoint real do Worker: trata `/_vinext/image` (otimização de imagem via binding `IMAGES`) e delega o resto ao handler do vinext.
- Bundler: **Vite 8** + `@cloudflare/vite-plugin` (simula bindings do Worker localmente via Miniflare).
- Estilo: Tailwind CSS v4 + CSS customizado extenso em `app/globals.css`. A maior parte do visual vem de classes CSS escritas à mão, não de utilitários Tailwind no JSX.
- Todo o conteúdo do site (textos, links, seções) está inline em `app/page.tsx` como arrays de dados — não há CMS nem arquivos de conteúdo separados.

## Deploy: plataforma "Sites" da OpenAI

Este projeto roda na infraestrutura interna **Sites** da OpenAI, não em Vercel/Cloudflare Pages diretamente.

- `.openai/hosting.json` declara `project_id` e bindings opcionais de D1/R2. **Não editar sem entender o impacto no hosting** — é consumido pelo builder remoto.
- O builder remoto roda `npm run build` no commit enviado. Isso executa, em sequência: `scripts/build-verified.sh` → `vinext build` (com timeout via GNU `timeout`) → `scripts/validate-artifact.sh` (valida que `dist/server/index.js` exporta `default.fetch` ESM e que `dist/.openai/hosting.json` existe).
- `build/sites-vite-plugin.ts` copia `.openai/hosting.json` e `drizzle/` para `dist/.openai/` no `closeBundle`.
- `scripts/sites-env.sh` isola HOME/npm-cache/tmp em `.sites-runtime/` (gitignored, disposable) para builds sandboxed.
- **Não repetir install/build como parte normal do fluxo de checkpoint** — o pipeline remoto já faz isso; scripts locais são só para diagnóstico pontual (ver README, seção "Diagnostic Commands").
- Headers de identidade (`oai-authenticated-user-email` etc.) e o fluxo "Sign in with ChatGPT" (SIWC) são geridos pelo dispatch da plataforma. **Nunca implementar rotas próprias em** `/signin-with-chatgpt`, `/signout-with-chatgpt`, `/callback` — são reservadas.

## Requisitos de ambiente

- Node **>=22.13.0** (verificar `node -v` antes de rodar scripts — builds falham/comportam-se de forma imprevisível com versões menores).
- Linux com `flock`, `curl`, `sha256sum` e GNU `timeout` (scripts não são portáveis para macOS).
- `scripts/*.sh` precisam de bit de execução (`chmod +x`) para rodar via `npm run install:ci` / `build` / etc. Se um checkout vier sem esse bit, os scripts falham com "Permissão negada" — não é um bug do script em si.

## Testes

- `npm test` = `npm run build && node --test tests/rendered-html.test.mjs`.
- O único teste existente (`tests/rendered-html.test.mjs`) verifica apenas que o worker responde 200/HTML com uma meta tag `codex-preview: development` — **não cobre conteúdo real do site** (textos, links, SEO). Ao adicionar testes novos, preferir verificar conteúdo real (heading principal, links de contato, meta tags) em vez de apenas replicar esse smoke test genérico do template.

## Regras permanentes

- Manter todo o conteúdo visível do site em **português (pt-BR)** — é o idioma de todo o texto existente em `app/page.tsx`.
- Não introduzir dependências ou padrões de deploy específicos de Vercel (ex.: `next start`, Vercel Analytics, `vercel.json`) — o app não roda em Vercel.
- `db/schema.ts` está intencionalmente vazio e `.openai/hosting.json` tem `d1: null`. Não ativar/usar D1 real sem decisão explícita — usar `examples/d1/` apenas como referência, não como código ativo.
- `app/chatgpt-auth.ts` (helpers de SIWC) está presente mas **não é usado hoje** — nenhuma rota chama `getChatGPTUser`/`requireChatGPTUser`. Não remover silenciosamente nem ativar sem confirmar a intenção com o usuário.
- Preferir editar `app/page.tsx`/`app/globals.css` diretamente a criar novos componentes/abstrações — é uma página única e deve continuar simples.
- Scripts de build/instalação (`scripts/*.sh`) são deliberadamente não-retry e com timeout curto — não adicionar lógica de retry/fallback neles; isso é uma decisão de design do pipeline Sites (ver comentários no README).
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
