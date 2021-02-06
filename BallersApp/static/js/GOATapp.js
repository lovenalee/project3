
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


d3.select("#goatbar1")
.append("svg")
.attr("width", svgWidth)
.attr("height", svgHeight);





d3.json("/api/goat").then(function(goatdata) {
  console.log(goatdata)










}).catch(function(error) {
  console.log(error)
});