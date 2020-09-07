const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const correntista = require('./banco/index')
const server = new Koa()

server.use(bodyparser())

function estaVazio(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false
    }
    return true
}

server.use((ctx) => {

    const parametros = (ctx.url).split("/").filter(item => item)
    console.log(parametros)

    const cpf = (parametros[1] && !isNaN(parametros[1])) ? parametros[1] : null
    const metodo = ctx.method

    if (parametros.includes('correntistas')) {

        if (metodo === 'GET' && cpf === null) {
            ctx.body = correntista.obterCorrentistas()

        } else if (metodo === 'GET' && cpf) {

            const obterCorrentista = correntista.obterCorrentista(cpf)

            if (obterCorrentista !== null) {
                ctx.body = obterCorrentista
            } else {
                ctx.body = {
                    "mensagem": "Correntista não encontrado!"
                }
            }

        } else if (metodo === 'POST') {
            const body = ctx.request.body

            if (!estaVazio(body)) {
                const novoCorrentista = correntista.criarCorrentista(body)
                if (novoCorrentista === null) {
                    ctx.body = {
                        "mensagem": "Erro ao cadastrar correntista"
                    }
                } else {
                    ctx.body = novoCorrentista
                }
            }
        } else if (metodo === 'PUT' && cpf) {
            const body = ctx.request.body
            const correntistaExiste = correntista.obterCorrentista(cpf)
            let atualizado = true

            console.log(estaVazio(body))

            if (!estaVazio(body) && correntistaExiste) {
                for (var propriedade in body) {
                    atualizado = correntista.atualizarCorrentista(cpf, propriedade, body[propriedade])

                    if (!atualizado) {
                        break
                    }
                }
                if (atualizado) {
                    ctx.body = {
                        "mensagem": "Correntista atualizado com sucesso!"
                    }
                } else {
                    ctx.body = {
                        "mensagem": "As propriedades saldo, codigoDoBanco, agencia e conta não podem ser atualizadas."
                    }
                }

            } else if (!correntistaExiste) {
                ctx.body = {
                    "mensagem": "Corretista não existe!"
                }
            } else {
                ctx.body = {
                    "mensagem": "Erro ao atualizar correntista!"
                }
            }

        } else if (metodo === 'DELETE') {
            const removerCorrentista = correntista.removerCorrentista(cpf)

            if (removerCorrentista) {
                ctx.body = {
                    "mensagem": "Correntista removido com sucesso!"
                }
            } else {
                ctx.body = {
                    "mensagem": "Correntista não encontrado!"
                }   
            }
        }

    } else {
        ctx.status = 404
        ctx.body = {
            "mensagem": "Página não encontrada!"
        }
    }

})


server.listen(8081, () => console.log('Rodando na porta 8081'))