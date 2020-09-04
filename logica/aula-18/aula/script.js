const nome = document.querySelector('#nome')
const idade = document.querySelector('#idade')
const cpf = document.querySelector('#cpf')
const email = document.querySelector('#email')
const telefone = document.querySelector('#telefone')
const salvar = document.querySelector('button')

salvar.addEventListener("click", () => {
    localStorage.clear()
    
    const dados = {
        nome: nome.value,
        idade: idade.value,
        cpf: cpf.value,
        email: email.value,
        telefone: telefone.value
    }

    const dadosString = JSON.stringify(dados)

    localStorage.setItem('dados', dadosString)

    location.href = 'pessoa.html'

})