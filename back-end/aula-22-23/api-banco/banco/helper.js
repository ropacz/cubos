

const obterNomeDoBanco = (codigo) => {

    const bancos = {
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
        745: "Banco Citibank S.A.",
    }

    if (!bancos[codigo] && !isNaN(codigo)) return null

    return bancos[codigo].replace(/S.A.|(antigo)|Holding/gi, "").trim()
}

const limpaTexto = (numeros) => {
    let n = String(numeros)
    return n.replace(/[^0-9]+/g, "")
}

const formatarCPF = (numeros) => {
    if (!isNaN(numeros) && numeros.lentgh === 11) return null

    const cpf =
        `${numeros.substr(0, 3)}.${numeros.substr(3, 3)}.${numeros.substr(6, 3)}-${numeros.substr(9, 2)}`;

    return cpf
}


const formatarAgencia = (numeros) => {
    if (!isNaN(numeros) && numeros.lentgh === 5) return null

    const agencia = `${numeros.substr(0, 4)}-${numeros.substr(4, 1)}`;

    return agencia
}

const formatarContaCorrente = (numeros) => {
    if (!isNaN(numeros) && numeros.lentgh === 7) return null

    const contaCorrente = `${numeros.substr(0, 6)}-${numeros.substr(6, 1)}`;
    return contaCorrente;
}

const formatador = (numeros) => {
    if (!isNaN(numeros)) return null

    if (numeros.length === 11) {
        return formatarCPF(numeros);
    } else if (numeros.length === 5) {
        return formatarAgencia(numeros);
    } else if (numeros.length === 7) {
        return formatarContaCorrente(numeros);
    }
}

module.exports = {
    obterNomeDoBanco,
    limpaTexto,
    formatarCPF,
    formatarAgencia,
    formatarContaCorrente,
    formatador
}