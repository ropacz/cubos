const text = document.querySelector('.container p')
const button = document.querySelector('button')
// const buttonStop = document.querySelector('.stop')
const count = document.querySelector('.count')
const rocket = document.querySelector('.rocket')

// let paused = false
let number = 10

button.addEventListener('click', () => {
      
    let numberClick = number

        if(button.classList.contains("start")) {
            rocket.style.animation = "none"
            rocket.style.display = "block"

            count.classList.remove("hide")
            text.innerText = "Lançamento iniciado!"
            button.innerText = "Abortar Missão"
            button.classList.remove("start")
            button.classList.add("stop")

            timer(true, numberClick)

        } else {
            text.innerText = "Lançamento Interrompido!"
            button.innerText = "Reiniciar contagem"
            button.classList.remove("stop")
            button.classList.add("start")
            timer(false, numberClick)
        }

})

function timer(start, numberClick) {
    if (start) {
      startInterval = setInterval(function() {
        count.innerText = numberClick
        boostRocket(numberClick)
        if(numberClick === 0) {
            clearInterval(startInterval)
            text.innerText = "Foguete lançado!"
            button.innerText = "Novo lançamento"
            button.classList.remove("stop")
            button.classList.add("start")
        }
        numberClick--
      }, 1000);
    } else {
      clearInterval(startInterval);
      console.log("stop")
    }
}

const boostRocket = (number) => {
    if (number === 0) {
        rocket.style["animation"] = "fly 5s .5s ease-in"
        setTimeout(()=>{
            rocket.style.display = "none"
        }, 5480)
        
    }
}
