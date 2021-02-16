
// Define SVG area dimensions
var svgWidth = 600;
var svgHeight = 500;

// Define the chart's margins as an object
var chartMargin = {
  top: 50,
  right:0,
  bottom: 150,
  left: 100
};

var selection = [];
var nestedData = [];

var toolTip = d3.selectAll("#goatbar1")
.append("div")
.classed("tooltip", true)

 

  



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
  .attr("PreserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", "0 0 600 400")
  .classed("svg-content-responive", true);

  // Define SVG area dimensions
var svgWidth2 = 600;
var svgHeight2 = 400;

// Define the chart's margins as an object
var chartMargin2 = {
  top2: 50,
  right2: 50,
  bottom2: 90,
  left2: 150
};

var selection = [];

// Define dimensions of the chart area
var chartWidth2 = svgWidth2 - chartMargin2.left2 - chartMargin2.right2;
var chartHeight2 = svgHeight2 - chartMargin2.top2 - chartMargin2.bottom2;

// Select body, append SVG area to it, and set the dimensions

var svg2 = d3.select("#goatbar2")
  .append("svg")
  .attr("PreserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", "0 0 600 400")
  .attr("transform", (d,i) => `translate(${(i*30)+30},30) rotate(${d})`)
  .classed("svg-content-responive2", true)


var chartGroup2 = svg2.append("g")
  .attr("transform", `translate(${chartMargin2.left2}, ${chartMargin2.top2})`);


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
    .attr("fill", d => d.Year)

    .on("click", function(d){

     
      result = []
      selection = d3.select(this).data(ringsdata.Player)
      playerselect = selection.filter(function(d){return d.key = d.Player})
      

      result = extractValue(selection, 'Player');
      console.log(result);

      console.log(selection)

      

      toolTip.transition()
      .duration(200)
      .style("opacity", 1)
  

    
    
      toolTip.html("<span>" + "<strong>" + d.Player + "</strong>"+ "</span>" + "<br/>"+"<br/>"  + "titles:  " + "<strong>" + d.Titles+"</strong>" + "<br/>"+"<br/>"  + "dominant decade:  " + "<strong>" + d.Decade+"</strong>")
      
    
    


d3.json("/api/totals").then(function(ringsdata2) {
  console.log(ringsdata2)

  

  ringsdata2.forEach(function(d) {
    d[result] =+ d[result];
  });

 

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
  var bottomAxis2 = d3.axisBottom(xBandScale2) 
  
  var leftAxis2 = d3.axisLeft(yLinearScale2).ticks(20);

  // Append two SVG group elements to the chartGroup area,
  // and create the bottom and left axes inside of them
  //chartGroup2.append("g")
    //.call(leftAxis2);

  chartGroup2.selectAll("*").remove()

  chartGroup2.append("g")
  .transition()
  .duration(1000)
    .attr("transform", `translate(0, ${chartHeight2})`)
    .call(bottomAxis2)
    .style("font-weight", "bold")
    .attr('class', 'axis2')
    .selectAll('text')
    .attr('dy', '-6px')
    .attr('dx', '-50px');
  
   
   chartGroup2.selectAll(".bar")
    .data(ringsdata2)
    .enter()
    
    .append("rect")
    .transition()
    .duration(1000)
      .attr("class", "bar2")
      .attr("x", d => xBandScale2(d.Stats))
      .attr("y", d => yLinearScale2(d[result]))
      .attr("width", xBandScale2.bandwidth())
      .attr("height", d => chartHeight2 - yLinearScale2(d[result]))
  
      
    ;
    
 
  chartGroup2.selectAll(".bar")
  .data(ringsdata2)
  .enter()
  .append("g")
  
  .append("text")
  .transition()
  .duration(2000)
    .text(function(d){return(d[result])})
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .attr("alignment-baseline", "middle")
    .attr("x", function(d){
      return xBandScale2(d.Stats) + xBandScale2.bandwidth()/2 - 20;
  })
  .attr("y", function(d){
      return yLinearScale2(d[result]) - 10;
  })

 

})


.catch(function(error) {
  console.log(error)


})



;


      
      
    });
    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -50)
    .attr("x", -250)
    .attr("dy", "1em")
    .style("font-size", "12")
    //.style("font-weight", "bold")
    .text("# of Championships ");

    chartGroup.append("text")
    .attr("y", 345)
    .attr("x", 245)
    .style("font-size", "12")
    //.style("font-weight", "bold")
    .text("Players");

    chartGroup.append("text")
    .attr("y", -30)
    .attr("x", 180)
    .style("font-size", "12")
    .style("font-weight", "bold")
    .text("Greatest Basketball Players");

    chartGroup.append("text")
    .attr("y", 0)
    .attr("x", 200)
    .style("font-size", "12")
    //.style("font-weight", "bold")
    .text("(Championship Wins)");
   

   chartGroup2.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 650)
    .attr("x", -550)
    .style("font-size", "15")
    .style("font-weight", "bold")
    .text("*Players in the 1970’s and earlier have no data collected for 'steals' in their career.");

    chartGroup2.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 675)
    .attr("x", -548)
    .style("font-size", "15")
    .style("font-weight", "bold")
    .text("This category was not yet created but proves to be valuable today.");



}).catch(function(error) {
console.log(error);



})



.catch(function(error) {
  console.log(error)
});



