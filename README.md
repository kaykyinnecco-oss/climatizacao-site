# Aeris — Climatização

Site demonstrativo premium desenvolvido para a K-Agency. Aeris é uma empresa fictícia; projetos, contatos e depoimentos são ilustrativos. Não há transmissão nem armazenamento dos dados do formulário.

## Executar

Requer Node.js 22.12+ (validado com Node 24) e npm.

```bash
npm ci
npm run dev
npm run build
npm run preview
```

Stack: React, TypeScript, Vite, Motion, Lucide e CSS responsivo. Fonte Manrope hospedada localmente. Todas as fotografias são arquivos WebP locais gerados por IA; não dependem de URLs externas.

## Personalizar

- `src/config.ts`: marca, logo, cores, contatos, textos comerciais, serviços, equipamentos, fotos, projetos e depoimentos.
- `src/components/ui.tsx`: componentes compartilhados, botões, imagens com skeleton e revelações.
- `src/sections/`: seções independentes da página.
- `src/contact.ts`: validação e ponto de integração do formulário. Substitua o adaptador demonstrativo quando houver backend real; implemente validação no servidor, política de privacidade e estados de envio/erro.
- `src/styles.css`: direção visual, breakpoints e redução de movimento.
- `index.html`: título, descrição, favicon e Open Graph. Ao usar uma marca e domínio reais, atualize os metadados e use URL absoluta em `og:image`; adicione canonical e sitemap com o domínio publicado.
- `public/images/`: nove assets gerados usando a ferramenta Imagegen integrada. Prompts finais em `docs/image-prompts.json`.

Os nomes de fabricantes são referências tipográficas ilustrativas; não há declaração de parceria, autorização ou representação. Substitua somente por arquivos de marca cuja utilização tenha sido autorizada pelo cliente.

## Publicar na Vercel

1. Importe o repositório `kaykyinnecco-oss/climatizacao-site` na sua conta Vercel.
2. Selecione a branch `main` e a raiz do repositório como Root Directory.
3. O arquivo `vercel.json` já define **Vite**, build **`npm run build`** e saída **`dist`**.
4. Não são necessárias variáveis de ambiente para esta demonstração.
5. Clique em Deploy e configure o domínio desejado.

Não é necessário servidor, banco de dados nem função serverless. O site está preparado para hospedagem estática; o formulário continua demonstrativo depois do deploy.

## Verificação

```bash
npm test
npm audit
```

Os testes Playwright usam Microsoft Edge instalado (`channel: 'msedge'`). Em CI ou outro sistema, adapte o channel para Chromium e instale o browser do Playwright. Cobrem navegação, lightbox, validação, ausência de envio, imagens, console, redução de movimento, seis larguras de tela e auditoria WCAG automatizada via axe. Auditoria automática não substitui uma avaliação manual completa de acessibilidade.

Imagens de referência anexadas não estavam disponíveis na conversa original; a direção visual foi desenvolvida a partir do briefing textual.
