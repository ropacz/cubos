const helper = require("./helper");
const fs = require("fs");

const correntistas = [{
    cpf: "22030404004",
    nome: "Roberto Silva",
    codigoDoBanco: "356",
    agencia: "95162",
    conta: "654325",
    saldo: 5000
}];
const movimentacoes = [];


const adicionarMovimentacao = (cpf, tipo, valor, data) => {
    // adiciona um novo dado de movimentação ao array
    movimentacoes.unshift({ cpf, tipo, valor, data })
    console.log(`Movimentação adicionada com sucesso.`)
}


const obterCorrentistas = () => {
    // retorna o array de corretistas
    return correntistas
}


const obterCorrentista = (cpf) => {
    let encontrado = false

    for (let i = 0; i < correntistas.length; i++) {
        if (correntistas[i].cpf === helper.limpaTexto(cpf)) {
            encontrado = true
            // retona as informações do corretista
            return { index: i, dados: correntistas[i] }
        }
    }
    
    // Caso não seja encontrado nada retorna null
    if (encontrado === false) {
        console.log("Não existe CPF cadastrado.")
        return null
    }
}


const verificadados = (correntista) => {
    if (
        !correntista.nome ||
        !correntista.cpf ||
        !correntista.codigoDoBanco ||
        !correntista.agencia ||
        !correntista.conta
    ) {
        console.log("Erro: informações incompletas")
        return false
    }

    return true
}


const criarCorrentista = (correntista) => {
    console.log(`Informações do corretisata ${correntista}`)

    // Verifica se todos os dados do corretista foram preenchidos
    if (!verificadados(correntista)) return null


    const correntistaCriado = obterCorrentista(
        helper.limpaTexto(correntista.cpf)
    )

    // Verifica se o corretista já existe
    if (correntistaCriado) {
        console.log("Erro: cpf já cadastrado!")
        return null
    }

    // Cadastra os dados do novo corretista
    const novoCorrentista = {
        cpf: helper.limpaTexto(correntista.cpf),
        nome: correntista.nome,
        codigoDoBanco: correntista.codigoDoBanco,
        conta: helper.limpaTexto(correntista.conta),
        agencia: helper.limpaTexto(correntista.agencia),
        saldo: 0,
    }

    correntistas.push(novoCorrentista)
    console.log("Corretista salvo com successo!")


    return novoCorrentista
}


const obterExtrato = (cpf) => {

    // Verficia se existe um corretista com o CPF passado como parametro
    const correntista = obterCorrentista(helper.limpaTexto(cpf))

    // Cria um array vazio para inserir as informações
    correntistaMovimentacoes = []

    // Adiciona uma nova movimentação ao array 'movimentacoes'
    if (correntista) {
        for (let i = 0; i < movimentacoes.length; i++) {
            if (movimentacoes[i].cpf === correntista.dados.cpf) {
                correntistaMovimentacoes.push(movimentacoes[i])
            }
        }

        return correntistaMovimentacoes
    }

    return null
}


const removerCorrentista = (cpf) => {
    const correntista = obterCorrentista(helper.limpaTexto(cpf))

    if (correntista) {
        
        correntistas.splice(correntista.dados.index, 1)
        
        console.log("Corretista removido com sucesso!")

        return true
    } else {
        return false
    }
}


const atualizarCorrentista = (cpf, propriedade, valor) => {
    const correntista = obterCorrentista(helper.limpaTexto(cpf))
    const novoValor = helper.limpaTexto(valor)
    if (correntista) {
       
        if (
            propriedade === "saldo" ||
            propriedade === "codigoDoBanco" ||
            propriedade === "agencia" ||
            propriedade === "conta"
        ) {
            return false
        }

        let correntistaAtualizado;
        if (propriedade === "nome") {
            correntistaAtualizado = {
                nome: valor,
                cpf: correntista.dados.cpf,
                codigoDoBanco: correntista.dados.codigoDoBanco,
                agencia: correntista.dados.agencia,
                conta: correntista.dados.conta,
                saldo: correntista.dados.saldo,
            }
        } else if (propriedade === "cpf") {
            correntistaAtualizado = {
                nome: correntista.dados.nome,
                cpf: novoValor,
                codigoDoBanco: correntista.dados.codigoDoBanco,
                agencia: correntista.dados.agencia,
                conta: correntista.dados.conta,
                saldo: correntista.dados.saldo,
            }
        }
        console.log("Atualizado!")
        correntistas.splice(
            correntista.dados.index,
            1,
            correntistaAtualizado
        );
        return true
    } else {
        return false
    }
}

const depositar = (cpf, valor) => {
    const correntista = obterCorrentista(helper.limpaTexto(cpf))

    if (valor < 0) {
        adicionarMovimentacao(
            correntista.cpf,
            "erro - entrada - valor negativo",
            valor,
            "26/08/2020"
        );
        console.log("Erro: valor a ser depositado não pode ser negativo!")
        return false
    }

    if (correntista) {
        const correntistaAtualizado = {
            nome: correntista.dados.nome,
            cpf: correntista.dados.cpf,
            codigoDoBanco: correntista.dados.codigoDoBanco,
            agencia: correntista.dados.agencia,
            conta: correntista.dados.conta,
            saldo: correntista.dados.saldo + valor,
        };

        correntistas.splice(correntista.index, 1, correntistaAtualizado);
        console.log("Depositado!");
        adicionarMovimentacao(
            correntista.dados.cpf,
            "entrada",
            valor,
            "06/09/2020"
        );
        return true
    } else {
        return false
    }
}


const sacar = (cpf, valor) => {
    const correntista = obterCorrentista(helper.limpaTexto(cpf))

    if (valor < 0) {
        console.log("Erro: não é possível sacar um valor negativo")
        adicionarMovimentacao(
            correntista.cpf,
            "erro - saida - valor negativo",
            valor,
            "06/09/2020"
        );
        return false
    }

    if (correntista.saldo < valor) {
        console.log("Erro: não é possível sacar sem saldo disponível")
        adicionarMovimentacao(
            correntista.cpf,
            "erro - saida - falta de saldo",
            valor,
            "06/09/2020"
        )
        return false
    }

    if (correntista) {
        const correntistaAtualizado = {
            nome: correntista.dados.nome,
            cpf: correntista.dados.cpf,
            codigoDoBanco: correntista.dados.codigoDoBanco,
            agencia: correntista.dados.agencia,
            conta: correntista.dados.conta,
            saldo: correntista.dados.saldo - valor,
        };

        correntistas.splice(correntista.index, 1, correntistaAtualizado);
        console.log("Sacado!");
        adicionarMovimentacao(
            correntista.dados.cpf,
            "saida",
            valor,
            "06/09/2020"
        );
        return true
    } else {
        return false
    }
}


const transferir = (cpfOrigem, cpfDestino, valor, bancosDiferentes) => {
    const origem = obterCorrentista(helper.limpaTexto(cpfOrigem)).dados
    const destino = obterCorrentista(helper.limpaTexto(cpfDestino)).dados

    if (bancosDiferentes === false) {
        if (origem.codigoDoBanco !== destino.codigoDoBanco) {
            console.log("Não é possível fazer transferência para bancos diferentes")
            return false
        }
    }

    const sacado = sacar(cpfOrigem, valor)
    if (sacado) {
        depositar(cpfDestino, valor)
    }
}


const imprimirExtrato = (cpf) => {
    const correntista = obterCorrentista(helper.limpaTexto(cpf))
    const extrato = obterExtrato(helper.limpaTexto(cpf))

    if (correntista && extrato) {
        const nomeDoBanco = helper.obterNomeDoBanco(
            correntista.dados.codigoDoBanco
        );

        const primeiraLinha = `|| ${nomeDoBanco} ||\n`;
        const segundaLinha = `Extrato bancário de ${
            correntista.dados.nome
            }, CPF: ${helper.formatarCPF(correntista.dados.cpf)}\n`;
        const terceiraLinha = `Agência ${helper.formatarAgencia(
            correntista.dados.agencia
        )} - Conta Corrente ${helper.formatarContaCorrente(
            correntista.dados.conta
        )}\n`;
        const quartaLinha = "---------------------------------------------\n";
        const quintaLinha = "|| Movimentações ||\n";
        const sextaLinha = "Tipo | Data da Ocorrência | Valor movimentado\n";
        const setimaLinha = "---------------------------------------------\n";

        let impressao =
            primeiraLinha +
            segundaLinha +
            terceiraLinha +
            quartaLinha +
            quintaLinha +
            sextaLinha +
            setimaLinha;
        
        console.log(extrato)
        for (let i = 0; i < extrato.length; i++) {
            impressao += `${extrato[i].tipo} | ${extrato[i].data} | R$ ${extrato[i].valor},00\n`
        }

        console.log(impressao)
        return impressao
    }
}

const salvarExtrato = (cpf) => {
    const extratoImpresso = imprimirExtrato(helper.limpaTexto(cpf))

    if (extratoImpresso) {
        const caminho = `./extratos/${cpf}_${Math.random()}.txt`
        fs.writeFile(caminho, extratoImpresso, (err) => {
            "Extrato salvo!"
        })
    }
}


// const novaconta = {
//     nome: "Roberto Silva",
//     cpf: "220.304.040-04",
//     codigoDoBanco: "356",
//     agencia: "95162",
//     conta: "654325"
// }

// console.log(criarCorrentista(novaconta))
// console.log(depositar("220.304.040-04", 1000))
// console.log(imprimirExtrato("220.304.040-04"))
// console.log(salvarExtrato("220.304.040-04"))

module.exports = {
    obterCorrentistas: obterCorrentistas,
    obterCorrentista: obterCorrentista,
    removerCorrentista: removerCorrentista,
    criarCorrentista: criarCorrentista,
    atualizarCorrentista: atualizarCorrentista,
};