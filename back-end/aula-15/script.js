const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


const products = {
  []
}








const perguntarAlgo = () => {
    rl.question('O que é algo? ', (resposta) => {
        console.log(resposta)
    })
    
}

rl.question('Qual seu nome? ', (resposta) => {
  perguntarAlgo();
});