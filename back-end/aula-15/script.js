const chalk = require('chalk')
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//produtos disponíveis: skol, kaiser, itaipava e stella


const products = [
  {
    id: 1,
    name: "Skol",
    amount: 100,
    price: 400
  },
  {
    id: 2,
    name: "Kaiser",
    amount: 50,
    price: 350
  },
  {
    id: 3,
    name: "Itaipava",
    amount: 25,
    price: 300
  },
  {
    id: 3,
    name: "Stella",
    amount: 25,
    price: 600
  }
]

const myWallet = []

const seachProduct = (products, name) => {
  let flag = false
  let index = null
  for(let i = 0; i < products.length; i++){
    const product = products[i]
    if(product.name.toUpperCase() === name.toUpperCase()){
      flag = true
      index = i    
    }
  }

  if(!flag){
    console.log(`Não temos o produto ${chalk.red(name)}`)
  } else {
    console.log(`Yay! Temos seu produto ${chalk.green(name)}!`)
    availabilityProduct(products[index])
  }

  init()
}

const toTransformPriceInReal = (price) => {
  return (price/100).toFixed(2)
}

const addWallet = (newProduct) => {

  let flag = false
  if(myWallet.length > 0){
  
    for(let i = 0; i < myWallet.length; i++){
        if(myWallet[i].id === newProduct.id){
            myWallet[i].amount +=  newProduct.amount
            flag = true
            break
        } 
    }
  }
  if(!flag) {
    myWallet.push(newProduct)
  }
  upadeAmountProducts(newProduct)
  console.log(`${chalk.green("Produto adicionado com sucesso a sacola!")}`)
  init()
}

const listWallet = () => {
  if(myWallet.length > 0){
    console.log(myWallet)
  } else {
    console.log(`Sua sacola está vázia!`)
  }
  init()
}

const upadeAmountProducts = (newProduct) => {
  for(let i = 0; i < products.length; i++){
    if(products[i].id === newProduct.id){
      products[i].amount -=  newProduct.amount
      break
    } 
  }
}

// const payment = () => {
//   rl.question('Deseja fazer o pagamento ou procurar outro produto? Digite: sim ou procurar? ', (answer) => {
//     if(answer === 'sim' || answer === 'Sim') {
//       console.log(`${chalk.yellow("Obrigado! Por favor se dirija ao caixa.")}`)
//       rl.close();
//     } else if (answer === 'procurar' || answer === 'Procurar'){
//       serachProductQuestion()
//     }
//   })
// }

const availabilityProduct = (productInfo) => {
  let limit = productInfo.amount
  let price = productInfo.price

  rl.question(`Quantos produtos deseja comprar? Mínimo 1 e máximo ${limit}: `, (answer) => {
    // if(answer = Number.isInteger(answer)) 
    if(answer <= limit && answer >= 1){
      
      let newProduct = {
          id: productInfo.id,
          name: productInfo.name,
          amount: parseInt(answer),
          price: productInfo.price
        }
     
      console.log(`Existe a quantidade de ${chalk.green(answer)} no estoque e cada unidade custa R$ ${chalk.green(toTransformPriceInReal(price))}`)  
      addWalletQuestion(newProduct)

    } else if (answer > limit) {
      console.log(`A quantidade de ${chalk.red(answer + " é maior que a disponível")}  no estoque`)
    } else {
      console.log(`${chalk.red("Erro! Valor ou comando inválido!")}`)
      rl.close();
    }
  })
}

const serachProductQuestion = () => {
  rl.question('Digite o nome do produto que está procurando: ', (nameProduct) => {
    seachProduct(products, nameProduct)
    })
}

const addWalletQuestion = (newProduct) => {
  rl.question('Deseja adicionar o produto e quantidade a sua sacola? Digite sim ou não: ', (answer) => {
    if(answer === 'sim' || answer === 'Sim'){
      addWallet(newProduct)
    } else if(answer.toUpperCase() === 'NÃO' || answer.toUpperCase() === 'NAO'){
      serachProductQuestion()
    } else {
      init()
    }
  })
}

const init = () => {
    rl.question('O que deseja fazer? Digte: sacola, procurar ou sair? ', (answer) => {
      if(answer === 'procurar' || answer === 'Procurar'){
        serachProductQuestion()
      } else if(answer === 'sair' || answer === 'Sair') {
        rl.close();
      } else if(answer === 'sacola' || answer === 'Sacola') {
        listWallet()
      } else {
        console.log(`${chalk.red("Comando inválido, tente novamete!")} \n`)
        init()
      }
    })
}

init()