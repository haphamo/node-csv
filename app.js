const csv       = require('csv-parser')
const fs        = require('fs')

const filepath  = './grades.csv'


// createReadStream() method
fs.createReadStream(filepath)
    .on('error', () => {
        // handle error
    })

    .pipe(csv())
    .on('data', (data) => {
        console.log(`${data['Last name']}`);
    })

    .on('end', () => {
        // handle end of CSV
    })