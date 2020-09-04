function promessa(tempo) {
    return new Promise((resolve) => {

        setTimeout(()=> {
            resolve()
        }, tempo * 1000)

    })
    .then((resposta) => {
        console.log(resposta)
    })

}

promessa(5)