function promessa() {
    return new Promise((resolve) => {

        setTimeout(()=> {
            resolve()
        }, 1000)

    })
    .then((resposta) => {
        console.log(resposta)
    })

}

promessa()