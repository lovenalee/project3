// SCATTER ============================================================================

// set the dimensions and margins for scatter graph

var margin = {top: 100, right: 10, bottom: 120, left: 55},
    width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg1 = d3.select("#scatter")
  .append("svg")
  .attr("PreserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", "0 0 600 400")
  .classed("svg-content-responive", true)
  .append("g")

    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.json("/api/tStats").then(function(data) {
        console.log(data);
        
  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 90]) //wins
    .range([ 0, width ]);
  svg1.append("g")
    .attr("transform", "translate(0," + height + ")")
    .style("font-size", "14px")
    .call(d3.axisBottom(x));

  // Add X axis label:
  svg1.append("text")
    .attr("text-anchor", "end")
    .attr("x", width/2 + margin.bottom + 10)
    .attr("y", height + margin.top - 120)
    .text("Team Wins by Seasons")
    .style("font-size", "16px");

  // Y axis label:
  svg1.append("text")
  .attr("text-anchor", "end")
  .attr("transform", "rotate(-90)")
  .attr("y", -70)
  .attr("x", -150)
  .text("Teams Points Values")

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 9000])
    .range([ height, 0]);
  svg1.append("g")
    .style("font-size", "16px")
    .call(d3.axisLeft(y));

  svg1.append("text")
    .attr("x", (width / 2))             
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .style("text-decoration", "underline")
    .style("font-size", "18px")  
    .text("2014 to 2018 Team Points and Wins");

  // Color scale for selected seasons
  var NumYears = ["one", "two", "three", "four", "five"]

  var color = d3.scaleOrdinal()
    .domain([NumYears])
    .range([ "red", "orange", "green", "blue", "yellow"])

  // // Handmade legend
  svg1.append("circle").attr("cx",200).attr("cy",130).attr("r", 6).style("fill", "orange")
  svg1.append("circle").attr("cx",200).attr("cy",160).attr("r", 6).style("fill", "green")
  svg1.append("circle").attr("cx",200).attr("cy",190).attr("r", 6).style("fill", "blue")
  svg1.append("circle").attr("cx",200).attr("cy",220).attr("r", 6).style("fill", "yellow")
  svg1.append("circle").attr("cx",200).attr("cy",250).attr("r", 6).style("fill", "red")
  svg1.append("text").attr("x", 220).attr("y", 130).text("2014").style("font-size", "15px").attr("alignment-baseline","middle")
  svg1.append("text").attr("x", 220).attr("y", 160).text("2015").style("font-size", "15px").attr("alignment-baseline","middle")
  svg1.append("text").attr("x", 220).attr("y", 190).text("2016").style("font-size", "15px").attr("alignment-baseline","middle")
  svg1.append("text").attr("x", 220).attr("y", 220).text("2017").style("font-size", "15px").attr("alignment-baseline","middle")
  svg1.append("text").attr("x", 220).attr("y", 250).text("2018").style("font-size", "15px").attr("alignment-baseline","middle")

  // Highlight the season that is hovered
  var highlight = function(d){

    var selected_season = d.Seasons
    var colour_group;

    if (selected_season === 2014) {
      colour_group = "one"
    } else if (selected_season === 2015) {
      colour_group = "two"
    } else if (selected_season === 2016) {
      colour_group = "three"
    } else if (selected_season === 2017) {
      colour_group = "four"
    } else {
      colour_group = "five"
    }
    
    d3.selectAll(".dot")
      .transition()
      .duration(200)
      .style("fill", "grey")
      .attr("r", 3)

    d3.selectAll("." + colour_group)
      .transition()
      .duration(200)
      .style("fill", color(colour_group))
      .attr("r", 7)
  }

  // Highlight the season that is hovered
  var doNotHighlight = function(){
    d3.selectAll(".dot")
      .transition()
      .duration(200)
      .style("fill", "grey")
      .attr("r", 5 )      
  }

  // Add dots
  svg1.append("g")
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("class", function (d) {

        var colour_group;
        
        if (d.Seasons === 2014) {
          colour_group = "one"
        } else if (d.Seasons === 2015) {
          colour_group = "two"
        } else if (d.Seasons === 2016) {
          colour_group = "three"
        } else if (d.Seasons === 2017) {
          colour_group = "four"
        } else {
          colour_group = "five"
        }        

        return "dot " + colour_group } )
      
      .attr("cx", function (d) { return x(d.Wins); } )
      .attr("cy", function (d) { return y(d.Points); } )
      .attr("r", 5)
      .style("fill", function (d) { 
  
        var colour_group;
        
        if (d.Seasons === 2014) {
          colour_group = "one"
        } else if (d.Seasons === 2015) {
          colour_group = "two"
        } else if (d.Seasons === 2016) {
          colour_group = "three"
        } else if (d.Seasons === 2017) {
          colour_group = "four"
        } else {
          colour_group = "five"
        }
        
        return color(colour_group) } )

    .on("mouseover", highlight)
    .on("mouseleave", doNotHighlight )
      .append('title') // Tooltip
        .text(function (d) { return d.TeamName +
                        '\nSeason: ' + (d['Seasons']) +
                        '\nPoints: ' + (d['Points']) +
                        '\nWins: ' + (d['Wins']) })
})

// SCATTERLINE ========================================================================

// set the dimensions and margins for scatter line graph
var margin2 = {top: 100, right: 10, bottom: 120, left: 55},
    width = 600 - margin2.left - margin2.right,
    height = 500 - margin2.top - margin2.bottom;

// append the svg object to the body of the page
var svg2 = d3.select("#scatterLine")
  .append("svg")
     .attr("PreserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", "0 0 600 400")
  .classed("svg-content-responive2", true)
  .append("g")
    .attr("transform",
          "translate(" + margin2.left + "," + margin2.top + ")");

//Read the data
 d3.json("/api/tStats2018").then(function(data) {
    console.log(data)
    // List of groups (here I have one group per column)
    var allGroup = ["Points", "Assists", "FieldGoals", "Rebounds"]

    // add the options to the button
    d3.select("#selectButton")
      .selectAll('myOptions')
      .data(allGroup)
      .enter()
      .append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button

    // Add X axis
    var x = d3.scaleLinear()
      .domain([0,30])
      .range([ 0, width ]);
    svg2.append("g")
      .attr("transform", "translate(0," + height + ")")
      .style("font-size", "16px")
      .call(d3.axisBottom(x));
    
      // Add Y axis
    var y = d3.scaleLinear()
      .domain( [0,4500])
      .range([ height, 0 ]);
    svg2.append("g")
      .call(d3.axisLeft(y))
      .style("font-size", "16px");
  
    // Add X axis label:
    svg2.append("text")
      .attr("text-anchor", "end")
      .attr("x", 350)
      .attr("y", 600)
      .text("Teams")
      //.style("font-size", "20px");

  // Y axis label:
    svg2.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -80)
      .attr("x", -200 )
      .text("Teams Points")
      //.style("font-size", "20px") 

    svg2.append("text")
      .attr("x", (width / 2))             
      .attr("y", 0 - (margin.top / 2))
      .attr("text-anchor", "middle")  
      .style("font-size", "20px") 
      .style("text-decoration", "underline")  
      .text("Team Stats");
    
    // Define the div for the tooltip
    var tooltip = d3.select("#scatterLine")
      .append("div")
      .style("opacity", 0)     
      .attr("class", "tooltip")
      .style("padding", "5px")

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function(d) {
      tooltip
      .data(allGroup)
        .html('\nTeam: ' + (d.Team) +
                      '\nPoints: ' + (d.Points) +
                      '\nAssists: ' + (d.Assists) +
                      '\nField Goals: ' + (d.FieldGoals) +
                      '\nRebounds: ' + (d.Rebounds))            
        .style("opacity", 1)
    }

    var mousemove = function(d) {
      tooltip
      
        .style("left", (d3.mouse(this)[0]+10) + "px")
        .style("top", (d3.mouse(this)[1]) + "px")
    }

    var mouseout = function(d) {
      tooltip
        .style("opacity", 0)
    }

    // Initialize line with first stat
    var line = svg2
      .append('g')
      .append("path")
        .datum(data)
        .attr("d", d3.line()
          .x(function(d) {return x(+d.ID) })
          .y(function(d) {return y(+d.Points) })
        )
        .attr("stroke", "black")
        .style("stroke-width", 3)
        .style("fill", "none")

    // Initialize dots with first stat
    var dot = svg2
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
        .attr("cx", function(d) {return x(+d.ID)})
        .attr("cy", function(d) {return y(+d.Points)})
        .attr("r", 7)
        .style("fill", "royalblue")        
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 3)
        .attr("fill", "white")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseout", mouseout)

    // A function that update the chart
    function update(selectedGroup) {
      // d3.selectAll("svg > *").remove();
      // Create new data with the selection
      var dataFilter = data.map(function(d){return {ID: d.ID, value:d[selectedGroup]}})
      // Give these new data to update line
      line
        .datum(dataFilter)
        .transition()
        .duration(1000)
        .attr("d", d3.line()
          .x(function(d) {return x(+d.ID) })
          .y(function(d) { return y(+d.value)})
          )

      // Give these new data to update dots
      dot
        .data(dataFilter)
        .transition()
        .duration(1000)
          .attr("cx", function(d) { return x(+d.ID) })
          .attr("cy", function(d) { return y(+d.value)})

      console.log(dataFilter)
      }

    // When the button is changed, run the updateChart function
    d3.select("#selectButton").on("change", function(d) {
        // recover the option that has been chosen
        
        var selectedOption = d3.select(this).property("value")
        // run the updateChart function with this selected option
    
        update(selectedOption)
    })

}).catch(function(error) {
  console.log(error);

 
});


