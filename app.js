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
//         // console.log(data)
//       console.log(data[' "First name"'])
//     })
//     //  listens for the end of the CSV. You can use this event to call methods you need after the entire file is read.
//     .on('end', () => {
//         // handle end of CSV
//     })

// without using library
fs.readFile(filepath, 'utf8', function (err, data) {
  let result = {}

  let dataArray = data.split(/\r?\n/);
  // the first line in the array is the column header(title), while the cleansedArray is the data
  const [columnData, ...cleansedArray] = dataArray

  // get the column headers
  const columnHeaderData = columnData.split(',')
  const columnHeaderArray = columnHeaderData.map(title => {
    let trimmed = title.trim()
    return trimmed.slice(1, trimmed.length-1)
  })

  // array destructuring to get column header(title) 
  const [lastName, firstName, SSN, Test1, Test2, Test3, Test4, final, grade] = columnHeaderArray
  // console.log(cleansedArray) // => one array of each entry(student) as strings
  const c = cleansedArray.map(student => {
    // split returns an array of arrays, where the sub arrays are the entries
    const split = student.split(',')
    // trim and remove double quotes
    const a = split.map(item => {
      const trimmedWhiteSpace = item.trim()

      if(trimmedWhiteSpace.includes("\"") === true) {
        const removeQuotes = trimmedWhiteSpace.slice(1, trimmedWhiteSpace.length -1 )
        return removeQuotes
      }
      return trimmedWhiteSpace
    })
    return a
  })



  const test = {}

  // create a loop to create JSON data

  test[c[0][2]] = {}

  test[c[0][2]][lastName] = c[0][0]
  test[c[0][2]][firstName] = c[0][1]
  test[c[0][2]][SSN] = c[0][2]
  test[c[0][2]][Test1] = c[0][3]
  test[c[0][2]][Test2] = c[0][4]
  test[c[0][2]][Test3] = c[0][5]
  test[c[0][2]][Test4] = c[0][6]
  test[c[0][2]][grade] = c[0][7]

  const stringify = JSON.stringify(test)
  const parse = JSON.parse(stringify)
  console.log(parse)
});