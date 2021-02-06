d3.json("/api/tStats").then(function(data) {
    console.log(data)

// Sort the data by Greek search results
var sortedByTeamName = data.sort((a, b) => b.data[5] - a.data[5]);

// Slice the first 10 objects for plotting
slicedData = sortedByGreekSearch.slice(0, 10);

// Reverse the array to accommodate Plotly's defaults
reversedData = slicedData.reverse();

// Trace1 for the Greek Data
var trace1 = {
  x: reversedData.map(object => object.data[5]),
  y: reversedData.map(object => object.data[2]),
  text: reversedData.map(object => object.data[3]),
  name: "TeamPoints",
  type: "bar",
  orientation: "h"
};

// data
var data = [trace1];

// Apply the group bar mode to the layout
var layout = {
  title: "Team Stats",
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100
  }
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", data, layout);

}).catch(function(error) {
    console.log(error)
});

