// var for drop down values
var season = Object.values(tStatsData.Seasons);

// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
function getData() {
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.property("value");
  // Initialize an empty array for the country's data
  var data = [];

  If (dataset === 'season') {
    data = tStatsData.Seasons
    };
}

// Set chart range
var svgWidth = 1000;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3
    .select(".scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "Wins";

// function used for updating x-scale var upon click on axis label
function xScale(tStatsData, chosenXAxis) {
    // create scales
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(tStatsData, tStatsData => tStatsData[chosenXAxis]) * 0.8,
        d3.max(tStatsData, tStatsData => tStatsData[chosenXAxis]) * 1.2
      ])
      .range([0, width]);
  
    return xLinearScale;
  }

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
  
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return xAxis;
  }

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis) {

    circlesGroup.transition()
      .duration(1000)
      .attr("cx", tStatsData => newXScale(tStatsData[chosenXAxis]));
  
    return circlesGroup;
  }

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

    var label;
  
    if (chosenXAxis === "Wins") {
      label = "Team Wins:";
    }
    else {
      label = "Team Losses:";
    }
  
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.Team}<br>${label} ${d[chosenXAxis]}`);
      });
  
    circlesGroup.call(toolTip);
  
    circlesGroup.on("mouseover", function(tStatsdata) {
      toolTip.show(tStatsdata);
    })
      // onmouseout event
      .on("mouseout", function(tStatsdata, index) {
        toolTip.hide(tStatsdata);
      });
  
    return circlesGroup;
  }

// Get Data
d3.json("/api/tStats").then(function(tStatsdata, err) {
    if (err) throw err;

    console.log(tStatsData)

  // parse data
  tStatsData.forEach(function(tStatsData) {
    tStatsData.Wins = +tStatsData.Wins;
    tStatsData.Losses = +tStatsData.Losses;
    tStatsData.Points = +tStatsData.Points;
    tStatsdata.TeamAbbr = +tStatsdata.TeamAbbr;
  });
  
  // xLinearScale function above csv import
  var xLinearScale = xScale(tStatsData, chosenXAxis);

  // Create y scale function
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(tStatsData, d => tStatsdata.Points)])
    .range([height, 0]);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  chartGroup.append("g")
    .call(leftAxis);

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(tStatsData)
    .enter()
    .append("circle")
    .attr("cx", tStatsData => xLinearScale(tStatsData[chosenXAxis]))
    .attr("cy", tStatsData => yLinearScale(tStatsData.Points))
    .attr("r", 20)
    .attr("fill", "blue")
    .attr("opacity", ".5");

  // Create group for two x-axis labels
  var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 30})`);

  var WinsLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "Wins") // value to grab for event listener
    .classed("active", true)
    .text("Team Wins");

  var LossesLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "Losses") // value to grab for event listener
    .classed("inactive", true)
    .text("Losses");

  // append y axis
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 50)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Points");

  // updateToolTip function above csv import
  var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

  // x axis labels event listener
  labelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {

        // replaces chosenXAxis with value
        chosenXAxis = value;

        // console.log(chosenXAxis)

        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = xScale(tStatsData, chosenXAxis);

        // updates x axis with transition
        xAxis = renderAxes(xLinearScale, xAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenXAxis === "Points") {
          PointsLabel
            .classed("active", true)
            .classed("inactive", false);
          WinsLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else {
          PointsLabel
            .classed("active", false)
            .classed("inactive", true);
          LossesLabel
            .classed("active", true)
            .classed("inactive", false);
        }
      }
    });

}).catch(function(error) {
    console.log(error)
});

