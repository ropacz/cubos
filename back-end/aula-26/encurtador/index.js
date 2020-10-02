const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const server = new Koa()
const router = require('./src/routes')

server.use(bodyparser())

server.use(router.routes())


/**
 * Ctx
 *  -> Requisição
 *  -> Resposta
 */
// server.use((ctx) => {
//     response(ctx, 404, 'Conteúdo não encontrado!')
// });

server.listen(8081, () => console.log("Está rodando na porta 8081"))
