			// //Width and height
			// var w = 800;
			// var h = 600;

			// //Define map projection


			// var projection = d3.geoMercator() //utiliser une projection standard pour aplatir les pôles, voir D3 projection plugin
			// 					   .center([ 13, 52 ]) //comment centrer la carte, longitude, latitude
			// 					   .translate([ w/2, h/2 ]) // centrer l'image obtenue dans le svg
			// 					   .scale([ w/1.5 ]); // zoom, plus la valeur est petit plus le zoom est gros 

			// //Define path generator
			// var path = d3.geoPath()
			// 				 .projection(projection);


			// //Create SVG
			// var svg = d3.select("#container")
			// 			.append("svg")
			// 			.attr("width", w)
			// 			.attr("height", h);

			// //Load in GeoJSON data
			// d3.json("world_map.json", function(json) {
				
			// 	//Bind data and create one path per GeoJSON feature
			// 	svg.selectAll("path")
			// 	   .data(json.features)
			// 	   .enter()
			// 	   .append("path")
			// 	   .attr("d", path)
			// 	   .attr("stroke", "rgba(8, 81, 156, 0.2)")
			// 	   .attr("fill", "rgba(8, 81, 156, 0.6)");
		
			// });