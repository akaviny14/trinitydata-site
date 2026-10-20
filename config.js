// Dados de contato e da empresa: o único lugar onde ficam. O WhatsApp já é o real.
// Todo campo vazio deixa oculto o conteúdo que depende dele, e o site funciona assim (MUDANCAS-SITE.md).
window.TD_CONFIG = {
  whatsapp: '5511956511090', // real: +55 11 95651-1090
  whatsappMensagem: 'Olá! Vim pelo site da Trinity Data e gostaria de conversar sobre os dados da minha empresa.',
  ctaPrincipal: 'whatsapp', // 'whatsapp' | 'formulario' (o formulário só vale com formularioDestino preenchido)
  textoProva: '', // ex.: '+120 empresas já atendidas pelos nossos especialistas' (vazio = oculto)
  prazoResposta: '', // ex.: 'em até 1 dia útil' (vazio = oculto; o passo 2 do fechamento fica genérico)
  formularioDestino: 'https://formspree.io/f/mgaobpqj', // Formspree (envia por e-mail aos sócios); vazio = formulário oculto
  posts: [], // [{ titulo, categoria, url }] (vazio = seção Blog oculta, e somem os links para ela)
  blogUrl: '', // endereço do blog no Ghost (ex.: https://blog.dominio.com.br/); vazio = sem o link "Ver todos os artigos"
  analytics: null, // ex.: { provedor: 'umami', id: '...' } ou { provedor: 'vercel' } (null = sem medição)
  dominio: '', email: '', cidade: '', // vazios até haver dados reais
  linkedin: '', instagram: '', youtube: '' // redes sociais: endereço completo do perfil; cada ícone do rodapé só aparece com o seu
};
