// Based on https://beta.observablehq.com/@razpudding/d3-multi-line-chart

d3.json("data/all.json").then(function(data) {
    var publicationCity = data.map(d => {
        return {
            pubYear: d.pubYear,
            publication: d.publication == null ? 'geen plaats' : d.publication.replace(/[^a-zA-Z ]/g, "")
        }
    })

    let cityList = ['Berlin',  'Frankfurt am Main', 'Mnchen', 'Leipzig']
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
    
    var margin = {top: 20, right: 20, bottom: 60, left: 60},
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
    svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .style("font-family", "Arial, Helvetica, sans-serif")
      .text("Jaartal");

    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y));
        svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1.5em")
      .style("text-anchor", "middle")
      .style("font-family", "Arial, Helvetica, sans-serif")
      .text("Uitgebrachte boeken");      
    
            
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
})

