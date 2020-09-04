
const ul = document.querySelector('.formulario ul')

let dados = localStorage.getItem('dados')
let dadosObjeto = JSON.parse(dados)

if (dadosObjeto) {
    for (let dado in dadosObjeto) {
        ul.innerHTML += `<li> ${dadosObjeto[dado]} </li>`
    }
}

