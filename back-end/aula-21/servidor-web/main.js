const Koa = require('koa')
const server = new Koa()

server.use(async (ctx) => {

    let url = (ctx.originalUrl.length === 1)? ["/"] : ctx.originalUrl.split("/").filter(item => item)

    const primeiroParametro = url[0]
    const segundoParametro = url[1]
    const terceiroParametro = url[2]

    console.log(url)
    if(primeiroParametro === '/'){
        ctx.body = "Pagina inicial"
    } else if(primeiroParametro === 'cara_ou_coroa') {
        const sortearNumero = Math.floor(Math.random() * 2)

        if(sortearNumero === 1) {
            ctx.body = "O resultado deu cara!"
        } else {
            ctx.body = "O resultado deu coroa!" 
        }

    } else if (primeiroParametro === 'raiz_quadrada') {

        if(isNaN(segundoParametro) === true) {
            ctx.body = "Você precisa passar um número na requisição!"
        } else {
            const numero = Number(segundoParametro)
            const raiz = Math.sqrt(numero)
            
            ctx.body = `A raiz quadrada de ${numero} é  ${raiz}!`
        }
    } else if (primeiroParametro === 'divisao') {
        if(isNaN(segundoParametro) || isNaN(terceiroParametro)) {
            ctx.body = "Você precisa passar dois números na requisição!"
        } else {

            const dividendo = Number(segundoParametro)
            const divisor = Number(terceiroParametro)
            const resultado = dividendo/divisor
            
            ctx.body = `A divisão de ${dividendo} por ${divisor} é ${resultado}`
        }
    }

})

server.listen(8081, () => {
    console.log('Sevidor está rodando em 127.0.0.1:8081')
})