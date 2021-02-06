
//SVG width and height values
var svgWidth = 1200;
var svgHeight = 600;
//Margin data
var margin = {
    top: 20,
    right: 20,
    bottom: 100,
    left: 30
  };
//Declare graphing area (relative to SVG)
  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;


var svg = d3.select("#goatbar2")
.append("svg")
.attr("width", svgWidth)
.attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);




d3.json("/api/goat").then(function(goatdata) {
  console.log(goatdata)


  goatdata.forEach(function(data){
    data.name = +data.name;
    data.WL = +data.WL;
    data.PTS = +data.PTS;
  });


// X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(goatdata.map(function(d) { return d.PTS; }))
  .padding(0.2);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");





}).catch(function(error) {
  console.log(error)
});