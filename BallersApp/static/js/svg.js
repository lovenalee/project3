// var shotChartWidth = document.getElementById('shot-chart').clientWidth;
// var shotChartHeight = document.getElementById('shot-chart').clientHeight;

var marginLeft = 10;
var marginTop = 10;

// creating global variables
var players;
var teams;

// SVG selection
var shotChart = d3.select('#shot-chart')
                .append('g') // appending group
                .attr('transform', 'translate(' + marginLeft + ',' // translating group
                                                + marginTop + ')');
// setting up map for lookup
var outcomeLookup = d3.map();

// creating lookup index shotoutcome -> color
var outcomeIndex = [{ shot: "SCORED", color: "green", opacity:1 },
                    { shot: "MISSED", color: "red",  opacity:.3 },
                    { shot: "BLOCKED", color: "blue" }];

// setting up radius
var radius = 2.5;
var opacity = .4;

// starting queue to load data
queue()
  .defer(d3.json, "/api/shots") // import data from csv file
  .await(function(err, dataIn) {

    // parsing data from csv file
    dataIn.forEach(function(d) {
      d.locx = +d.locx;
      d.locy = +d.locy;
      d.shot = d.shotoutcome;
    });

    // creating lookup table shotoutcome -> color
    outcomeIndex.forEach(function(d) {
      outcomeLookup.set(d.shot, d.color);
    });

    // setting up cross filter and dimensions
    var cf = crossfilter(dataIn);

    var byPlayer = cf.dimension(function(d) { return d.Player; });
    players = byPlayer; // passing dimension to global variable

    var byTeam = cf.dimension(function(d) { return d.Team; });
    teams = byTeam; // passing dimension to global variable

    // scroll function that triggers initial drawing and data updates
    d3.graphScroll()
      .sections(d3.selectAll(".trigger")) // pointing to elements that trigger updates
      .graph(d3.select("#shot-chart")) // pointing to chart
      .offset(10) // vertical offset for update
      .on("active", function(i) {
        d3.selectAll(".trigger").style("border", "1pt solid black");
        var selection = d3.select(".graph-scroll-active"); // selection activer trigger element
        selection.style("border", "1pt solid red");

        var selType = selection.attr("value"); // grabbing type of filter as a string from trigger element
        var fnType = window["get" + selType]; // concatenating strings and setting up context to call string as a function

        var selInput = selection.attr("id"); // grabbing filter value as a string from trigger element

        drawPoints(fnType(selInput)); // drawing points with filtered data

       });
});

/*----------------- DRAWING FUNCTIONS */

/* <-- SVG --> */

// SVG drawing function
function drawPoints(data) {
  // SELECTION
  var shots = shotChart.selectAll(".shots")
                       .data(data);

 // ENTER
      shots.enter()
           .append("circle")
           .attr("class", "shots")
           .transition()
           .duration(1500)
           .attr("r", radius)
           .attr("opacity", opacity)
           .attr("fill-opacity", outcomeIndex)
           .attr("cx", function(d) { return d.locx; })
           .attr("cy", function(d) { return d.locy; })
           .attr("fill", function(d) { return outcomeLookup.get(d.shot); })
           .attr("stroke", function(d) { return outcomeLookup.get(d.shot); })
           .attr("stroke-width", 2);

  // UPDATE
      shots.transition()
           .duration(1500)
           .attr("r", radius)

           .attr("cx", function(d) { return d.locx; })
           .attr("cy", function(d) { return d.locy; })
           .attr("fill", function(d) { return outcomeLookup.get(d.shot); })
           .attr("stroke", function(d) { return outcomeLookup.get(d.shot); })
           .attr("stroke-width", 1);

  // EXIT
     shots.exit()
          .transition()
          .duration(1500)
          .attr("r", 0)
          .remove();

};

/* <-- CANVAS --> */

/*----------------- ACCESSORY FUNCTIONS */

// creating sort functions to apply to filters
var sortByPlayer = crossfilter.quicksort.by(function(d) { return d.Player; });
var sortByOutcome = crossfilter.quicksort.by(function(d) { return d.shot; });

// creating filters to update data
function getPlayer(player) {
  teams.filterAll();
  var filter = players.filterExact(player).top(Infinity);
  return sortByOutcome(filter, 0, filter.length);
};

function getTeam(team) {
  players.filterAll();
  var filter = teams.filterExact(team).top(Infinity);
  return sortByPlayer(filter, 0, filter.length);
};

// UNIQUE LIST
// var map = DATASET.map(function(d) { return d.COLUMN })
// var uniqueList = map.filter(function (d, i, a) {
//     return a.indexOf(d) == i;
// });
