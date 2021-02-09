// d3.json("http://127.0.0.1:5000/api/tStats").then(function(data) {
//   console.log(data);
// })

// d3.csv("/assets/Team_Stats.csv").then(function(data) {
//   console.log(data)
// })

//===============================================================================

d3.csv('/assets/Team_Stats.csv',function (data) {
  console.log(data)
    // CSV section

      // globaldata = data;
      //   console.log(globaldata);

      // var season = Object.values(data.Seasons);

      var allGroup = d3.map(data, function(d){return(d.Seasons)}).keys();

      // add the options to the button
      d3.select("#selectButton")
      .selectAll('myOptions')
      .data(allGroup)
      .enter()
      .append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button

      var dataFilter = ( data
        .filter(function(d){ return d.Seasons == "2014"})
        .map(function(d){  return +d.Wins; })
      )

      // Listen to the slider?
      d3.select("#selectButton").on("change", function(d){
        selectedGroup = this.value;
        console.log(selectedGroup)
        // updateChart(selectedGroup);
        var dataFilter = data
          .filter(function(d){ return d.Seasons == selectedGroup})
          .map(function(d){  return +d.Wins; });
          console.log(dataFilter);

          //1 filter losses by year
          //2 filter teampoints by yearr

          // //3 clear html
          // body.html("");

          // //4 rebuild chart here
          // buildChart(); //pass in new data here



      })
      
        // function buildChart() {
        var body = d3.select('body')
        var selectData = [ { "text" : "Wins" },
                          { "text" : "Losses" },
                        ]
      
        // Select X-axis Variable
        var span = body.append('span')
          .text('Select X-Axis variable: ')
        var yInput = body.append('select')
            .attr('id','xSelect')
            .on('change',xChange)
          .selectAll('option')
            .data(selectData)
            .enter()
          .append('option')
            .attr('value', function (d) { return d.text })
            .text(function (d) { return d.text ;})
        body.append('br')
      
        // Select Y-axis Variable
        var span = body.append('span')
            .text('Select Y-Axis variable: ')
        var yInput = body.append('select')
            .attr('id','ySelect')
            .on('change',yChange)
          .selectAll('option')
            .data(selectData)
            .enter()
          .append('option')
            .attr('value', function (d) { return d.text })
            .text(function (d) { return d.text ;})
        body.append('br')
      
        // Variables
        var body = d3.select('body')
        var margin = { top: 50, right: 50, bottom: 50, left: 50 }
        var h = 550 - margin.top - margin.bottom
        var w = 550 - margin.left - margin.right
        var formatNumber = d3.format('0')
        // Scales
        var colorScale = d3.scale.category20()
        var xScale = d3.scale.linear()
          .domain([
            d3.min([0,d3.min(data,function (d) { return d['Wins'] })]),
            d3.max([0,d3.max(data,function (d) { return d['Wins'] })])
            ])
          .range([0,w])
        var yScale = d3.scale.linear()
          .domain([
            d3.min([0,d3.min(data,function (d) { return d['Wins'] })]),
            d3.max([0,d3.max(data,function (d) { return d['Wins'] })])
            ])
          .range([h,0])
        // SVG
        var svg = body.append('svg')
            .attr('height',h + margin.top + margin.bottom)
            .attr('width',w + margin.left + margin.right)
          .append('g')
            .attr('transform','translate(' + margin.left + ',' + margin.top + ')')
        // X-axis
        var xAxis = d3.svg.axis()
          .scale(xScale)
          .tickFormat(formatNumber)
          .ticks(10)
          .orient('bottom')
        // Y-axis
        var yAxis = d3.svg.axis()
          .scale(yScale)
          .tickFormat(formatNumber)
          .ticks(10)
          .orient('left')
        // Circles
        var circles = svg.selectAll('circle')
            .data(data)
            .enter()
          .append('circle')
            .attr('cx',function (d) { return xScale(d['Wins']) })
            .attr('cy',function (d) { return yScale(d['Wins']) })
            .attr('r','10')
            .attr('stroke','black')
            .attr('stroke-width',1)
            .attr('fill',function (d,i) { return colorScale(i) })
            .on('mouseover', function () {
              d3.select(this)
                .transition()
                .duration(500)
                .attr('r',20)
                .attr('stroke-width',3)
            })
            .on('mouseout', function () {
              d3.select(this)
                .transition()
                .duration(500)
                .attr('r',10)
                .attr('stroke-width',1)
            })
          .append('title') // Tooltip
            .text(function (d) { return d.TeamName +
                                '\nSeason: ' + formatNumber(d['Seasons']) +
                                '\nWins: ' + formatNumber(d['Wins']) +
                                '\nLosses: ' + formatNumber(d['Losses']) })
        // X-axis
        svg.append('g')
            .attr('class','axis')
            .attr('id','xAxis')
            .attr('transform', 'translate(0,' + h + ')')
            .call(xAxis)
          .append('text') // X-axis Label
            .attr('id','xAxisLabel')
            .attr('y',-10)
            .attr('x',w)
            .attr('dy','.71em')
            .style('text-anchor','end')
            .text('wins')
        // Y-axis
        svg.append('g')
            .attr('class','axis')
            .attr('id','yAxis')
            .call(yAxis)
          .append('text') // y-axis Label
            .attr('id', 'yAxisLabel')
            .attr('transform','rotate(-90)')
            .attr('x',0)
            .attr('y',5)
            .attr('dy','.71em')
            .style('text-anchor','end')
            .text('Wins')
      
        function yChange() {
          var value = this.value // get the new y value
          yScale // change the yScale
            .domain([
              d3.min([0,d3.min(data,function (d) { return d[value] })]),
              d3.max([0,d3.max(data,function (d) { return d[value] })])
              ])
          yAxis.scale(yScale) // change the yScale
          d3.select('#yAxis') // redraw the yAxis
            .transition().duration(1000)
            .call(yAxis)
          d3.select('#yAxisLabel') // change the yAxisLabel
            .text(value)    
          d3.selectAll('circle') // move the circles
            .transition().duration(1000)
            .delay(function (d,i) { return i*100})
              .attr('cy',function (d) { return yScale(d[value]) })
        }
      
        function xChange() {
          var value = this.value // get the new x value
          xScale // change the xScale
            .domain([
              d3.min([0,d3.min(data,function (d) { return d[value] })]),
              d3.max([0,d3.max(data,function (d) { return d[value] })])
              ])
          xAxis.scale(xScale) // change the xScale
          d3.select('#xAxis') // redraw the xAxis
            .transition().duration(1000)
            .call(xAxis)
          d3.select('#xAxisLabel') // change the xAxisLabel
            .transition().duration(1000)
            .text(value)
          d3.selectAll('circle') // move the circles
            .transition().duration(1000)
            .delay(function (d,i) { return i*100})
              .attr('cx',function (d) { return xScale(d[value]) })
        }

      //}

      // rebuildChart(); //double check if data or d object needs to be passed in

      })
  

// ==================================================================================

// function getData(thisvalue) {

//   console.log(thisvalue);

//     var dropdownMenu = d3.select("#selDataset");
//     // Assign the value of the dropdown menu option to a variable
//     var dataset = dropdownMenu.property("value");
//     // Initialize an empty array for the data
  
//     if (dataset === 'season') {
//       //globaldata = globaldata.Seasons;
//       console.log('dataset is season')
//       }
  // };

//===============================================================================