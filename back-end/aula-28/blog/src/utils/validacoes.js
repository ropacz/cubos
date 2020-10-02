/**
 * Função valida se o metódo enviado é válido.
 */
const conferirMetodos = (ctx, next) => {
	const { method } = ctx;
	if (
		method !== 'GET' &&
		method !== 'POST' &&
		method !== 'PUT' &&
		method !== 'DELETE'
	) {
		ctx.status = 400;
		ctx.body = {
			status: 'erro',
			dados: {
				mensagem: 'Metódo não implementado.',
			},
		};
	} else {
		next();
	}
};
/**
 * Função retorna uma mensagem de conteúdo não encontrado para usuário.
 */
const conteudoNaoExiste = (ctx) => {
	ctx.status = 404;
	ctx.body = {
		status: 'erro',
		dados: {
			mensagem: 'Conteúdo não encontrado.',
		},
	};
};

module.exports = { conferirMetodos, conteudoNaoExiste };
