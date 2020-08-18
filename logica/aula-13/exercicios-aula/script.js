
const entrada = document.querySelector('div input')
const button = document.querySelector('div button')

button.addEventListener("click", () => {
    let value = entrada.value
    questao4(value)
})

const questao2 = (entrada) => {
    if(entrada.indexOf("desenvolvimento") !== -1){
        alert('Sim')
    } else {
        alert('Não')
    }
}

const questao3 = (entrada) => {
    let texto = entrada.toLowerCase().trim()
   
        alert(texto)
}


const questao4 = (entrada) => {
    let texto = entrada.replace(/\./g, "").replace(/\-/g, "").trim()
    alert(texto)
}