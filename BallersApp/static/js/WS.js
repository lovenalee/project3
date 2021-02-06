d3.json("/api/position").then(function(data) {
    console.log(data)

    var WS = data.map(item => item.WS)
    var Player = data.map(item => item.Player)    

}).catch(function(error) {
    console.log(error)
});