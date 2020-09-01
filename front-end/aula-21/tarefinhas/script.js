
const checkTudoFeito = document.querySelector('.novaTarefa input[name=todas]')
const tarefas = document.querySelector('.tarefas ul')
const campoTarefa = document.querySelector('#campo')
const totalDeItens = document.querySelector('.total span')
const botaoTodasTarefas = document.querySelector('.filtros .todas')

const botoesInfos = document.querySelectorAll('.filtros button')

const botaoAFazer = document.querySelector('.filtros .aFazer')
const botaoFeitas = document.querySelector('.filtros .feitas')
const botaoLimpar = document.querySelector('.limpar button')

let ativo = null

let listaDeTarefas = []

const total = () => {
    totalDeItens.innerText = listaDeTarefas.filter((item) => item.feito === false).length
}


const renderizarTarefas = (filtro = null) => {

    // tarefas.innerHTML = listaDeTarefas.map(({ texto, feito }, index) => {
    //     return `<li class="${feito ? "feito" : ""}">
    //     <input type="checkbox" onclick="marcarComoFeito(${index})" ${feito ? "checked" : ""}>
    //     <span> ${texto} </span> <a href="#" onclick="deletar(${index})">Deletar</a></li>`
    // }).join('')

    ativo = filtro

    let array = listaDeTarefas

    if (filtro === true) {
        array = listaDeTarefas.filter((item) => item.feito === true)
    } else if (filtro === false) {
        array = listaDeTarefas.filter((item) => item.feito === false)
    }

    tarefas.innerHTML = ''

    array.forEach(({ texto, feito }, index) => {

        let li = document.createElement('li')
        

        let checkbox = document.createElement('input')
        checkbox.setAttribute("type", "checkbox")
        checkbox.setAttribute("onclick", `marcarComoFeito(${index})`)
        checkbox.checked = (feito) ? true : false

        let tarefaTexto = document.createElement('span')
        tarefaTexto.classList.toggle("feito", feito)
        tarefaTexto.innerText = texto


        let deletar = document.createElement('a')
        deletar.setAttribute("href", "#")
        deletar.setAttribute("onclick", `deletar(${index})`)
        deletar.innerText = 'Deletar'


        let lista = tarefas.appendChild(li)
        lista.append(checkbox)
        lista.append(tarefaTexto)
        lista.append(deletar)

    })

    total()

}

renderizarTarefas()

campoTarefa.addEventListener("keypress", (event) => {
    let tecla = event.keyCode
    if (tecla === 13) {
        adicionarTarefa(event.target.value)
        console.log(event.target.value)
    }
})

checkTudoFeito.addEventListener('change', (event) => {
    marcarTodasTarefas(event.target.checked)
})

const removerClasseAtivo = () => {
    for(let i = 0; i < botoesInfos.length; i++){
        if(botoesInfos[i].classList.contains('ativo')) {
            botoesInfos[i].classList.remove('ativo')
        }
    }
}


botaoTodasTarefas.addEventListener("click", () => {
    renderizarTarefas()
    removerClasseAtivo()
    botaoTodasTarefas.classList.add('ativo')
})

botaoAFazer.addEventListener("click", () => {
    renderizarTarefas(false)
    removerClasseAtivo()
    botaoAFazer.classList.add('ativo')
})

botaoFeitas.addEventListener("click", () => {
    renderizarTarefas(true)
    removerClasseAtivo()
    botaoFeitas.classList.add('ativo')
})

botaoLimpar.addEventListener("click", () => {
    limparTarefas()
})


const adicionarTarefa = (texto) => {
    listaDeTarefas.push(
        {
            texto: texto,
            feito: false
        }
    )
    campoTarefa.value = ''
    console.log(ativo)
    renderizarTarefas(ativo)
}


const deletar = (pos) => {
    listaDeTarefas.splice(pos, 1)
    renderizarTarefas(ativo)
}

const marcarComoFeito = (pos) => {
    listaDeTarefas[pos].feito = !listaDeTarefas[pos].feito
    renderizarTarefas(ativo)
}

const marcarTodasTarefas = (todas) => {
    for(let tarefa of listaDeTarefas) {
        if(tarefa.feito === false && todas === true){
            tarefa.feito = true
        } else if (todas === false) {
            tarefa.feito = false
        }
    }
    renderizarTarefas()
}

const limparTarefas = () => {
    listaDeTarefas = []
    renderizarTarefas()
}

