const local = document.querySelector('h2 span')
const total = document.querySelector('.total')
const ul = document.querySelector('ul')

const fetchJson = (url) => {
    return fetch(url).then((resposta) => resposta.json())
}

fetchJson("https://extreme-ip-lookup.com/json/")
    .then(({ city, region }) => {

        let buscarNoIndex = indexEstado(region)
        let siglaEstado = siglaEstadoBuscaPorIndex(buscarNoIndex)
        let cidade = obterCidadeComAcento(buscarNoIndex, city)

        local.innerText = `${cidade}, ${siglaEstado}`
        

        fetchJson(`https://brasil.io/api/dataset/covid19/caso/data/?format=json&city=${cidade}&state=${siglaEstado}`)
            .then(({results})=>{

                total.innerText = results[0].confirmed

                for(const result of results) {
                    const li = document.createElement('li')

                    const data = result.date.split('-').reverse().join("/")

                    const elementoData = document.createElement("div");
                    elementoData.classList.add("dia")
                    elementoData.innerText = data
                    
                    const elementoHr = document.createElement("hr");

                    const elementoCasos = document.createElement("div")
                    elementoCasos.classList.add("casos")
                    elementoCasos.innerText = result.confirmed
                    
                    li.append(elementoData)
                    li.append(elementoHr)
                    li.append(elementoCasos)
                    
                    ul.append(li)

                }
                
            })

    })