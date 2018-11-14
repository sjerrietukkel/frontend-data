require('dotenv').config()

const betterApi = require('./oba-api-better.js')
const chalk = require('chalk')
const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')

const obaApi = new betterApi({
  public: process.env.PUBLIC
})

// Search for method, params and than optional where you wanna find something
// returns first 20 items
// obaApi.get(endpoint, params, filterKey)
// possible endpoints: search (needs 'q' parameter) | details (needs a 'frabl' parameter) | availability (needs a 'frabl' parameter) | holdings/root | index/x (where x = facet type (like 'book' ))
// possible parameters: q, librarian, refine, sort etc. check oba api documentation for all
// possible filterKey: any higher order key in response object, like title returns only title objects instead of full data object
 
obaApi.getAll('search', {
  facet: "genre(dieren)",
  q: 'kat'
}, {
  page: 2,
  pagesize: 20,
  maxpages: 3
})
.then(response => {
  const data = response.data
  // response ends up here
  console.log(response)
  // lege array waar de opgehaalde data in gepush'd
  let dataArray = [];
// Laat van de arrays de geselecteerde objecten zien 
  
  const results = data.map(book => {
    return {
      title: book.titles[0].title[0]['_'],
      // coverImage: book.coverimages[0].coverimage[0]['_'],
      // summary: book.summaries[0].summary[0]
    }
  })

  let total = {
    //url: response.url, 
    data: results
  };

  // pushed in de array
  dataArray.push(total);
  return dataArray
  
})

.then(response => {
  // Make server with the response on the port
  app.get('/', (req, res) => res.json(response))
  app.listen(port, () => console.log(chalk.green(`Listening on port ${port}`)))

  // data = JSON.stringify(response, null, 2);
  // fs.writeFileSync('bookdata.json', data);
})
.catch(err => console.log(err))
// combined facets -> facet: ["genre(dieren)", "language(dut)"]