
// Define SVG area dimensions
var svgWidth = 1000;
var svgHeight = 700;

// Define the chart's margins as an object
var chartMargin = {
  top: 200,
  right: 30,
  bottom: 100,
  left: 60
};

var selection = [];
var nestedData = [];

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

function extractValue(arr, prop) {

  // extract value from property
  let extractedValue = arr.map(item => item[prop]);

  return extractedValue;

}

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
        .key(function(d){return d.Player})
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

     
      result = []
      selection = d3.select(this).data(ringsdata.Player)
      playerselect = selection.filter(function(d){return d.key = d.Player})
      

      result = extractValue(selection, 'Player');
      console.log(result);

      console.log(selection)

      
// Define SVG area dimensions
var svgWidth2 = 1000;
var svgHeight2 = 660;

// Define the chart's margins as an object
var chartMargin2 = {
  top2: 200,
  right2: 30,
  bottom2: 75,
  left2: 60
};

var selection = [];

// Define dimensions of the chart area
var chartWidth2 = svgWidth2 - chartMargin2.left2 - chartMargin2.right2;
var chartHeight2 = svgHeight2 - chartMargin2.top2 - chartMargin2.bottom2;

// Select body, append SVG area to it, and set the dimensions

var svg2 = d3.select("#goatbar2")
  .append("svg")
  .attr("height", svgHeight2)
  .attr("width", svgWidth2);



var chartGroup2 = svg2.append("g")
  .attr("transform", `translate(${chartMargin2.left2}, ${chartMargin2.top2})`);





d3.json("/api/totals").then(function(ringsdata2) {
  console.log(ringsdata2)

  

  ringsdata2.forEach(function(d) {
    d[result] =+ d[result];
  });


  svg2.selectAll(".bar")
  .data(ringsdata2).exit()
.remove();
   // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
   var xBandScale2 = d3.scaleBand()
   .domain(ringsdata2.map(d => d.Stats))
   .range([0, chartWidth2])
   .padding(0.1);

     // Create a linear scale for the vertical axis.
  var yLinearScale2 = d3.scaleLinear()
  .domain([0, d3.max(ringsdata2, d => d[result])])
  .range([chartHeight2, 0]);

  
  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis2 = d3.axisBottom(xBandScale2);
  var leftAxis2 = d3.axisLeft(yLinearScale2).ticks(20);

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
    .attr("x", d => xBandScale2(d.Stats))
    .attr("y", d => yLinearScale2(d[result]))
    .attr("width", xBandScale2.bandwidth())
    .attr("height", d => chartHeight2 - yLinearScale2(d[result]))
    
    


}).catch(function(error) {
  console.log(error)
});


      
      
    });
    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -50)
    .attr("x", -300)
    .attr("dy", "1em")
    .style("font-weight", "bold")
    .text("# of Championships ");

    chartGroup.append("text")
    .attr("y", 450)
    .attr("x", 350)
    .style("font-weight", "bold")
    .text("Greatest Players");

}).catch(function(error) {
console.log(error);

}).catch(function(error) {
  console.log(error)
});
