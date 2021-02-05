d3.json("/api/tStats").then(function(data) {
    console.log(data)
}).catch(function(error){
    console.log(error)});
