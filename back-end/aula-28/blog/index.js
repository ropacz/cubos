const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const router = require('./src/routes');
const {
	conferirMetodos,
	conteudoNaoExiste,
} = require('./src/utils/validacoes');

require('dotenv').config();

const server = new Koa();

server.use(bodyparser());

/**
 * Caso seja enviado um metódo não implementado o usuário é avisado.
 */
server.use((ctx, next) => {
	conferirMetodos(ctx, next);
});

/**
 * Caso o conteúdo não seja encontrado retorna uma mensagem de erro.
 */
server.use((ctx, next) => {
	conteudoNaoExiste(ctx);
	next();
});

server.use(router.routes());

server.listen(process.env.PORT || 8081, () =>
	console.log('Servidor rodando...')
);
