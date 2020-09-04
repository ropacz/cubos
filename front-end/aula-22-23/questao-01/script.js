
const frase = document.querySelector('p')
const autor = document.querySelector('span')
const botao = document.querySelector('button')

const obterFrase = () => {
    // busca as informações na API
    fetch('https://programming-quotes-api.herokuapp.com/quotes/random/lang/en')
    .then((resposta) => {
        // pega o resultado e retorna em formato JSON
        return resposta.json()
    })
    .then((resultado) => {
        // o resultado do JSON da API é adicionado a html
        frase.innerText = `${resultado.en}`
        autor.innerText = `${resultado.author}`
    })
}

botao.addEventListener("click", () => {
    obterFrase()
})

obterFrase()

