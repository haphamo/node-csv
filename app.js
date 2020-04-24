const fs        = require('fs')
const csv       = require('csv-parser')

const filepath  = './grades.csv'

const jsonResult = {}

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

// without using library
fs.readFile(filepath, 'utf8', function (err, data) {

  // An array consisting of each student data as strings
  const dataArray = data.split(/\r?\n/);
  // the first line in the array is the column header(title), while the cleansedArray is the data
  const [columnData, ...cleansedArray] = dataArray

  // get the column headers
  const columnHeaderData = columnData.split(',')
  const columnHeaderArray = columnHeaderData.map(title => {
    const trimmed = title.trim()
    return trimmed.slice(1, trimmed.length-1)
  })

  // array destructuring to get column header(title) 
  const [lastName, firstName, SSN, Test1, Test2, Test3, Test4, final, grade] = columnHeaderArray
 
  const formattedDataInArray = cleansedArray.map(student => trimAndRemoveQuotes(student)) 

  // create a loop to create JSON data
  formattedDataInArray.map(entry => {
    const studentNumber = entry[2]
    
    jsonResult[studentNumber] = {}
    // Can make into a function
    jsonResult[studentNumber][lastName] = entry[0]
    jsonResult[studentNumber][firstName] = entry[1]
    jsonResult[studentNumber][SSN] = entry[2]
    jsonResult[studentNumber][Test1] = entry[3]
    jsonResult[studentNumber][Test2] = entry[4]
    jsonResult[studentNumber][Test3] = entry[5]
    jsonResult[studentNumber][Test4] = entry[6]
  })

  console.log(jsonResult)
});