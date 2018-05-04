d3.json("https://raw.githubusercontent.com/3milychu/mm-exercise/master/static/data.json", function(json){
    
        Object.keys(json).forEach(function(key) {
        var es = json['economic_stability'];
    });

    console.log(json);

    var es = d3.nest()
      .key(function(d) { return d.es; })
      .rollup(function(v) { return v.length; })
      .object(json);

    console.log(es);

    d3.select("#viz ul")
        .selectAll("li")
        .data(json)
        .enter()
        .append("li")
        .text(function(d) { return d.gender + " : " + d.income_max + " : " + d.income_avg + " : " + d.income_min; });
});