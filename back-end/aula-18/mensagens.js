const fs = require('fs')


fs.readFile('cartas.txt', (err, data) => {
    if (err) {
        return console.log(err);
    }

    let mensagens = []
    mensagens = data.toString().split('---')

    // passar mensagens para função
    converterTexto(mensagens)
})

const converterTexto = (mensagens) => {
    let msg = []
    let msgFormatada = ''

    for (let i = 0; i < mensagens.length; i++) {
        msg = mensagens[i].trim().split('\n')

        msgFormatada += "[INICIO DA MENSAGEM] \n"
        msgFormatada += `Remetente: ${msg[0]} \n`
        msgFormatada += `Destinatário: ${msg[1]} \n`
        msgFormatada += `Mensagem: ${msg[2]} \n`

        msgFormatada += "[FIM DA MENSAGEM] \n"

    }
    console.log(msgFormatada)

    fs.writeFile("mensagens.txt", msgFormatada, (erro) => {
        if (erro) {
            throw erro;
        }
        console.log("Arquivo salvo");
    });

}



