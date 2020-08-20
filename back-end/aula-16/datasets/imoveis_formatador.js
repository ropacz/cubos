const fs = require('fs');
const csvParser = require('csv-parser');
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// recebe a entrada do arquivo CSV
const stream = fs.createReadStream("houses.csv")
const housesData = []


stream.pipe(csvParser()).on("data", (data) => {
      housesData.push({
            id: housesData.length + 1,
            city: data['city'],
            area: Number(data['area'].replace("", 0)),
            rooms: Number(data['rooms'].replace("", 0)),
            bathroom: Number(data['bathroom'].replace("", 0)),
            parking_spaces: Number(data['parking spaces'].replace("", 0)),
            floor: !!data['floor'],
            animal: !!data['animal'],
            furniture: !!data['furniture'],
            hoa: Number(data['hoa'].replace(',', '.')) * 100,
            rent_amount: Number(data['rent amount'].replace(',', '.')) * 100,
            property_tax: Number(data['property tax'].replace(',', '.')) * 100,
            fire_insurance: Number(data['fire insurance'].replace(',', '.')) * 100,
            total: Number(data['total'].replace(',', '.')) * 100,
      }
      )
});

stream.on('end', () => {
      const csvWriter = createCsvWriter({
            path: 'casas_saida.csv',
            header: [
                  { id: 'id', title: 'id' },
                  { id: 'city', title: 'cidade' },
                  { id: 'area', title: 'area' },
                  { id: 'rooms', title: 'quartos' },
                  { id: 'bathroom', title: 'banheiros' },
                  { id: 'parking_spaces', title: 'estacionamento' },
                  { id: 'floor', title: 'andares' },
                  { id: 'animal', title: 'animais' },
                  { id: 'furniture', title: 'moveis' },
                  { id: 'hoa', title: 'condominio' },
                  { id: 'rent_amount', title: 'aluguel' },
                  { id: 'property_tax', title: 'imposto' },
                  { id: 'fire_insurance', title: 'seguro_incendio' },
                  { id: 'total', title: 'total' },
            ]
      });

      csvWriter.writeRecords(housesData)
});



