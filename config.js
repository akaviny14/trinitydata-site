// Dados de contato e da empresa: o único lugar onde ficam. O WhatsApp já é o real.
// Todo campo vazio deixa oculto o conteúdo que depende dele, e o site funciona assim (MUDANCAS-SITE.md).
window.TD_CONFIG = {
  whatsapp: '5511956511090', // real: +55 11 95651-1090
  whatsappMensagem: 'Olá! Vim pelo site da Trinity Data e gostaria de conversar sobre os dados da minha empresa.',
  ctaPrincipal: 'whatsapp', // 'whatsapp' | 'formulario' (o formulário só vale com formularioDestino preenchido)
  textoProva: '', // ex.: '+120 empresas já atendidas pelos nossos especialistas' (vazio = oculto)
  prazoResposta: '', // ex.: 'em até 1 dia útil' (vazio = oculto; o passo 2 do fechamento fica genérico)
  formularioDestino: 'https://formspree.io/f/mpppvpyq', // Formspree (envia por e-mail aos sócios); vazio = formulário oculto
  posts: [], // [{ titulo, categoria, url }] (vazio = seção Blog oculta, e somem os links para ela)
  blogUrl: 'https://blog.trinitydata.com.br/', // endereço do blog no Ghost; vazio = sem o link "Ver todos os artigos"
  // Medição: Umami próprio da Trinity, sem cookies. Só conta visitas em trinitydata.com.br (não na Vercel nem no protótipo).
  analytics: { provedor: 'umami', id: '6cf81ded-a77c-495e-abf0-31e1ed1783f2', src: 'https://m.trinitydata.com.br/insights.js', dominios: 'trinitydata.com.br,www.trinitydata.com.br' }, // null = sem medição
  dominio: 'trinitydata.com.br', email: '', cidade: '', // vazios até haver dados reais
  linkedin: 'https://www.linkedin.com/company/trinitydata', instagram: 'https://www.instagram.com/_trinitydata/', youtube: '' // redes sociais: endereço completo do perfil; cada ícone do rodapé só aparece com o seu
};

// Carrega o script de medição em todas as páginas que leem este arquivo (home, /empresa, /fretamento, /transportadoras).
// Ao trocar o endereço do script, liberar o novo domínio na Content-Security-Policy (Nginx e vercel*.json).
(function (AN) {
  if (!AN || !AN.provedor || document.querySelector('script[data-td-medicao]')) return;
  var sc = document.createElement('script'); sc.defer = true; sc.setAttribute('data-td-medicao', '');
  if (AN.provedor === 'umami' && AN.id) {
    sc.src = AN.src || 'https://cloud.umami.is/script.js'; sc.dataset.websiteId = AN.id;
    if (AN.dominios) sc.dataset.domains = AN.dominios;
  } else if (AN.provedor === 'vercel') {
    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); }; sc.src = '/_vercel/insights/script.js';
  } else return;
  document.head.appendChild(sc);
})(window.TD_CONFIG.analytics);
