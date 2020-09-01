
const arrayNumeros = [-5, -6, -10, 5, 20, 8, -1, 1, 65, 35, 25, 10, 12, 11]
const arrayLista = ["arroz", "feijão", "abacate", "melancia", "maçã", "banana"]

/// 

arrayNumeros.forEach( item => console.log(item) )

/// 

const quintuplo  = arrayNumeros.map(item => item*5 )

console.log(quintuplo)

///

const palavraEmMaiusculo = arrayLista.map(item =>  item.toUpperCase())

console.log(palavraEmMaiusculo)

///

const numerosPositivos = arrayNumeros.filter((item)=> item > 0)

console.log(numerosPositivos)

///

const numerosPares = arrayNumeros.filter(item => item % 2 === 0)

console.log(numerosPares)

///

const letraA = arrayLista.filter(item => item.charAt(0) === 'a' || item.charAt(0) === 'A' )

console.log(letraA)

// Questões para casa

const numeros = [2,4,5,8,10,25,12]
const palavras = ["história", "ciência", "biologia", "física", "matemática"]

/// 
const soma = numeros.reduce((acc, item) => { return acc + item }, 0)

console.log(soma)

/// 
const palavaraSeparadaPorVirgula = palavras.reduce((acc, item) => { return acc +', '+ item })

console.log(palavaraSeparadaPorVirgula)

///

const maiorValor = numeros.reduce((acc, item) => { 
    let maior = acc
    if(maior < item) {
        maior = item
    } 
    return maior
})

console.log(maiorValor)

///

const maiorPalavra = palavras.reduce((acc, item) => {
    let maior = acc.length
    let palavra = acc
    if(maior < item.length) {
        palavra = item
    }
    return palavra
})

console.log(maiorPalavra)

