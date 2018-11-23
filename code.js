// Attempt at nesting data 
    var bookNested = d3
        .nest()
        .key(data => data.pubYear)
        // .key(data => data.publication)
        .rollup(function(data) {
            return data.length
            
        })
        .entries(data)

    bookNested.forEach(city => {
        if (publication.includes(city) ) {
            
        }
        else {
            console.log('doetniet')
        }
    })
        
     duitseSteden.forEach(city => {
        if (publicationCity.includes(city)  ) {
            cityArray.push(city)
        }
        else {
        }
    })
    console.log(bookNested)



 // Checking if cities are german 
 
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
    duitseSteden.forEach(city => {
        if (publicationCity.includes(city)  ) {
            cityArray.push(city)
        }
        else {
            // console.log('nietus')
        }
    })

    duitseSteden.filter(city => {
        // console.log(city)
        if (bookdata.publication.includes(city)) {
            cityArray.push(bookdata)
        }
    })

    publicationCity.forEach(book => {
        // console.log(book)
        if(publicationCity.includes(duitseSteden)) {
            console.log('check')
        }
        else {

        }
    })

    return bookdata
  })
  return data
})


// Restructering code by year

    let cities = []
    for (let i = 1950; i <= 2018; i++) {
        let thisCity = {
            city: i,
            values: [
                {year: i, value: 2}
            ]
        }

        publicationCity.forEach(book => {
            let thisCity = book.publication
            function findCity(bookItem) {
                return bookItem.city === book.publication
            }
            if (oneOfCities(book.publication) === false) {
                return
            }
            if (Number(book.pubYear) === i) {
                let arrayItem = thisYear.values.find(findCity)
                let index = thisYear.values.findIndex(findCity)
                if (index === -1) {
                    thisYear.values.push({city: book.publication, value: 1})
                } else if (index >= 0) {
                    thisYear.values.splice(index, 1)
                    thisYear.values.push({city: book.publication, value: arrayItem.value + 1})
                }
            } else {
                let index = thisYear.values.findIndex(findCity)

                if (index >= 0) {
                    return
                }
                thisYear.values.push({city: book.publication, value: 0})
            }
        })

        thisYear.values.sort(function(a, b) {
            var textA = a.city.toUpperCase();
            var textB = b.city.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });

        sortedByYear.push(thisYear)
    }
    return sortedByYear


