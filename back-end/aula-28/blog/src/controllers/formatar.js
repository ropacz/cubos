/**
 * Função retorna a formatação da mensagem de sucesso.
 */
function formatarSucesso(ctx, dados, status = 200) {
	ctx.status = status;
	ctx.body = {
		status: 'sucesso',
		dados,
	};
}
/**
 * Função retorna a formatação da mensagem de erro.
 */
const formatarErro = (ctx, mensagem, status = 404) => {
	ctx.status = status;
	ctx.body = {
		status: 'erro',
		dados: {
			mensagem,
		},
	};
};

module.exports = { formatarErro, formatarSucesso };
