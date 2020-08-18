
const entrada = document.querySelector('div input')
const button = document.querySelector('div button')

button.addEventListener("click", () => {
    let value = entrada.value
    questao8(value)
})


const questao5 = (entrada) => {
    let texto = entrada.split(" ")
    let novoTexto = ""

    for(let i = 0; i < texto.length; i++){  
     novoTexto += texto[i].charAt(0).toUpperCase() + texto[i].slice(1, texto[i].length) + " "
    }

    alert(novoTexto.trim())
}

const questao6 = (entrada) => {
    let texto = entrada.split(" ")
    let novoTexto = []
    let textoFinal = ""
    

    for(let i = 1; i < texto.length; i++){
        novoTexto[i-1] = texto[i].trim()
    }
    novoTexto[novoTexto.length] = texto[0].trim()

    textoFinal =  novoTexto.join(" ")

    console.log(textoFinal)
}


const questao7 = (entrada) => {
    let texto = entrada.replace(/muito/g, "MUITO").replace(/Muito/g, "MUITO").trim()

    console.log(texto)
}

const questao8 = (entrada) => {
    //8478 9847 8748 9484
    let ultimoDigito = entrada.slice(entrada.length - 5, entrada.length)
    let texto = ultimoDigito.padStart(entrada.length, "**** ").trim()

    console.log(texto)
}
