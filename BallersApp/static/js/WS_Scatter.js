// Chart Params
var regression;
var svgWidth = 1060;
var svgHeight = 500;

var margin = { top: 70, right: 40, bottom: 60, left: 10 },
    width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom;

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

  // Format the data
  wsdata.forEach(function(data) {
    data.date = data.Year;
    data.ws = +data.WS;
  });
  d3.select("body").append("div").attr("class","tooltip");

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

    // Color scale: give me a specie name, I return a color
  var color = d3.scaleOrdinal()
    .domain(["1", "2", "3", "4", "5" ])
    .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00'])

  var XaxisData = wsdata.map(function(d) { return d.Year; });
  var YaxisData = wsdata.map(function(d) { return d.WS; });
  regression=leastSquaresequation(XaxisData,YaxisData);
  
  
  var line = d3.svg.line
      .x(function(d) { return x(d.Year); })
      .y(function(d) { return y(regression(d.WS)); });

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(wsdata)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.Year); } )
      .attr("cy", function (d) { return y(d.WS); } )
      .attr("r", 5)
      .style("fill", function (d) { return color(d.Rounded_Position) } )

  svg.append("path")
  .datum(wsdata)
  .attr("class", "line")
  .attr("d", line)
  .on("mousemove",function(){
    d3.select(".tooltip").style("left",function(d){return (d3.event.pageX+10)+"px"}).style("top",function(d){ return (d3.event.pageY-50)+"px"});
    d3.select(".tooltip").style("visibility","visible");
    WS=parseFloat(regression(x.invert(d3.event.pageX-svg.node().getBoundingClientRect().left-margin.left))).toFixed(3);
    d3.select(".tooltip").text("WS is "+WS)
    
  })
  .on("mouseout",function(){
      d3.select(".tooltip").style("visibility","hidden");

  });

});

function leastSquaresequation(XaxisData, Yaxisdata) {
  var ReduceAddition = function(prev, cur) { return prev + cur; };
  
  // finding the mean of Xaxis and Yaxis data
  var xBar = XaxisData.reduce(ReduceAddition) * 1.0 / XaxisData.length;
  var yBar = Yaxisdata.reduce(ReduceAddition) * 1.0 / Yaxisdata.length;

  var SquareXX = XaxisData.map(function(d) { return Math.pow(d - xBar, 2); })
    .reduce(ReduceAddition);
  
  var ssYY = Yaxisdata.map(function(d) { return Math.pow(d - yBar, 2); })
    .reduce(ReduceAddition);
    
  var MeanDiffXY = XaxisData.map(function(d, i) { return (d - xBar) * (Yaxisdata[i] - yBar); })
    .reduce(ReduceAddition);
    
  var slope = MeanDiffXY / SquareXX;
  var intercept = yBar - (xBar * slope);
  
// returning regression function
  return function(x){
    return x*slope+intercept
  }

}

