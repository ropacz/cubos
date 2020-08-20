const array = ['cubos', 'academy', 'dev']
const colors = ['azul', 'preto', 'vermelho']
const paises = ['Brasil', 'Espanha', 'Argentina', 'Mexico']
const numbers = [5, 2, 3, 0, 11, 7]
const phone = "+557199932-1232"

const includesElement = (array) => {
    return array.includes("academy")
}

const indexOfElement = (array) => {
    return array.indexOf("academy")
}

const filterList = (array) => {
    for(let i = array.length - 1; i >= 0; i--){ 
        if(array[i].length > 5){
            array.splice(i, 1)
        }
    }

    return array
}

    const textTransform = (array) => {

        let newText = array.join(", ")
        let index = newText.lastIndexOf(",");
        newText = newText.substring(0,index)
        newText += ` ou ${array[array.length-1]}`

        return newText 

    }

const orderArray = (array) => {
    return array.sort(function(a, b){return a - b})
}


const orderArrayReverse = (array) => {
    return array.sort(function(a, b){return a - b}).reverse()
}

const formatPhone =  (number) => {
    return number.replace(/[^0-9]+/g, "").substr(-9, number.length)

}


const email = (email) => {
    let emailVerify = email.trim()
    
    if(emailVerify.length < 3) return false

    let indexAt = emailVerify.indexOf("@")

    if(indexAt === -1) return false

    let clippingEmail = emailVerify.substr(indexAt, emailVerify.length)

    let indexDot = clippingEmail.indexOf(".")

    if(indexDot == -1) return false

    clippingEmail = clippingEmail.substr(indexDot, clippingEmail.length)

    console.log(clippingEmail.length)

    if(clippingEmail.length < 3) return false

    return true
   
}

console.log(email("teste@gmail.i"))