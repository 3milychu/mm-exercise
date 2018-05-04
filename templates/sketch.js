d3.json("https://raw.githubusercontent.com/3milychu/mm-exercise/master/static/data.json", function(json){
        
    json.forEach(function(d) {
        d.economic_stability = d.economic_stability;
    });

    json = json.filter(function(d) { 
        return (d.economic_stability != "economic_stability")});

    console.log(json);

    var es = d3.nest()
        .key(function(d) { return d.economic_stability; })
        .rollup(function(v) { return v.length; })
        .entries(json)
        .sort(function(a,b) {return d3.descending(a.values,b.values);});

    console.log(es);

    d3.select("#viz ul")
        .selectAll("li")
        .data(es)
        .enter()
        .append("li")
        .text(function(d) { return "Economic Stability Level " + d.key + ": " + d.values});
});