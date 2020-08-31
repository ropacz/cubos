// const maioridade = (idade) => {
//     if (idade >= 18) {
//         return true;
//     } else {
//         return false;
//     }
// };

const maioridade = idade => idade >= 18 ? true : false
console.log(maioridade(15))

///

// const imprimirApelido = (nome) => {
//     if (nome === 'Nícolas') {
//         return 'ni-ni-co-co-la-las'; 
//     } else {
//          return 'pablito dos teclados';   
//     }
// }

const imprimirApelido = nome => nome === 'Nícolas' ? 'ni-ni-co-co-la-las' : 'pablito dos teclados'
console.log(imprimirApelido('Pablo'));
/// 

// const concederAcesso = (permitido) => {
//     if (permitido) {
//         console.log('O acesso está permitido!');
//     } else {
//         console.log('O acesso está negado!');
//     }
// }

const concederAcesso = permitido => permitido ? 'O acesso está permitido!' : 'O acesso está negado!'

console.log(concederAcesso(true))

///

const grupo = 'marvel'
const escolherHeroina = (grupo === 'marvel') ? 'Capitã Marvel' : 'Mulher Maravilha'

console.log(escolherHeroina)

////

const calcularIdade01 = (animal, idade) => {
    if (animal === 'gato') {
        if (idade <= 1) {
            return 15;
        } else if (idade > 1 && idade <= 2) {
            return 15 + 10;
        } else {
            return 15 + 10 + ((idade - 2) * 4);
        }
    } else if (animal === 'cachorro') {
        if (idade <= 1) {
            return 15;
        } else {
            return 15 + ((idade - 1) * 7);
        }
    } else {
        return idade;
    }
}

const calcularIdade = (animal, idade) => (animal === 'gato') ? 
((idade > 1 && idade <= 2) ? 15+10 : 15 + 10 + ((idade - 2) * 4)) :
(animal === 'cachorro') ? ((idade <= 1) ? 15 : 15 + ((idade - 1) * 7)) : 
idade


// const calcularIdade03 = (animal, idade) => {

// }

console.log(calcularIdade01('cachorro', 2), calcularIdade('cachorro', 2) )