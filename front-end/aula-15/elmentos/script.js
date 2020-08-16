
const element = document.querySelector('input')
const all = document.querySelectorAll('*')
const button = document.querySelector('button')


button.addEventListener("click", () => {

    let value = element.value
    let selectElement = document.querySelectorAll(value)

    for(let i = 0; i < all.length; i++){
        all[i].style.border = ""
    }

    for(let i = 0; i < selectElement.length; i++){
        selectElement[i].style.border = "1px solid red"
    }
    
    
   


})