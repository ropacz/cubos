const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const server = new Koa();

server.use(bodyparser())

/**
 * Incialização do array de urls
 */
let urlsEncurtadas = []

/**
 * Obter todas urls do array
 */
const obterUrlsEncurtadas = (ctx) => {
    ctx.body = {
        status: 'sucesso',
        dados: {
            urlsEncurtadas
        }
    }
}

/**
 * Obtém a url encurtada do array
 */
const obterUrlEncurtada = (urlEncurtada) => {
    const [urls] = urlsEncurtadas

    for (let prop in urls) {
        if (prop === urlEncurtada) {
            return prop
        }
    }

    return null
}
/**
 * Obtém url original 
 */
const obterUrlOriginal = (urlEncurtada) => {
    return urlsEncurtadas.map((item) => item[urlEncurtada]).join("")
}
/**
 * Obtém o index da url encurtada
 */
const obterUrlEncurtadaIndex = (urlEncurtada) => {
    return urlsEncurtadas.findIndex((item) => item[urlEncurtada])
}

/**
 * Rediciona ao acessar url encurtada
 */
const redirecionarUrlEncurtada = (ctx, url) => {
    const resultado = obterUrlOriginal(url)

    if (resultado == null) {
        ctx.status = 400
        ctx.body = mensagem("erro", "Conteúdo mal-formatado")
        return
    } else if (!resultado) {
        ctx.status = 404
        ctx.body = mensagem("erro", "Url não encontrada")
        return
    }

    ctx.redirect(resultado)
}

/**
 * Atualiza a url encurtada
 */
const atualizarUrlOriginal = (ctx, url) => {

    const urlOriginal = ctx.request.body.url
    const indexUrl = obterUrlEncurtadaIndex(url)

    if (urlOriginal == null) {
        ctx.status = 400
        ctx.body = mensagem("erro", "Conteúdo mal-formatado")
        return
    } else if (indexUrl === -1) {
        ctx.status = 404
        ctx.body = mensagem("erro", "Url não encontrada")
        return
    }

    novaUrl = { [url]: urlOriginal }
    urlsEncurtadas.splice(indexUrl, 1, novaUrl)

    ctx.status = 200
    ctx.body = mensagem("sucesso", "Url atualizada com sucesso!")
}

/**
 * Remove a url encurtada do array
 */
const removerUrlEncurtada = (ctx, url) => {
    const indexUrl = obterUrlEncurtadaIndex(url)

    if (url == null) {
        ctx.status = 400
        ctx.body = mensagem("erro", "Conteúdo mal-formatado")
        return
    } else if (indexUrl === -1) {
        ctx.status = 404
        ctx.body = mensagem("erro", "Url não encontrada")
        return
    }

    urlsEncurtadas.splice(indexUrl, 1)

    ctx.status = 200
    ctx.body = mensagem("sucesso", "Url removida com sucesso!")

}

/**
 * Adiciona a url encurtada ao array
 */
const adicionarUrlEncurtada = (ctx) => {
    let url = Math.random().toString(36).substr(2, 9);

    const urlOriginal = ctx.request.body.url

    if (urlOriginal == null) {
        ctx.status = 400
        ctx.body = mensagem("erro", "Conteúdo mal-formatado")
        return
    }

    const urlEncurtada = { [url]: urlOriginal }

    urlsEncurtadas.push(urlEncurtada)

    ctx.status = 200
    ctx.body = {
        status: 'sucesso',
        dados: {
            urlEncurtada
        }
    }

}

/**
 * Trata as mensagens e retorna um objeto com a mensagem de sucesso ou erro
 */
const mensagem = (status = "erro", mensagem = "Página não encontrada") => {
    return {
        "status": `${status}`,
        "dados": {
            "mensagem": `${mensagem}`
        }
    }
}

/**
 * Cria as rotas para o servidor
 */
server.use((ctx) => {
    const parametro = ctx.url.split("/").filter(item => item)
    const url = parametro[1] !== undefined ? parametro[1] : null

    if (parametro.includes('encurtador') && !url) {
        if (ctx.method === 'GET') {
            obterUrlsEncurtadas(ctx)
        } else if (ctx.method === 'POST') {
            adicionarUrlEncurtada(ctx)
        }

    } else if (parametro.includes('encurtador') && url) {

        if (ctx.method === 'GET') {
            redirecionarUrlEncurtada(ctx, url)
        } else if (ctx.method === 'PUT') {
            atualizarUrlOriginal(ctx, url)
        } else if (ctx.method === 'DELETE') {
            removerUrlEncurtada(ctx, url)
        }
    } else {
        ctx.status = 404
        ctx.body = mensagem()
    }

})

/**
 * Incia o servidor
 */
server.listen(8081, () => {
    console.log('Servidor rodando na porta 8081...')
})