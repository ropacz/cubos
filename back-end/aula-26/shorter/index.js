const Koa = require('koa');
const bodyparser = require('koa-bodyparser');

const server = new Koa();
const router = require('./src/routes');

// INCIA O DOTENV
require('dotenv').config();

server.use(bodyparser());

server.use(router.routes());

/**
 * Ctx
 *  -> Requisição
 *  -> Resposta
 */
server.use((ctx) => {
	ctx.status = 404;
	ctx.body = {
		status: 'erro',
		dado: {
			mensagem: 'Conteúdo não encontrado!',
		},
	};
});

server.listen(8081, () => console.log('Está rodando na porta 8081'));
