

const adulto = document.querySelector('#adultos')
const crianca = document.querySelector('#criancas')
const botao = document.querySelector('div button')

const lista = document.querySelector('.resultado')


// Por adulto:
// 300g de carne
// 100g de coração
// 0,5L de cerveja
// 1L de refrigerante
// Por criança:

// 150g de carne
// 50g de coracao
// 0,5L de refrigerante


botao.addEventListener("click", ()=> {

  let ad = adulto.valueAsNumber
  let cr = crianca.valueAsNumber
  
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
  montaLista += `<li> ${ad} cervejas de ${churrascoAdulto.cerveja}ml </li>`
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