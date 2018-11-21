// Based on https://bl.ocks.org/gordlea/27370d1eea8464b04538e6d8ced39e89
d3.csv("duitsesteden.csv").then(function(data) {
    return data
})

.then(data => {  
  d3.json("data/all.json").then(function(bookdata){
    var duitseSteden = data.map(d => {
        return d.publication.replace(/[^a-zA-Z ]/g, "")
    })
    var publicationYear = bookdata.map(d => {
        if (d.pubYear == null) { 
            return "";
        }
        return d.pubYear
    })
    console.log(publicationYear)

    var publicationCity = bookdata.map(d => {
        if (d.publication == null) { 
            return "";
        }
        return d.publication.replace(/[^a-zA-Z ]/g, "")
    })
    console.log(publicationCity)

    var cityArray = []
    duitseSteden.forEach(city => {
        if (publicationCity.includes(city)  ) {
            cityArray.push(city)
        }
        else {
            // console.log('nietus')
        }
    })
    console.log(cityArray)
    return bookdata
  })
  return data
})



// .then(data => {
//     d3.json("data/du_negentienvierenveertig.json").then(function(bookdata){
//       var duitseSteden = data.map(d => {
//           return d.publication.replace(/[^a-zA-Z ]/g, "")
  
//       })
//       var publicationCity = bookdata.map(d => {
//           return d.publication.replace(/[^a-zA-Z ]/g, "")
//       })  
//       var cityArray = []
//       duitseSteden.forEach(city => {
//           if (publicationCity.includes(city)) {
//               cityArray.push(city)
//           }
//           else {
//               console.log('false')
//           }
//       })
//       console.log(cityArray.length)
//       return bookdata
//     })
//     return data
//   })

//   .then(data => {
//     d3.json("data/du_negentienvijfendertig.json").then(function(bookdata){
//       var duitseSteden = data.map(d => {
//           return d.publication.replace(/[^a-zA-Z ]/g, "")
  
//       })
//       var publicationCity = bookdata.map(d => {
//           return d.publication.replace(/[^a-zA-Z ]/g, "")
//       })  
//       var cityArray = []
//       duitseSteden.forEach(city => {
//           if (publicationCity.includes(city)) {
//               cityArray.push(city)
//           }
//           else {
//               console.log('false')
//           }
//       })
//       console.log(cityArray.length)
//       return bookdata
//     })
//     return data
//   })

// let width = 800
// let height = 500

// let body = d3.select.('body')
// let svg = body.append('svg')

