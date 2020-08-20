const fs = require('fs');
const csvParser = require('csv-parser');
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// recebe a entrada do arquivo CSV
const stream = fs.createReadStream("casas_saida.csv")

let header = "CREATE TABLE mytable "
let sql = "INSERT INTO mytable "
let dataHeader = ""
let dataBody = []
let dataItens = ""
let propsObject = []


stream.pipe(csvParser()).on("data", async (data) => {

      if (dataHeader.length === 0) {
            for (prop in data) {
                  if (prop === "id") {
                        dataHeader += "( id INTEGER  NOT NULL" //  PRIMARY KEY
                  } else if (isNaN(data[prop]) && (data[prop] !== 'true' && data[prop] !== 'false')) {
                        dataHeader += ", " + prop + " VARCHAR(30) NOT NULL"
                  } else if (isNaN(data[prop]) && (data[prop] === 'true' || data[prop] === 'false')) {
                        dataHeader += ", " + prop + " BOOLEAN NOT NULL"
                  } else if (isNaN(data[prop]) === false) {
                        dataHeader += ", " + prop + " INTEGER NOT NULL"
                  } 
                  propsObject.push(prop)
            }
            dataHeader += " ); "
          
      }   


      // dataItens += "("
      for (let i = 0; i < propsObject.length; i++) {
            if (i === propsObject.length - 1) {
                  dataItens += await data[propsObject[i]]
            } else {
                  dataItens += await data[propsObject[i]] + ","
            }
      }

      dataBody.push([dataItens])

});

stream.on('end', () => {
      header += dataHeader
      sql = " VALUES "
      sql += JSON.stringify(dataBody)

      sql = header + sql

      sql = sql.replace(/\[/g, '(').replace(/\]/g, ')').replace(/[`"]/g, '')

      fs.writeFile("sql.txt", sql, (err) => {
            if (err) {
                  console.log(err)
            }
      })

});

