let corpo = document.querySelectorAll('.corpo div')
const botoesLetras = document.querySelectorAll('.botoes button')
let letras = document.querySelector('.letras')
const palavras = ["pular", "muro", "celular", "varal"]

function iniciar() {

    let palavra = ''
    palavra = escolherElementoAleatorio(palavras)
    let tetativas = corpo.length
    let acertos = 0
    let erros = 0
    let tamanhoDaPalavra = palavra.replace(/(.)(?=.*\1)/g, "").length
    letras.innerHTML = ""
    console.log(tamanhoDaPalavra, palavra)

    for (let i = 0; i < palavra.length; i++) {
        let span = document.createElement("span")
        span.classList.add("letra")
        letras.append(span)
    }

    for (let i = 0; i < botoesLetras.length; i++) {
        botoesLetras[i].addEventListener("click", () => {

            let botaoLetra = botoesLetras[i].innerText

            if (verificarLetra(palavra, botaoLetra)) {

                if (exibeLetra(palavra, botaoLetra)) {
                    acertos++
                    console.log(acertos)
                }

                if (acertos === tamanhoDaPalavra) {
                    alert("Você ganhou!")

                    setTimeout(() => {
                        window.location.reload(true)
                    }, 2000)

                }

            } else {

                if (erros === tetativas) {
                    alert("Você perdeu! Tente de novo!")
                    window.location.reload(true)
                } else {
                    corpo[erros].classList.remove("hide")
                    bloquarLetra(i)
                }

                erros++
            }

        })
    }

}

const bloquarLetra = (index) => {
    botoesLetras[index].disabled = true
}

const verificarLetra = (palavra, letra) => {
    for (let i = 0; i < palavra.length; i++) {
        if (palavra.charAt(i) === letra) {
            return true
        }
    }
    return false
}

const exibeLetra = (palavra, botaoLetra) => {
    let resposta = false
    let camposSpan = document.querySelectorAll(".letras span")
    for (let i = 0; i < palavra.length; i++) {
        if (camposSpan[i].innerText === "" && palavra[i] === botaoLetra) {
            camposSpan[i].append(palavra[i])
            resposta = true
        }
    }
    return resposta
}


iniciar()

function gerarNumeroInteiroAleatorio(min, max) {
    // número fracionário aleatório maior ou igual a 0 e menor que 1
    const aleatorioDeBase = Math.random();
    // número fracionário aleatório maior ou igual a 0 e menor que (max - min + 1)
    const aleatorioFracionario = Math.random() * (max - min + 1);
    // número inteiro aleatório maior ou igual a 0 e menor ou igual a (max - min)
    // Math.trunc tira a parte fracionária de um número: 0,5 vira 0, 1,25 vira 1, etc
    const aleatorioInteiro = Math.trunc(aleatorioFracionario);
    // número inteiro aleatório maior ou igual a min e menor ou igual a max
    return min + aleatorioInteiro;
}

function escolherElementoAleatorio(array) {
    return array[gerarNumeroInteiroAleatorio(0, array.length - 1)]
}

