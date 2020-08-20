
const fs = require('fs')


// leitura de um arquivo
// primeiro local e arquivo que vai ser lido
// err - erro na leitura
// buffer - carreamento dos arquivos via buffer
fs.readFile("texto.txt", (err, buffer) => {
    if(err){
        console.log(err)
        return
    }
    console.log(buffer.toString())
})