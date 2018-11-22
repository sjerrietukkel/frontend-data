// Based on https://bl.ocks.org/gordlea/27370d1eea8464b04538e6d8ced39e89
// d3.csv("duitsesteden.csv").then(function(data) {
//     return data
// })



// .then(data => {  
//   d3.json("data/all.json").then(function(bookdata){
//     var duitseSteden = data.map(d => {
//         return d.publication.replace(/[^a-zA-Z ]/g, "")
//     })
//     var publicationYear = bookdata.map(d => {
//         if (d.pubYear == null) { 
//             return ""; 
//         }
//         return d.pubYear
//     })

//     var publicationCity = bookdata.map(d => {
//         if (d.publication == null) { 
//             return "";
//         }
//         return d.publication.replace(/[^a-zA-Z ]/g, "")
//     })
    

//     var cityArray = []
//     // duitseSteden.forEach(city => {
//     //     if (publicationCity.includes(city)  ) {
//     //         cityArray.push(city)
//     //     }
//     //     else {
//     //         // console.log('nietus')
//     //     }
//     // })

//     // console.log(publicationCity)
//     // console.log(publicationYear)
//     // console.log(cityArray)
//     // console.log(bookdata)

//     // duitseSteden.filter(city => {
//     //     // console.log(city)
//     //     if (bookdata.publication.includes(city)) {
//     //         cityArray.push(bookdata)
//     //     }
//     // })

//     // publicationCity.forEach(book => {
//     //     // console.log(book)
//     //     if(publicationCity.includes(duitseSteden)) {
//     //         console.log('check')
//     //     }
//     //     else {

//     //     }
//     // })

//     return bookdata
//   })
//   return data
// })

d3.json("data/all.json").then(function(data) {
    // var bookNested = d3
    //     .nest()
    //     .key(data => data.pubYear)
    //     // .key(data => data.publication)
    //     .rollup(function(data) {
    //         return data.length
            
    //     })
    //     .entries(data)

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

    let cityList = ['Berlin', 'Kln',  'Frankfurt am Main', 'Mnchen', 'Leipzig']
    let dataList = []


    let submit = document.querySelector("#submit").addEventListener('click', addToCityList)
    // var inputValue = document.getElementById('box').value
    function addToCityList() {
        cityList.push(document.getElementById('box').value); 
        update(createDataList(cityList))
        console.log(cityList)
      }

      
    function createDataList(list){
        const result = [];
        list.forEach(city => {
            thisCityValues = {
                city: city,
                value: []
            }

            for (let i = 1920; i <= 1970; i++) {
                let thisYear = {
                    year: i,
                    value: 0
                }

                publicationCity.forEach(book => {
                    if(book.publication != city) {
                        return
                    }

                    if (Number(book.pubYear) === i) {
                        thisYear.value++
                    }
                })

                thisCityValues.value.push(thisYear)
            }

            result.push(thisCityValues)
        })
        return result

    }
    


    
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var parseTime = d3.timeParse("%Y");
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .classed("holder", true)
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    x.domain([parseTime(1920), parseTime(1970)]);
    y.domain([0, 50]);

    // Add the X axis
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y));
    
            
    update(createDataList(cityList))
    function update(list){

        var valueline = d3.line()
            .x(function(d) { return x(parseTime(d.year)); })
            .y(function(d) { return y(d.value); });

        list.forEach(city => {
            svg
                .data([city.value])
                .append("path")
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("class", `line ${city.city}`)
                .attr("d", valueline)

        })
    }

//     let cities = []
//     for (let i = 1950; i <= 2018; i++) {
//         let thisCity = {
//             city: i,
//             values: [
//                 {year: i, value: 2}
//             ]
//         }

//         publicationCity.forEach(book => {
//             let thisCity = book.publication
//             function findCity(bookItem) {
//                 return bookItem.city === book.publication
//             }
//             if (oneOfCities(book.publication) === false) {
//                 return
//             }
//             if (Number(book.pubYear) === i) {
//                 let arrayItem = thisYear.values.find(findCity)
//                 let index = thisYear.values.findIndex(findCity)
//                 if (index === -1) {
//                     thisYear.values.push({city: book.publication, value: 1})
//                 } else if (index >= 0) {
//                     thisYear.values.splice(index, 1)
//                     thisYear.values.push({city: book.publication, value: arrayItem.value + 1})
//                 }
//             } else {
//                 let index = thisYear.values.findIndex(findCity)

//                 if (index >= 0) {
//                     return
//                 }
//                 thisYear.values.push({city: book.publication, value: 0})
//             }
//         })

//         thisYear.values.sort(function(a, b) {
//             var textA = a.city.toUpperCase();
//             var textB = b.city.toUpperCase();
//             return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
//         });

//         sortedByYear.push(thisYear)
//     }
//     return sortedByYear
})

