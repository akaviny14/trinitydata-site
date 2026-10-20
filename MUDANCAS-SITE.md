# Registro de mudanças do site

Uma linha por mudança, para comparar antes e depois e, se for o caso, voltar atrás. A rodada de 19/10/2026 aplica a especificação "Site da Trinity Data: versão mobile utilizável e WhatsApp como ação principal" (`Testes/Site/2026-10-19-site-mobile-whatsapp-design.md`), aprovada pelos sócios.

O código está no ramo `mobile-whatsapp` do projeto. As mudanças marcadas com uma chave do `config.js` voltam atrás só trocando o valor dela. As outras voltam revertendo o commit da rodada.

## Rodada de 19/10/2026: celular utilizável e WhatsApp como ação principal

| ID | Mudança | Onde | Por quê | Como voltar |
|---|---|---|---|---|
| M01 | Os botões principais abrem o WhatsApp com a mensagem pronta: cabeçalho ("Falar no WhatsApp") e abertura, Como funciona, menu, barra fixa e fechamento ("Falar com a Trinity no WhatsApp"; até a noite de 19/10, "Conversar no WhatsApp"). | celular e desktop | O objetivo é a conversa no WhatsApp. | `ctaPrincipal: 'formulario'` (só vale com `formularioDestino` preenchido; o botão do fechamento continua no WhatsApp, porque o formulário fica ao lado dele). |
| M02 | Formulário como opção secundária, abaixo do botão do WhatsApp, com o título "Prefere que a gente entre em contato?": Nome, Empresa, "WhatsApp ou e-mail" e "Qual é o maior problema com os dados hoje?". Envia pelo Formspree (desde a noite de 19/10); "Contato recebido" só depois de uma resposta de sucesso; uma falha mostra o link do WhatsApp. Campo-armadilha contra robôs. | celular e desktop | O formulário antigo não enviava nada; sem um campo de contato não haveria como responder. | `formularioDestino: ''` esconde o formulário. |
| M03 | Fechamento: texto "Conte o que você precisa pelo WhatsApp." e passos "Você chama no WhatsApp", "Respondemos {prazo}" (sem prazo: "Respondemos por lá mesmo") e "Entendemos o seu cenário". No desktop, o botão ocupa a coluna da direita, onde ficava o formulário. | celular e desktop | Os passos antigos descreviam o formulário. | Reverter o commit. Texto antigo: "Conte o que você precisa e retornamos o contato." e "Você deixa seu contato / Retornamos pelo e-mail ou WhatsApp / Entendemos o seu cenário". |
| M04 | Linha de prova abaixo dos botões da abertura (`textoProva · resposta {prazoResposta}`) e o número em destaque no Sobre, acima dos diferenciais. | celular e desktop, só com os campos preenchidos | Os sites que convertem mostram prova na primeira tela. | Deixar `textoProva` e `prazoResposta` vazios. |
| M05 | Seção Blog só aparece com pelo menos um post real em `posts`. Sem posts, somem também o botão Blog do cabeçalho e os links do menu e do rodapé. "Ver todos os artigos no blog" só aparece com `blogUrl`. O campo `blog` virou `blogUrl`. | celular e desktop | Os títulos eram "Título do artigo a definir". | Preencher `posts` (e `blogUrl`). |
| M06 | Nenhum link visível sem destino: ficam ocultos "Ver o serviço", "Conheça a empresa", "Resposta completa no blog" (cada pergunta pode ganhar o endereço do artigo como 4º campo) e os contatos sem dado. | celular e desktop | Links que levavam a lugar nenhum. | Cada um volta a aparecer quando ganha um endereço real. |
| M07 | Valores fictícios apagados do `config.js`: domínio, e-mail, LinkedIn e cidade. No rodapé, só aparece o que estiver preenchido. | celular e desktop | Nada fictício no ar. | Preencher com os dados reais. |
| M08 | Medição: função `track(evento, dados)` com os eventos `whatsapp_clique` (com a origem do botão), `exemplo_aberto`, `servico_aberto` e `fim_da_pagina`. Previstos Umami e Vercel Web Analytics, os dois sem cookies. | celular e desktop | Hoje ninguém sabe quantas conversas o site gera. | `analytics: null` (é o padrão: nada é medido até os sócios escolherem o provedor). Ao ligar, liberar o domínio do provedor na Content-Security-Policy do `vercel.json`. |
| M09 | O degradê entre seções ignora seções ocultas, e duas seções brancas juntas não somam o respiro. Com o Blog oculto, Como funciona passa direto para as perguntas. | desktop | Com o Blog oculto, aparecia uma faixa cinza solta entre duas seções brancas. | Reverter o commit. |
| M10 | Celular: título da abertura em 28 px (sem limite de largura, 3 linhas), títulos de seção e do fechamento em 24 px, respiro das seções de 56 para 40 px. | celular | O título ocupava quase um terço da tela. | Reverter o commit. |
| M11 | Celular: sem nenhum padrão em canvas (rede, milimetrados, ondas, séries), painel da abertura parado na primeira cena, sem ímãs de rolagem e sem entrada animada dos blocos. | celular | Desempenho e menos movimento. | Reverter o commit. |
| M12 | Celular: o menu fica com as seções, a linha "Tema" e um botão só para o WhatsApp. (Entre a tarde e a noite de 19/10 o tema seguia o do aparelho e a linha "Tema" tinha saído; voltou atrás em M28.) | celular | Uma ação no menu. | Reverter o commit. |
| M13 | Celular: a barra fixa tem um botão só, de largura total, com o ícone do WhatsApp. Aparece depois da abertura, some quando o fechamento entra e não volta sobre o rodapé. Respeita a área segura do iPhone. | celular | Antes o botão principal levava ao formulário, e o WhatsApp era um ícone pequeno. | Reverter o commit. |
| M14 | Celular: os 4 serviços viram blocos que abrem ao tocar (ícone e título; aberto, o DEPOIS). Um 5º bloco, "IA sobre os dados certos", traz a seção de IA em versão curta; a seção de IA não aparece no celular. | celular | A seção de IA repetia os serviços e usava um carrossel. | Reverter o commit. |
| M15 | Celular: os exemplos viram blocos que abrem ao tocar, no lugar das abas. O primeiro começa aberto, abrir um fecha os outros, o painel só é montado ao abrir e mostra só o gráfico principal. | celular | Abas e trilho lateral eram difíceis de usar no toque. | Reverter o commit. |
| M16 | Celular: Números de mercado compactos (número em 22 px na linha da frase, fonte em 13 px). | celular | O bloco ocupava quase uma tela. | Reverter o commit. |
| M17 | Celular: a faixa de ferramentas que rolava sozinha vira texto parado. | celular | Menos movimento. | Reverter o commit. |
| M18 | Celular: o Blog, quando houver posts, é uma lista vertical de até três, sem carrossel. | celular | Sem carrosséis no celular. | Reverter o commit. |
| M19 | Celular: Dores e Como funciona com menos espaço entre os itens. | celular | Página mais curta sem tirar conteúdo. | Reverter o commit. |
| M21 | Blog (tema do Ghost): botão único "Conversar no WhatsApp" no cabeçalho, no menu, na chamada final e na barra do celular, que passa a ter um botão de largura total; passos da chamada final iguais aos do site; no celular, o tema segue o do aparelho; e-mail e LinkedIn do rodapé só aparecem quando preenchidos nas configurações do tema. | blog, celular e desktop | Ninguém notou o quadradinho do WhatsApp no teste informal do Mateus; o "Falar com a Trinity" do blog levava ao formulário, agora oculto. | Reverter o commit e subir o tema anterior no Ghost. |
| M20 | Código que deixou de ser usado foi removido: trilho de gráficos dos exemplos com os marcadores, setas da faixa de abas e trilho da IA no celular. | celular | Nada rodando sem uso. | Reverter o commit. |

## Ajustes da noite de 19/10/2026: decisões dos sócios sobre a rodada da tarde

| ID | Mudança | Onde | Por quê | Como voltar |
|---|---|---|---|---|
| M22 | Rótulo dos botões: "Falar com a Trinity no WhatsApp" nos botões grandes e "Falar no WhatsApp" no cabeçalho. Botões grandes com 16 px de lado no celular, para caber numa linha até 360 px. | celular, desktop e blog | Junta o "Falar com a Trinity" que o Mateus queria com o "WhatsApp" escrito no botão que a pesquisa indicou; "WhatsApp Trinity" não tem verbo e soa como nome de produto. | Trocar o texto dos elementos `data-cta`. |
| M23 | Formulário ligado ao Formspree (`https://formspree.io/f/mgaobpqj`), com o campo "WhatsApp ou e-mail"; `formspree.io` liberado em `connect-src` nos dois `vercel.json`; política de privacidade com o Formspree como recebedor. | celular e desktop | Decisão dos sócios: testar o Formspree. | `formularioDestino: ''`. |
| M24 | Sem ímãs de rolagem: a página não desliza mais sozinha para enquadrar os Exemplos e o bloco de IA. | desktop | Os ímãs puxavam a página e brigavam com a roda do mouse (reclamação da noite de 19/10; numa simulação com a roda, saltos de 325 px quando a pessoa descia 100). | Reverter o commit. |
| M25 | Exemplos: "Relatório automático" passa a ser o primeiro (aba e bloco do celular). Na tela larga, os painéis trocam sozinhos a cada 9 s com a demonstração na tela; a troca pausa com o foco do teclado e para quando o visitante escolhe uma aba. No celular não há troca automática. | desktop e celular | O relatório é o que o gestor quer ver; a troca mostra os outros painéis sem exigir clique. | Reverter o commit. |
| M26 | Ícone da aba do navegador com o símbolo oficial. | celular e desktop | O site pedia `favicon.ico`, que não existia, e o console mostrava um erro 404. | Reverter o commit. |
| M27 | Ícones de LinkedIn, Instagram e YouTube no rodapé, abaixo da descrição, no site e no blog. Cada um só aparece com o endereço preenchido (`linkedin`, `instagram`, `youtube` no `config.js`; Customize no Ghost). O LinkedIn sai da lista de texto da coluna Contato. No blog, os padrões do tema deixam de trazer o e-mail fictício e o texto antigo da chamada final. | celular, desktop e blog | Pedido do Vinicius. | Esvaziar os campos. |
| M28 | Celular volta a abrir sempre no tema claro, e a linha "Tema" volta ao menu (a escolha fica guardada). Desfaz a parte de tema de M12. | celular | O Vinicius viu o site abrir escuro no celular e não achou onde trocar. Volta à decisão de 13/10. | Reverter o commit. |

## Medidas da rodada

| | Antes | Depois |
|---|---|---|
| Altura no celular (390 × 844) | 9.692 px (11,5 telas) | 6.647 px (7,9 telas, com o primeiro exemplo aberto, como a página carrega) |
| Canvas visíveis no celular | 5 | 0 |
| Quadros de animação pedidos em 1,5 s, depois do carregamento, no celular | 90 | 0 |
| Altura no desktop (1440 × 900) | 9.032 px | 7.779 px (sobretudo pelo Blog oculto) |

As medidas foram feitas no Chrome headless com a tela emulada, a partir do protótipo (`prototipo/home.html`), com o `config.js` desta rodada.

## Como comparar

Com o tráfego atual, um teste A/B com divisão aleatória não teria volume para concluir nada. O combinado é comparar períodos: medir de 4 a 8 semanas com a versão nova e, para testar uma variação (por exemplo, `ctaPrincipal`), trocar a chave e medir outro período igual. A medição precisa estar no ar antes da troca, para haver um "antes".
