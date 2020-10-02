const gerarCodigo = require('../utils/code');
const response = require('./response');

const urls = [];

/**
 * Função para encurtar a url
 */
const shorter = (ctx) => {
	const { url } = ctx.request.body;

	if (!url) {
		response(ctx, 400, { mensagem: 'Pedido mal-formatado!' });
	} else {
		const codigo = gerarCodigo();
		urls.push({ [codigo]: url });

		response(ctx, 201, {
			urlOriginal: url,
			url_encurtada: `localhost:8081/encurta/${codigo}`,
		});
	}
};

/**
 * Obtém uma url anteriormente encurtada
 */
const obterUrl = (codigo) => {
	for (let i = 0; i < urls.length; i++) {
		return urls[i][codigo];
	}

	return null;
};

/**
 * Função para redirecionar a url
 */
const redirect = (ctx) => {
	const urlDesejada = ctx.params.id;
	const urlOriginal = obterUrl(urlDesejada);

	if (urlOriginal) {
		ctx.status = 301;
		ctx.redirect(urlOriginal);
	} else {
		response(ctx, 404, { mensagem: 'Conteúdo não encontrado!' });
	}
};

module.exports = { shorter, redirect };
