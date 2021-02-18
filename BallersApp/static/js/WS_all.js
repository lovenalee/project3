// set the dimensions and margins of the graph
var margin = {top: 10, right: 200, bottom: 100, left: 200},
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")")  
  .classed("svg-content-responive", true);
//Read the data
d3.json("api/ws").then(function(wsdata) {
    console.log(wsdata);
    console.log([wsdata]);

    // List of groups (here I have one group per column)
    var allGroup = d3.map(wsdata, function(d){return(d.Rounded_Position)}).keys()

    // add the options to the button
    d3.select("#selectButton")
      .selectAll('myOptions')
     	.data(allGroup)
      .enter()
    	.append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button

    // A color scale: one color for each group
    var myColor = d3.scaleOrdinal()
      .domain(allGroup)
      .range(d3.schemeSet2);

    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
      .domain(d3.extent(wsdata, function(d) { return d.Year; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(7));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(wsdata, function(d) { return +d.WSmean; })])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));
    
    // Add X axis label:
    svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width/2 + margin.left - 170)
      .attr("y", height + margin.top +50)
      .text("Year")
      .style("font", "17px times");

    // Y axis label:
    svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 150)
      .attr("x", -margin.top - height/2 + 90)
      .text("Average Win Share")
      .style("font", "17px times")

    // Initialize line with first group of the list
    var line = svg
      .append('g')
      .append("path")
        .datum(wsdata.filter(function(d){return d.Rounded_Position==allGroup[0]}))
        .attr("d", d3.line()
          .x(function(d) { return x(d.Year) })
          .y(function(d) { return y(+d.WSmean) })
        )
        .attr("stroke", function(d){ return myColor("valueA") })
        .style("stroke-width", 4)
        .style("fill", "none")

    // A function that update the chart
    function update(selectedGroup) {

      // Create new data with the selection?
      var dataFilter = wsdata.filter(function(d){return d.Rounded_Position==selectedGroup})

      // Give these new data to update line
      line
          .datum(dataFilter)
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x(d.Year) })
            .y(function(d) { return y(+d.WSmean) })
          )
          .attr("stroke", function(d){ return myColor(selectedGroup) })
    }

    // When the button is changed, run the updateChart function
    d3.select("#selectButton").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update(selectedOption)
    })


})



// Set the ranges
var x = d3.scaleLinear().range([0, width]);  
var y = d3.scaleLinear().range([height, 0]);

// Define the line
var wsline = d3.line()	
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(+d.WSmean); })

// append the svg object to the body of the page
var svg2 = d3.select("#WS_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")")
  .classed("svg-content-responive", true);

//Read the data
d3.json("api/ws").then(function(wsdata) {
    console.log(wsdata);
    console.log([wsdata]);

    // Scale the range of the data
    x.domain(d3.extent(wsdata, function(d) { return d.Year; }));
    y.domain([0, d3.max(wsdata, function(d) { return +d.WSmean; })]);
  
    // group the data: I want to draw one line per group
    var dataNest = d3.nest() // nest function allows to group the calculation per level of a factor
        .key(function(d) { return d.Rounded_Position;})
        .entries(wsdata);

  // color palette

    var color = d3.scaleOrdinal()
      .domain(dataNest)
      .range(d3.schemeSet2);

    legendSpace = width/dataNest.length;// spacing for the legend



dataNest.forEach(function(d,i) { 

    svg2.append("path")
        .attr("class", "line")
        .attr("fill", "none")
        .style("stroke", function() { // Add the colours dynamically
            return d.color = color(d.key); })
        .style("stroke-width", 4)
        .attr("id", 'tag'+d.key.replace(/\s+/g, '')) // assign an ID
        .attr("d", wsline(d.values));

    // Add the Legend
    
    svg2.append("text")
        .attr("x", (legendSpace/2)+i*legendSpace-20)  // space legend
        .attr("y", height + (margin.bottom/2)+ 20)
        .attr("class", "legend")    // style the legend
        .style("fill", function() { // Add the colours dynamically
            return d.color = color(d.key); })
        .on("click", function(){
            // Determine if current line is visible 
            var active   = d.active ? false : true,
            newOpacity = active ? 0 : 1; 
            // Hide or show the elements based on the ID
            d3.select("#tag"+d.key.replace(/\s+/g, ''))
                .transition().duration(100) 
                .style("opacity", newOpacity); 
            // Update whether or not the elements are active
            d.active = active;
            })  
        .text(d.key); 

    });

  // Add the X Axis
  svg2.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add the Y Axis
  svg2.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y));

  // Add X axis label:
  svg2.append("text")
    .attr("text-anchor", "end")
    .attr("x", width/2 + margin.left - 170)
    .attr("y", height + margin.top +30)
    .text("Year")
    .style("font", "17px times");

  // Y axis label:
  svg2.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 150)
    .attr("x", -margin.top - height/2 + 90)
    .text("Average Win Share")
    .style("font", "17px times")

});