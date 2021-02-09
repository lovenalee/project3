
// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

var selection = [];

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("#goatbar1")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);


var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);




d3.json("/api/rings").then(function(ringsdata) {
  console.log(ringsdata)

  

  ringsdata.forEach(function(d) {
    d.Titles = +d.Titles;
  });

  nestedData = d3.nest()
        .key(function(d){return d})
        .entries(ringsdata);

   // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
   var xBandScale = d3.scaleBand()
   .domain(ringsdata.map(d => d.Player))
   .range([0, chartWidth])
   .padding(0.1);

     // Create a linear scale for the vertical axis.
  var yLinearScale = d3.scaleLinear()
  .domain([0, d3.max(ringsdata, d => d.Titles)])
  .range([chartHeight, 0]);

  
  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xBandScale);
  var leftAxis = d3.axisLeft(yLinearScale).ticks(12);

  // Append two SVG group elements to the chartGroup area,
  // and create the bottom and left axes inside of them
  chartGroup.append("g")
    .call(leftAxis);

  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  
    chartGroup.selectAll(".bar")
    .data(ringsdata)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xBandScale(d.Player))
    .attr("y", d => yLinearScale(d.Titles))
    .attr("width", xBandScale.bandwidth())
    .attr("height", d => chartHeight - yLinearScale(d.Titles))
    .on("click", function(d){

      
      selection = d3.select(this).data(ringsdata.Player)
      console.log(selection)

    });


}).catch(function(error) {
  console.log(error)
});

console.log(selection)
