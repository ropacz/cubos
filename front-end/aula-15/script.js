

const adulto = document.querySelector('#adultos')
const crianca = document.querySelector('#criancas')
const cervejas = document.querySelector('#cervejas')
const botao = document.querySelector('div button')

const lista = document.querySelector('.resultado')


botao.addEventListener("click", ()=> {

  let ad = adulto.valueAsNumber
  let cr = crianca.valueAsNumber

  let cerveja = cervejas.value

switch(cerveja) {
    case 'garrafa':
        cerveja = "Garrafa de 600ml"
    break
    case 'latao':
        cerveja = "Latão 475ml"
    break
    case 'long-neck':
        cerveja = "Long neck 330ml"
    break
    case 'lata':
        cerveja = "Lata 350ml"
    break
    case 'latinha':
        cerveja = "Latinha 269ml"
    break
}
 
  
  let churrascoAdulto = {  
      carne: 300,
      coracao: 100,
      cerveja: 600,
      refrigerante: 1
  }

  let churrascoCrianca = {  
      carne: 150,
      coracao: 50,
      refrigerante: 0.5
    } 


  let montaLista = ''
  lista.innerHTML = "" 

  churrascoAdulto.carne = churrascoAdulto.carne * ad
  churrascoAdulto.coracao = churrascoAdulto.coracao
  churrascoAdulto.cerveja = churrascoAdulto.cerveja
  churrascoAdulto.refrigerante = churrascoAdulto.refrigerante * ad

  churrascoCrianca.carne = churrascoCrianca.carne * cr
  churrascoCrianca.coracao = churrascoCrianca.coracao * cr
  churrascoCrianca.refrigerante = churrascoCrianca.refrigerante * cr

  montaLista += `<ul>`

  montaLista += `<li>Adultos</li><ul>`
  montaLista += `<li> ${churrascoAdulto.carne}g de carne </li>`
  montaLista += `<li> ${churrascoAdulto.coracao}g de coração </li>`
  montaLista += `<li> ${ad} cervejas de ${cerveja} </li>`
  montaLista += `<li> ${churrascoAdulto.refrigerante}L de refrigerante </li>`
  montaLista += `</ul>`

  montaLista += `<li>Crianças</li><ul>`
  montaLista += `<li> ${churrascoCrianca.carne}g de carne </li>`
  montaLista += `<li> ${churrascoCrianca.coracao}g de coração </li>`
  montaLista += `<li> ${churrascoCrianca.refrigerante}L de refrigerante </li>`
  montaLista += `</ul>`

  montaLista += `</ul>`



  lista.innerHTML = montaLista  


})