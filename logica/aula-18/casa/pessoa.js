
const ul = document.querySelector('.formulario ul')

let dados = localStorage.getItem('dados')
let dadosObjeto = JSON.parse(dados)

// Ao se abrir esta página devemos ler da memória o usuário salvo. Caso não haja usuário salvo, comunique adequadamente. Caso haja, exiba seus dados de forma adequada, ou seja:

// Formate o nome completo para garantir que cada nome próprio começa com uma letra maiúscula e as restantes minúsculas
// Complemente a idade com a palavra anos depois (ou ano, caso a idade seja 1).
// Formate o CPF com pontos e traços adequadamente (pode assumir que o usuário digitou apenas números anteriormente)
// Formate o telefone adequadamente (pode assumir que o usuário digitou apenas números)

const formatarCPF = (cpf) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4")
}

const fomartarNome = (nomeESobrenome) => {
    let nomeCompleto = nomeESobrenome.toLowerCase().trim().split('')
    for (let i = 0; i < nomeCompleto.length; i++) {
        nomeCompleto[0] = String(nomeCompleto[0]).toUpperCase()
        if (nomeCompleto[i] === " ") {
            nomeCompleto[i + 1] = String(nomeCompleto[i + 1]).toUpperCase()
        }
    }

    return nomeCompleto.join("")
}

const formatarIdade = (idade) => {
    return `${idade} anos`
}

const formartarTelefone = (telefone) => {
    let ddd = telefone.substr(0, 2)
    return `(${ddd}) ${telefone.substr(2, 4)}-${telefone.substr(6)}`
}

const voltar = () => {
    window.history.back()
}

console.log(formartarTelefone('4732048215'))


if (dadosObjeto) {

    let informacoes = ''

    informacoes = `
    <li><b>Nome Completo: </b> ${fomartarNome(dadosObjeto.nome)} </li>
    <li><b>Idade: </b>${formatarIdade(dadosObjeto.idade)} </li>
    <li><b>CPF: </b>${formatarCPF(dadosObjeto.cpf)} </li>
    <li><b>Email: </b>${dadosObjeto.email} </li>
    <li><b>Telefone: </b>${formartarTelefone(dadosObjeto.telefone)} </li>
    `
    ul.innerHTML = informacoes

    // for (let dado in dadosObjeto) {
    //     ul.innerHTML += `<li> ${dadosObjeto[dado]} </li>`
    // }
} else {
    botaoVoltar = `<button onclick="voltar()">Voltar</button>`
    ul.innerHTML = `Todos os dados do formulário anterior precisam estar preenchidos. \n ${botaoVoltar}`
}



