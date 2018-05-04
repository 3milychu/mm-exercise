d3.json("https://raw.githubusercontent.com/3milychu/mm-exercise/master/data.json", function(json){
        
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

    // Group by Economic Stability Class (High, Medium, Low)
    // High = 01 - 10; Medium = 11 - 20; Low = > 20
    var groupByClass= d3.nest()
        .key(function(d) { return d.economic_stability_class; })
        .rollup(function(v) { return v.length; })
        .entries(json);

    console.log(groupByClass);

    d3.select("#viz ul")
        .selectAll("li")
        .data(groupByClass)
        .enter()
        .append("li")
        .text(function(d) { return "Economic Stability Level " + d.key + ": " + d.values});
});