// Based on https://bl.ocks.org/gordlea/27370d1eea8464b04538e6d8ced39e89
d3.csv("duitsesteden.csv").then(function(data) {
    return data
})

.then(data => {
  d3.json("data/du_negentienvijftig.json").then(function(bookdata){
    var duitseSteden = data.map(d => {
        return d.publication.replace(/[^a-zA-Z ]/g, "")

    })
    var publicationCity = bookdata.map(d => {
        return d.publication.replace(/[^a-zA-Z ]/g, "")
    })  
    var cityArray = []
    duitseSteden.forEach(city => {
        if (publicationCity.includes(city)) {
            cityArray.push(city)
        }
        else {
            console.log('false')
        }
        
    })
    console.log(cityArray.length)
    return bookdata
  })
  return data
})

.then(data => {
    d3.json("data/du_negentienvierenveertig.json").then(function(bookdata){
      var duitseSteden = data.map(d => {
          return d.publication.replace(/[^a-zA-Z ]/g, "")
  
      })
      var publicationCity = bookdata.map(d => {
          return d.publication.replace(/[^a-zA-Z ]/g, "")
      })  
      var cityArray = []
      duitseSteden.forEach(city => {
          if (publicationCity.includes(city)) {
              cityArray.push(city)
          }
          else {
              console.log('false')
          }
      })
      console.log(cityArray.length)
      return bookdata
    })
    return data
  })

  .then(data => {
    d3.json("data/du_negentienvijfendertig.json").then(function(bookdata){
      var duitseSteden = data.map(d => {
          return d.publication.replace(/[^a-zA-Z ]/g, "")
  
      })
      var publicationCity = bookdata.map(d => {
          return d.publication.replace(/[^a-zA-Z ]/g, "")
      })  
      var cityArray = []
      duitseSteden.forEach(city => {
          if (publicationCity.includes(city)) {
              cityArray.push(city)
          }
          else {
              console.log('false')
          }
      })
      console.log(cityArray.length)
      return bookdata
    })
    return data
  })

// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%d-%b-%y");

// set the ranges
var x = d3
    .scaleTime()
    .range([0, width]);

var y = d3
    .scaleLinear()
    .range([height, 0]);

// define the line
var valueline = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); })
    .curve(d3.curveMonotoneX);

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv('data.csv')
.then(function(data, error){ 
  if (error) throw error('Data wordt niet geladen');
  // format the data
  data.forEach(function(d) {
      d.date = parseTime(d.date);
      d.close = +d.close;
      console.log('Data wordt geladen');
  });

  var bookByYear = d3   
    .nest()
    .key(function(d) {
        return d.Year;
    });

  function hover(svg, path) {
    console.log("hover");
  }

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.close; })]);

  // Add the valueline path.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

});



  



