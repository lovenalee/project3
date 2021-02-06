// Get Data
d3.json("/api/tStats").then(function(tStatsdata, err) {
  if (err) throw err;
  console.log(tStatsData)

  // parse data
  tStatsData.forEach(function(tStatsData) {
    tStatsdata.Year = +tStatsdata.Year;
    tStatsData.Wins = +tStatsData.Wins;
    tStatsData.Losses = +tStatsData.Losses;
    tStatsData.Points = +tStatsData.Points;
  });
}
// var for drop down values
var season = Object.values(tStatsData.Seasons);

// Create an array of music provider labels
var labels = Object.keys(tStatsData.us);

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
});