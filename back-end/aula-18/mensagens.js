const fs = require('fs')

let mensagens = []
let enderecos = []

// leitura das mensagens de forma assincrona
fs.readFile('cartas.txt', (err, data) => {
    if (err) {
        return console.log(err);
    }
    mensagens = data.toString().split('---')

    // quando termina de carregar as mensagens são chamas as próximas funções
    carregaEnderecos()
    formatarTexto()
})

// leitura dos endereços de forma sincrona
const carregaEnderecos = () => {
    enderecos = fs.readFileSync('enderecos.txt').toString().split('---')
}

// fução para formatar o texto
const formatarTexto = () => {
    let msg = []
    let end = []
    let msgFormatada = ''

    // percorrer todas as mensagens
    for (let i = 0; i < mensagens.length; i++) {
        msg = mensagens[i].trim().split('\n')

        // inicio da mensagem
        msgFormatada += "[INICIO DA MENSAGEM] \n"
        msgFormatada += `Remetente: ${msg[0]} \n`
        msgFormatada += `Destinatário: ${msg[1]} \n`

        // percorrer todos os endereços
        for(let j = 0; j < enderecos.length; j++){
            end[j] = enderecos[j].trim().split('\n')
            
            // caso haja um nome igual ao destinatário adiciona o endereço na mensagem
            if(msg[1] === end[j][0]) {
                msgFormatada += `Endereço: ${end[j][1]} \n`
            }
        }
        
        // mensagem e texto final
        msgFormatada += `Mensagem: ${msg[2]} \n`
        msgFormatada += "[FIM DA MENSAGEM] \n"

    }
    
    // criar um arquivo de texto com as mensagens
    fs.writeFile("mensagens.txt", msgFormatada, (erro) => {
        if (erro) {
            throw erro;
        }
        console.log("Arquivo salvo");
    });

}


