// set the dimensions and margins of the graph
var margin = {top: 80, right: 5, bottom: 30, left: 100},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.json("/api/tStats").then(function(data) {
        console.log(data);
        
  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 90]) //wins
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
    
  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 9000]) //Points
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Color scale for selected seasons
  var color = d3.scaleOrdinal()
    .domain(["2014", "2015", "2016", "2017", "2018"])
    .range([ "red", "orange", "green", "blue", "yellow"])


  // Highlight the season that is hovered
  var highlight = function(d){

    selected_season = d.Seasons
    console.log(selected_season)
    
    d3.selectAll(".dot")
      .transition()
      .duration(200)
      .style("fill", "black")
      .attr("r", 3)

    d3.selectAll("." + selected_season)
      .transition()
      .duration(200)
      .style("fill", color(selected_season))
      .attr("r", 7)
  }

  // Highlight the season that is hovered
  var doNotHighlight = function(){
    d3.selectAll(".dot")
      .transition()
      .duration(200)
      .style("fill", "grey")
      .attr("r", 5 )
  }

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("class", function (d) { return "dot " + d.Seasons } )
      .attr("cx", function (d) { return x(d.Wins); } )
      .attr("cy", function (d) { return y(d.Points); } )
      .attr("r", 5)
      .style("fill", function (d) { return color(d.Seasons) } )
    .on("mouseover", highlight)
    .on("mouseleave", doNotHighlight )

})