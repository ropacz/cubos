const helpers = require('./helpers')

let accountHolders = [{
    name: "Rodrigo Paczkovski",
    cpf: "10203040400",
    bankCode: "104",
    agency: "12345",
    accountNumber: "1234563",
    balance: 1000,
    movement: []
},
{
    name: "Gerson da Silva",
    cpf: "57580400124",
    bankCode: "237",
    agency: "54321",
    accountNumber: "543219",
    balance: 600,
    movement: []
},
{
    name: "Fernanda Gomes",
    cpf: "68953789124",
    bankCode: "356",
    agency: "95162",
    accountNumber: "654325",
    balance: 2000,
    movement: []
}
]


const getAccountHolder = (cpf) => {

    if (!helpers.verifyCPF(cpf)) return "Formato de CPF inválido"

    let formartNumberInCPF = helpers.formartNumber(cpf)

    for (let i = 0; i < accountHolders.length; i++) {
        if (accountHolders[i].cpf == formartNumberInCPF) {

            let move = accountHolders[i].movement.map((item) => { return item }) 

            return {
                name: accountHolders[i].name,
                cpf: accountHolders[i].cpf,
                bankCode: accountHolders[i].bankCode,
                agency: accountHolders[i].agency,
                accountNumber: accountHolders[i].accountNumber,
                balance: accountHolders[i].balance,
                movement: move
            }
        }
    }

    return "Não existe usuário cadastrado"
}

const createAccount = (accountHolder) => {

    if (typeof accountHolder === undefined || accountHolder === null) return "Corretista vázio"

    if (!helpers.verifyCPF(accountHolder.cpf)) return "Formato de CPF inválido"

    let accountHolderVerifyExist = getAccountHolder(accountHolder.cpf)
    accountHolderVerifyExist = (typeof accountHolderVerifyExist === "object") ? accountHolderVerifyExist : null

    if (accountHolderVerifyExist !== null) {
        return "Usuário com o mesmo CPF já foi cadastrado"
    } else {

        accountHolders.push({
            name: accountHolder.name,
            cpf: accountHolder.cpf,
            bankCode: accountHolder.bankCode,
            agency: accountHolder.agency,
            accountNumber: accountHolder.accountNumber,
            balance: accountHolder.balance
        })

        return "Cadastrado realizado com sucesso!"
    }


}

const updateAccount = (cpf, property, value) => {

    let propertyInString = String(property)
    let valueinString = String(value)
    let cpfInString = String(cpf)

    if (cpfInString === null || propertyInString === null || value === null) return "Dados vázios"

    if (!helpers.verifyCPF(cpfInString)) return "Formato de CPF inválido"

    if (propertyInString === "balance") return "Não é permitido atualizar a propriedade::balance"

    let flag = true

    for (let i = 0; i < accountHolders.length; i++) {
        if (accountHolders[i].cpf === cpfInString) {
            for (let prop in accountHolders[i]) {
                if (propertyInString === prop) {
                    accountHolders[i][prop] = valueinString
                    flag = false
                }
            }
        }
    }

    if (flag) {
        return "Erro ao atualizar usuário!"
    }

    return "Cadastro atualizado com sucesso!"
}


const deleteAccount = (cpf) => {
    let cpfInString = String(cpf)

    if (cpfInString === null) return "Dados vázios"

    if (!helpers.verifyCPF(cpfInString)) return "Formato de CPF inválido"

    let flag = true

    for (let i = 0; i < accountHolders.length; i++) {
        if (accountHolders[i].cpf === cpfInString) {
            accountHolders.splice(i, 1)
            flag = false
        }
    }

    if (flag) {
        return "Erro ao remover o usuário!"
    }

    return "Usuário removido com sucesso!"
}


const transferMoneyBetweenBanks = (cpf_send, cpf_receiver, value) => {
    let cpfSendInString = String(cpf)
    let cpfReceiverInString = String(cpf)
    let valueInNumber = Number(balance)

    for(let accountSend of accountHolders) {

        if(accountSend.cpf === cpfSendInString && valueInNumber > accountSend.balance){
            return "Saldo insuficiente!"
        } else if (accountSend.cpf === cpfSendInString) {

            for(let accountReceiver of accountHolders){
                    
            }
           
        }
    }

}

const updateBalance = (cpf, balance) => {
    let cpfInString = String(cpf)
    let balanceInNumber = Number(balance)

    if (cpfInString === null || balanceInNumber === null ) return "Dados vázios"
    if (!helpers.verifyCPF(cpfInString)) return "Formato de CPF inválido"

    let flag = true

    for(let i = 0; i < accountHolders.length; i++) {
        const account = accountHolders[i]
        if (account.cpf === cpfInString) {
            if (balanceInNumber > 0) {
                account.balance += balanceInNumber

                account.movement.push([{
                    type: 'input',
                    date: Date.now(),
                    value: balanceInNumber
                }])

                flag = false
            } else if (account.balance >= Math.abs(balanceInNumber)) {
                account.balance += balanceInNumber

                account.movement.push([{
                    type: 'output',
                    date: Date.now(),
                    value: balanceInNumber
                }])

                flag = false
            } else {
                return "Saldo insuficiente!"
            }
        }
    }

    if (flag) return "Erro ao tentar adicionar dinheiro ao usuário!"

    return "Dinheiro transferido com sucesso!"
}



const newAccount = {
    name: "Roberto",
    cpf: "22030404004",
    bankCode: "356",
    agency: "95162",
    accountNumber: "654325",
    balance: 5000,
}

// console.log(createAccount(newAccount))

// console.log(updateAccount("57580400124", "name", "Rafael"))
console.log(getAccountHolder('57580400124'))

console.log(updateBalance('57580400124', 500))

console.log(getAccountHolder('57580400124'))
console.log(getAccountHolder('57580400124').movement[0])


