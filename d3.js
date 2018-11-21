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

    var publicationCity = bookdata.map(d => {
        if (d.publication == null) { 
            return "";
        }
        return d.publication.replace(/[^a-zA-Z ]/g, "")
    })
    

    var cityArray = []
    // duitseSteden.forEach(city => {
    //     if (publicationCity.includes(city)  ) {
    //         cityArray.push(city)
    //     }
    //     else {
    //         // console.log('nietus')
    //     }
    // })

    // console.log(publicationCity)
    // console.log(publicationYear)
    // console.log(cityArray)
    // console.log(bookdata)

    // duitseSteden.filter(city => {
    //     // console.log(city)
    //     if (bookdata.publication.includes(city)) {
    //         cityArray.push(bookdata)
    //     }
    // })

    // publicationCity.forEach(book => {
    //     // console.log(book)
    //     if(publicationCity.includes(duitseSteden)) {
    //         console.log('check')
    //     }
    //     else {

    //     }
    // })

    var steden = d3
        .nest()
        .key(jaar => pubYear)
        .key(stad => publication)
        .rollup()

    return bookdata
  })
  return data
})

d3.json("data/all.json").then(function(data) {
    var bookNested = d3
        .nest()
        .key(data => data.publication)
        .key(data => data.pubYear)
        
        // .rollup(function(data) {
        //     return data.length
        // })
        .entries(data) 
        console.log(bookNested)    
    return bookNested
   
})

