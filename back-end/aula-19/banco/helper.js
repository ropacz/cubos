// Bancos e funções relacionadas
const banks = {
    001: "Banco do Brasil S.A.",
    033: "Banco Santander (Brasil) S.A.",
    104: "Caixa Econômica Federal",
    237: "Banco Bradesco S.A.",
    341: "Banco Itaú S.A.",
    356: "Banco Real S.A. (antigo)",
    389: "Banco Mercantil do Brasil S.A.",
    399: "HSBC Bank Brasil S.A.",
    422: "Banco Safra S.A.",
    453: "Banco Rural S.A.",
    633: "Banco Rendimento S.A.",
    652: "Itaú Unibanco Holding S.A.",
    745: "Banco Citibank S.A."
}

const getBank = (cod) => {
    let bank = banks[cod]

    if (bank !== undefined) {
        return bank.replace(/S.A.|(antigo)|Holding/gi, "")
    }

    return bank
}

const formartNumber = (number) => {
    return number.replace(/[^0-9]+/g, "")
}

const verifyCPF = (cpf) => {
    if (cpf.length === 11) return true
    return false
}

const formartCPF = (cpf) => {

    let cpfInNumber = formartNumber(cpf)

    if(!verifyCPF(cpfInNumber)) return "" 

    let twoDigits = cpfInNumber.substr(-2)
    let cpfFormatNumber = ''
    let cuts = 0

    while (cuts < 3) {
        if (cuts === 0) {
            cpfFormatNumber += cpfInNumber.substr(3 * cuts, 3)
        } else {
            cpfFormatNumber += "." + cpfInNumber.substr(3 * cuts, 3)
        }
        cuts++
    }
    cpfFormatNumber += "-" + twoDigits
    
    return cpfFormatNumber
}

const formartNumberAgency = (number) => {
    let numberInString = String(number)
    if (numberInString === null || (numberInString.length !== 5)) return ""

    let lastDigit = numberInString.substr(-1)
    let numberAgency = `${numberInString.substr(0, numberInString.length - 1)}-${lastDigit}`

    return numberAgency
}

const formartNumberAccount = (number) => {
    let numberInString = String(number)
    if (numberInString === null || (numberInString.length !== 7)) return ""

    let lastDigit = numberInString.substr(-1)
    let numberAccount = `${numberInString.substr(0, numberInString.length - 1)}-${lastDigit}`

    return numberAccount
}



// console.log(formartCPF('10203040400'))

module.exports = {
    getBank,
    formartNumber,
    verifyCPF,
    formartCPF,
    formartNumberAgency,
    formartNumberAccount
}