const fs = require('fs');
const csvParser = require('csv-parser');
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// recebe a entrada do arquivo CSV
const streamBreweries = fs.createReadStream("breweries.csv")
const streamBeers = fs.createReadStream("beers.csv")


const breweriesData = []
const beersData = []

streamBreweries.pipe(csvParser()).on('data', (data) => {
    breweriesData.push({
        id: Number(data["id"]),
        name: data["name"].replace(/[`']/g, '').trim(),
        city: data["city"].replace(/[`']/g, '').trim(),
        state: data["state"].replace(/[`']/g, '').trim(),
    })
})

streamBreweries.on('end', () => {
    const csvWriter = createCsvWriter({
        path: 'cervejarias_saida.csv',
        header: [
            { id: 'id', title: 'id' },
            { id: 'name', title: 'nome' },
            { id: 'city', title: 'cidade' },
            { id: 'state', title: 'estado' },

        ]
    })

    csvWriter.writeRecords(breweriesData)

})

streamBeers.pipe(csvParser()).on('data', (data) => {
    beersData.push({
        id: Number(data["id"]),
        abv: Number(data["abv"]).toFixed(2),
        ibu: Number(data["ibu"]).toFixed(2),
        national_id: Number(data["national_id"]),
        name: data["name"].replace(/[`']/g, '').trim(),
        style: data["style"].replace(/[`']/g, '').trim(),
        brewery_id: Number(data["brewery_id"]),
        ounces: Number(data["ounces"]).toFixed(2),
    })    
})

streamBeers.on('end', ()=> {
    const csvWriter = createCsvWriter({
        path: 'cervejas_saida.csv',
        header: [
            { id: 'id', title: 'id' },
            { id: 'abv', title: 'abv' },
            { id: 'ibu', title: 'ibu' },
            { id: 'national_id', title: 'nacionalidade_id' },
            { id: 'name', title: 'nome' },
            { id: 'style', title: 'estilo' },
            { id: 'brewery_id', title: 'cervejaria_id' },
            { id: 'ounces', title: 'oncas' },

        ]
    })

    csvWriter.writeRecords(beersData)
})