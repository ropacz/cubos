const localizacao = document.querySelector('h2 span')
const semana = document.querySelector('.semana')
const dia = document.querySelector('.dia h3')
const previsao = document.querySelector('.previsao')
const temperatura = document.querySelector('.temperatura')



const urlLocalizacao = 'https://extreme-ip-lookup.com/json/'
const urlPrevisao = (lat, lon) => `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&lang=pt_BR&appid=47b16d41765388e1d2e251b373b570c0`
const urlIcone = (icone) => `http://openweathermap.org/img/wn/${icone}@2x.png`


fetch(urlLocalizacao)
    .then((res) => {
        return res.json()
    })
    .then(({ city: cidade, region: regiao, lat, lon }) => {
        localizacao.innerText = `${cidade}, ${regiao}`

        fetch(urlPrevisao(lat, lon))
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                const dias = res.daily

                let temperaturaMaxima = 0
                let temperaturaMininima = 0
                let diaAtual = ''
                let descricao = ''
                let icone = ''

                for (let i = 0; i < dias.length - 1; i++) {
                    diaAtual = i === 0 ? 'Hoje' : i === 1 ? 'Amanhã' : `Daqui a ${i} dias`
                    temperaturaMininima = dias[i].temp.min
                    temperaturaMaxima = dias[i].temp.max

                    descricao = dias[i].weather[0].description
                    icone = urlIcone(dias[i].weather[0].icon)

                    let lista = `<div class="dia">`
                    lista += `<img src="${icone}" alt="${descricao}" />`
                    lista += `<h3>${diaAtual}</h3>`
                    lista += `<p class="previsao">${descricao}</p>`
                    lista += `<p class="temperatura">${temperaturaMininima} °C - ${temperaturaMaxima} °C</p>`
                    lista += `</div>`

                    semana.innerHTML += lista

                }

        
            })

    })