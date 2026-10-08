# Verificação da demonstração

Fluxo: visitante explora serviços e projetos, navega entre imagens e preenche o formulário; a validação ocorre no navegador e mostra confirmação demonstrativa, sem API ou armazenamento.

- Compilação TypeScript e build Vite de produção.
- Imagens locais carregadas sem falha e nenhum erro JavaScript/console no fluxo automatizado.
- Filtro por categoria, lightbox, setas de navegação, Escape e retorno de foco ao botão original.
- Validação dos seis campos e foco no primeiro campo inválido.
- Confirmação do modo demo, sem requisições de envio ou gravação em localStorage.
- Menu mobile e navegação de depoimentos.
- Ausência de overflow horizontal em 360, 390, 768, 1024, 1440 e 1920 px.
- Preferência de redução de movimento respeitada.
- Auditoria axe para WCAG 2 A/AA e 2.1 AA.
- Inspeção visual de desktop e smartphone por screenshots.

Limites: não houve medição de Core Web Vitals em tráfego real nem validação em aparelhos físicos. Backend e envio de mensagens não fazem parte da demonstração. Publicação na Vercel depende da importação do repositório na conta escolhida pelo proprietário.
