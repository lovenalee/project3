var svgWidth = 960;
var svgHeight = 550;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

// Get Data
d3.json("/api/tStats").then(function(data) {
    console.log(data)

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    censusData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
      });
  
      // Step 2: Create scale functions
      // ==============================
      var xLinearScale = d3.scaleLinear()
        .domain([8, d3.max(censusData, d => d.poverty)])
        .range([0, width]);
  
      var yLinearScale = d3.scaleLinear()
        .domain([2, d3.max(censusData, d => d.healthcare)])
        .range([height, 0]);
  
      // Step 3: Create axis functions
      // ==============================
      var bottomAxis = d3.axisBottom(xLinearScale);
      var leftAxis = d3.axisLeft(yLinearScale);
  
      // Step 4: Append Axes to the chart
      // ==============================
      chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
      
      chartGroup.append("g")
        .call(leftAxis);
  
      // Step 5: Create Circles
      // ==============================
      var circlesGroup = chartGroup.selectAll("circle")
        .data(censusData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "15")
        .attr("fill", "royalblue")
        .attr("opacity", "0.5")
  
      // Step 6: Initialize tool tip
      // ==============================
      var toolTip = d3.tip()
        .attr("class", "tooltip")
        .html(function (d) {
          return `${d.abbr}<br>Healthcare: ${d.healthcare}</br> Poverty: <${d.poverty}`
        });
      // Step 7: Create tooltip in the chart
      // ==============================
      chartGroup.call(toolTip);
      
      // Step 8: Create event listeners to display and hide the tooltip
      // ==============================
      circlesGroup.on("mouseover", function(d) {
        toolTip.show(d, this)
          })
          .on("mouseout", function (d) {
          toolTip.hide(d)
          })
  
      // Create axes labels
      chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 50)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Lacks Healthcare (%)");
  
      chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("In Poverty (%)");

}).catch(function(error) {
    console.log(error)
});

