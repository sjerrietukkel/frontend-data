require('dotenv').config()
const gissa = require('@gijslaarman/oba-scraper')
const chalk = require('chalk')
const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')

const obaApi = new gissa({
  publicKey: process.env.PUBLIC
})

const search = {
  endpoint: 'search',
  query: {
      q: 'year:1950',
      facet: 'pubYear(1950)&facet=language(ger)',
      refine: true
  },
  pages: {
      page: 1,
      pagesize: 20,
      maxpages: 50
  },
  filter: {
      pubYear: `book.publication && book.publication[0].year && book.publication[0].year[0]['_'] ? book.publication[0].year[0]['_'] : null`,
      language: `book.languages && book.languages[0] && book.languages[0].language && book.languages[0].language[0] ? book.languages[0].language[0]['_'] : null`,
      publication: `book.publication[0].publishers[0].publisher[0].$.place`,
      originLang: `book.languages && book.languages[0] && book.languages[0]['original-language'] ? book.languages[0]['original-language'][0]['_'] : null`,
      title: `book.titles[0].title[0]['_']`
  }
}


obaApi.getPages(search).then(
  res => fs.writeFile('1950.json', JSON.stringify(res.data), 'utf8', () => {
    console.log('Joe joe, ik heb de file gemaakt.')
  })
)
































// // Search for method, params and than optional where you wanna find something
// // returns first 20 items
// // obaApi.get(endpoint, params, filterKey)
// // possible endpoints: search (needs 'q' parameter) | details (needs a 'frabl' parameter) | availability (needs a 'frabl' parameter) | holdings/root | index/x (where x = facet type (like 'book' ))
// // possible parameters: q, librarian, refine, sort etc. check oba api documentation for all
// // possible filterKey: any higher order key in response object, like title returns only title objects instead of full data object
 
// obaApi.getAll('search', {
//   facet: "genre(oorlog-en-verzet)",
//   q: 'book'
// }, {
//   page: 1,
//   pagesize: 20,
//   maxpages: 40
// })
// .then(response => {
//   const data = response.data
//   // response ends up here
//   console.log(response)
//   // lege array waar de opgehaalde data in gepush'd
//   let dataArray = [];
// // Laat van de arrays de geselecteerde objecten zien 
  
//   const results = data.map(book => {
//     return {
//       title: book.titles[0].title[0]['_'],
//       year: book.publication[0].year[0]._,
//       place: book.publication[0].publishers[0].publisher[0].$.place
//       // coverImage: book.coverimages[0].coverimage[0]['_'],
//       // summary: book.summaries[0].summary[0]
//     } 
//   })
 
//   let total = {
//     //url: response.url, 
//     data: results
//   };

//   // pushed in de array
//   dataArray.push(total);
//   return dataArray
  
// }) 

// .then(response => {
//   // Make server with the response on the port
//   app.get('/', (req, res) => res.json(response))
//   app.listen(port, () => console.log(chalk.green(`Listening on port ${port}`)))
//   console.log(response)
//   // data = JSON.stringify(response, null, 2);
//   // fs.writeFileSync('bookdata.json', data);
// })
// .catch(err => console.log(err))
// // combined facets -> facet: ["genre(dieren)", "language(dut)"]