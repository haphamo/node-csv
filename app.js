const fs        = require('fs')
const csv       = require('csv-parser')

const filepath  = './grades.csv'

const json = {}
// createReadStream() method
// fs.createReadStream(filepath)
//     // checks for errors with the given filepath before we start trying to pipe in its data.
//     .on('error', () => {
//         // handle error
//     })
//     // begins to pipe data into our ReadStream
//     .pipe(csv())
//     // the keys are stored as strings, bracket notation must be used to acces the values
//     // if the keys don't have special chars or spaces, dot notation can be used
//     .on('data', (data) => {
//         // console.log(`${data['Last name']}`);
//         console.log(data)
//     })
//     //  listens for the end of the CSV. You can use this event to call methods you need after the entire file is read.
//     .on('end', () => {
//         // handle end of CSV
//     })

// without using library
fs.readFile(filepath, 'utf8', function (err, data) {
  let dataArray = data.split(/\r?\n/);
  console.log(dataArray);
});