
// Define SVG area dimensions
var svgWidth2 = 3560;
var svgHeight2 = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

var selection = [];

// Define dimensions of the chart area
var chartWidth2 = svgWidth2 - chartMargin.left - chartMargin.right;
var chartHeight2 = svgHeight2 - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg2 = d3.select("#goatbar2")
  .append("svg")
  .attr("height", svgHeight2)
  .attr("width", svgWidth2);


var chartGroup2 = svg2.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);




d3.json("/api/tStats").then(function(ringsdata2) {
  console.log(ringsdata2)

  

  ringsdata2.forEach(function(d) {
    d.Assists =+ d.Assists;
  });


   // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
   var xBandScale2 = d3.scaleBand()
   .domain(ringsdata2.map(d => d.TeamName))
   .range([0, chartWidth2])
   .padding(0.1);

     // Create a linear scale for the vertical axis.
  var yLinearScale2 = d3.scaleLinear()
  .domain([0, d3.max(ringsdata2, d => d.Assists)])
  .range([chartHeight2, 0]);

  
  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis2 = d3.axisBottom(xBandScale2);
  var leftAxis2 = d3.axisLeft(yLinearScale2).ticks(30);

  // Append two SVG group elements to the chartGroup area,
  // and create the bottom and left axes inside of them
  chartGroup2.append("g")
    .call(leftAxis2);

  chartGroup2.append("g")
    .attr("transform", `translate(0, ${chartHeight2})`)
    .call(bottomAxis2);

  
    chartGroup2.selectAll(".bar")
    .data(ringsdata2)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xBandScale2(d.TeamName))
    .attr("y", d => yLinearScale2(d.Assists))
    .attr("width", xBandScale2.bandwidth())
    .attr("height", d => chartHeight2 - yLinearScale2(d.Assists))
    


}).catch(function(error) {
  console.log(error)
});

console.log(selection)
