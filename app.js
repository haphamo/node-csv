const fs        = require('fs')
const csv       = require('csv-parser')

const filepath  = './grades.csv'

const json = {}

// without using library
fs.readFile(filepath, 'utf8', function (err, data) {
  // set up object literal for JSON data
  const jsonResult = {}
  // An array consisting of each student data as strings
  const dataArray = data.split(/\r?\n/);
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
  // function further splits each student data into an array to handle white space trimming and removing quotes if necessary
  const trimAndRemoveQuotes = function(data) {
    const split = data.split(',')
    const trim = split.map(item => {

      const trimmedWhiteSpace = item.trim()

      if(trimmedWhiteSpace.includes("\"") === true) {
        const removeQuotes = trimmedWhiteSpace.slice(1, trimmedWhiteSpace.length -1 )
        return removeQuotes
      }
      return trimmedWhiteSpace
    })
    return trim
  }
  
  // the 
  const formattedDataInArray = cleansedArray.map(student => trimAndRemoveQuotes(student)) 

  // create a loop to create JSON data

  jsonResult[formattedDataInArray[0][2]] = {}

  jsonResult[formattedDataInArray[0][2]][lastName] = formattedDataInArray[0][0]
  jsonResult[formattedDataInArray[0][2]][firstName] = formattedDataInArray[0][1]
  jsonResult[formattedDataInArray[0][2]][SSN] = formattedDataInArray[0][2]
  jsonResult[formattedDataInArray[0][2]][Test1] = formattedDataInArray[0][3]
  jsonResult[formattedDataInArray[0][2]][Test2] = formattedDataInArray[0][4]
  jsonResult[formattedDataInArray[0][2]][Test3] = formattedDataInArray[0][5]
  jsonResult[formattedDataInArray[0][2]][Test4] = formattedDataInArray[0][6]
  jsonResult[formattedDataInArray[0][2]][grade] = formattedDataInArray[0][7]

  console.log(formattedDataInArray)
});