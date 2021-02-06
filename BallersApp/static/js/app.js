d3.json("/api/goat").then(function(data) {
    // console.log(data)

    var year = data.map(item => item.year)
    var teams = data.map(item => item.Team)
    var teamPoints = data.map(item => item.TeamPoints)

    

}).catch(function(error) {
    console.log(error)
});

