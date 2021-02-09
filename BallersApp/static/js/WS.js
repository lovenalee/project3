// Chart Params
var svgWidth = 960;
var svgHeight = 500;

var margin = { top: 20, right: 40, bottom: 60, left: 50 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import data from an external CSV file
d3.json("api/ws").then(function(wsdata) {
  console.log(wsdata);
  console.log([wsdata]);

    // group the data: I want to draw one line per group
  var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
    .key(function(d) { return d.Rounded_Position;})
    .entries(wsdata);

  // Format the data
  wsdata.forEach(function(data) {
    data.date = data.Year;
    data.ws = +data.WS;
  });
  

  var x = d3.scaleLinear()
    .domain(d3.extent(wsdata, function(d) { return d.Year; }))
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(5));

    // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max(wsdata, function(d) { return +d.WS; })])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));


      // color palette
  var res = sumstat.map(function(d){ return d.key }) // list of group names
  var color = d3.scaleOrdinal()
    .domain(res)
    .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00'])

  // Draw the line
  svg.selectAll(".line")
      .data(sumstat)
      .enter()
      .append("path")
        .attr("fill", "none")
        .attr("stroke", function(d){ return color(d.key) })
        .attr("stroke-width", 1.5)
        .attr("d", function(d){
          return d3.line()
            .x(function(d) { return x(d.Year); })
            .y(function(d) { return y(+d.WS); })
            (d.values)
        })
})
