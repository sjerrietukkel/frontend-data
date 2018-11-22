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

    return bookdata
  })
  return data
})

d3.json("data/all.json").then(function(data) {
    var bookNested = d3
        .nest()
        .key(data => data.pubYear)
        // .key(data => data.publication)
        .rollup(function(data) {
            return data.length
            
        })
        .entries(data)

    // bookNested.forEach(city => {
    //     if (publication.includes(city) ) {
            
    //     }
    //     else {
    //         console.log('doetniet')
    //     }
    // })
        
     // duitseSteden.forEach(city => {
    //     if (publicationCity.includes(city)  ) {
    //         cityArray.push(city)
    //     }
    //     else {
    //         // console.log('nietus')
    //     }
    // })
    // console.log(bookNested)
    var publicationCity = data.map(d => {
        return {
            pubYear: d.pubYear,
            publication: d.publication == null ? 'geen plaats' : d.publication.replace(/[^a-zA-Z ]/g, "")
        }
    })

    function oneOfCities(city) {
        switch (city) {
            case 'Amsterdam':
            case 'Berlin':
            case 'Kln':
            case 'Zrich':
            case 'Frankfurt am Main':
            case 'Mnchen':
            case 'Wien':
                return true
            default:
                return false
        }
    }


    let sortedByYear = []
    for (let i = 1900; i <= 2018; i++) {
        let thisYear = {
            year: i,
            values: []
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
})

.then(d => {
    console.log(d)

    let body = d3.select('body')
    let svg = body
    .append('svg')
    .attr('width', 1000)
    .attr('height', 1000)

    let yearCount = d.map(d => {
        return Number(d.key)
    })  


    let bookCount = d.map(d => {
        return Number(d.value)
    }) 



    let Xscale = d3.scaleLinear()
        .range ([0, 700])
        .domain([1800, 2018])
        // .domain([d3.min(), d3.max(yearCount)])


    let Yscale = d3.scaleLinear()
        .range([0, 500])
        .domain([600, 0])    
        
        // .domain([
        //     d3.max(d, d=> {
        //         return formatNumbers(d)
        //     })
            
        // ])    

    let x_Axis = d3
        .axisBottom()
        .scale(Xscale)
        .tickFormat(d3.format("d"));

    let y_Axis = d3.axisLeft().scale(Yscale);
   
    let xAxisGroup = svg
        .append("g")
        .attr("transform", "translate(0, " + 500 + ")")
        .call(x_Axis);
        
    let yAxisGroup = svg
        .append("g")
        .call(y_Axis);        



    function formatNumbers(d) {
        let format = "1985"
        let formatIndex = d.values.findIndex(x => x.key === format)
        if (formatIndex!== -1) {
            return d.values[formatIndex].value.formatCount
        } else {
            return 0
        }
    }

    svg.selectAll("line")
    .data(d)
    .enter()
    .append("circle")
    .style('fill', 'orange')
    .style('opacity', '.3')
    .attr("r", 5)
    .attr("cx", d => {
        return Xscale(Number(d.key))
    })
    .attr("cy", d => {
        return Yscale(Number(d.value))
    })

})
