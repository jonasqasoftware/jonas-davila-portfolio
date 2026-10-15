# CLAUDE.md

Portfólio pessoal de Jonas Davila (Senior Quality Engineer, autor do AIMA 2.0). Página única bilíngue — português em `/` e inglês em `/en/` —, sem CMS: todo o conteúdo é código.

## Arquitetura

- **Next.js 16 (App Router) + React 19**, exportado como site estático para o **GitHub Pages**.
- `next.config.ts` usa `output: "export"`; o build oficial gera o diretório `out/`.
- O runtime **vinext** e os arquivos de Sites permanecem temporariamente apenas como rollback da hospedagem anterior. Não são o destino oficial de publicação.
- Estilo: Tailwind CSS v4 + CSS customizado extenso em `app/globals.css`. A maior parte do visual vem de classes CSS escritas à mão, não de utilitários Tailwind no JSX.
- Todo o conteúdo do site (textos, links, seções) vive em `app/content.ts`, com um objeto `pt` e um `en` de mesma estrutura. `app/portfolio.tsx` monta a página a partir dele; `app/(pt)/page.tsx` e `app/(en)/en/page.tsx` só escolhem o idioma.
- Há dois layouts raiz (`app/(pt)/layout.tsx` com `lang="pt-BR"` e `app/(en)/en/layout.tsx` com `lang="en"`), para que cada idioma declare o próprio `lang`, canonical e `hreflang`.

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

- Manter as duas versões em paridade: toda mudança de texto em `pt` precisa da equivalente em `en` (a tradução cobre a experiência inteira, não só a navegação). O nome é escrito **Jonas Davila**, sem acento.
- Não introduzir dependências ou padrões de deploy específicos de Vercel (ex.: `next start`, Vercel Analytics, `vercel.json`) — o app não roda em Vercel.
- O site oficial deve continuar totalmente estático: não introduzir SSR, API Routes ou dependências de servidor incompatíveis com GitHub Pages.
- `db/schema.ts` está intencionalmente vazio. Não ativar/usar banco real sem decisão explícita.
- `app/chatgpt-auth.ts` (helpers de SIWC) está presente mas **não é usado hoje** — nenhuma rota chama `getChatGPTUser`/`requireChatGPTUser`. Não remover silenciosamente nem ativar sem confirmar a intenção com o usuário.
- Preferir editar `app/content.ts`/`app/portfolio.tsx`/`app/globals.css` diretamente a criar novos componentes/abstrações — é uma página única e deve continuar simples.
- Preservar os scripts legados de Sites enquanto o rollback for necessário; não misturá-los com o fluxo do GitHub Pages.
- Nunca commitar `.env*`, `.sites-runtime/`, `.wrangler/` (já gitignored) — não remover essas entradas do `.gitignore`.

## UX e identidade visual

- Usar um sistema de cores centralizado em variáveis CSS dentro de `app/globals.css`. Não espalhar cores hexadecimais diretamente pelos componentes.
- Manter a identidade editorial "pôster" baseada em:
  - off-white de fundo: `#F3F2EE`;
  - grafite principal: `#1E2024`;
  - coral de destaque: `#CF5A43` (texto pequeno usa o coral escuro `#A8432F` para manter contraste);
  - azul apenas para links: `#2E5B88`;
  - tema escuro via `light-dark()` dentro do bloco `:root`;
  - nome e títulos em Archivo condensado (largura 62), corpo em IBM Plex Sans, dados em JetBrains Mono.
  - as fontes são hospedadas no próprio repositório (`app/_fonts`, WOFF2 variável com subconjunto latino e licença OFL) e carregadas com `next/font/local`. Não voltar para `next/font/google`: ele baixa as fontes do Google durante o build e deixava o CI instável.
- Garantir contraste mínimo **WCAG AA**.
- Usar o coral com intenção: bloco atrás do retrato, destaques de título, selo GO e CTAs da faixa do AIMA.
- Botão de ação principal (`.button-primary`): ferrugem `#A8432F` com texto branco em superfícies claras e coral claro `#EF8A73` com texto escuro em superfícies escuras (tokens `--cta`/`--on-cta`). Por decisão do Jonas, ficam coloridos: o "Falar comigo" fixo do menu (`.nav-cta`), os dois botões do topo (WhatsApp e currículo) e todos os botões da seção Contato. O topo não tem link de LinkedIn nem repete o "Falar comigo". Links de código no GitHub são sempre link de texto (`.project-link`) e anunciam o nome do repositório em `.sr-only`.
- Rótulos de botão começam com verbo e dizem o destino quando saem do site (ex.: "Enviar e-mail", "Conversar no WhatsApp", "Ver código no GitHub"); a mesma ação usa o mesmo rótulo em todo o site.
- Evitar excesso de gradientes, brilhos, sombras, cards arredondados e elementos que deixem o site com aparência genérica de template ou "feito por IA".
- Priorizar uma estética editorial, técnica e autoral, inspirada em publicações de tecnologia e design.
- Manter consistência de espaçamento, tipografia, bordas, estados interativos e componentes.
- Toda mudança visual deve funcionar em desktop e celular.
- Não alterar conteúdo profissional, links, fotografia ou estrutura de deploy sem autorização.
