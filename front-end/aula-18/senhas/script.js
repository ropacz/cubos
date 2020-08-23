const pass = document.querySelector('.btn input')
const button = document.querySelector('.btn button')

const pass2 = document.querySelector('.focus input')

button.addEventListener("click", () => {
    if(pass.getAttribute("type") === "password") { 
        pass.setAttribute("type", "text") 
        button.innerText = "Esconder senha"
    } else {
        pass.setAttribute("type", "password") 
        button.innerText = "Mostrar senha"
    }
    
})

pass2.addEventListener("focus", (event) => {
    let campo = event.target
    if(campo.getAttribute("type") === "password") { 
        pass2.setAttribute("type", "text") 
    } 
})

pass2.addEventListener("blur", (event) => {
    let campo = event.target
    if(campo.getAttribute("type") === "text") { 
        pass2.setAttribute("type", "password") 
    } 
})