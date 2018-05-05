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

    // Filter by Insurance Segments
    seg1= json.filter(function(d) { 
    return d.insurance_segment == "Price Isn't Primary"
    });

    seg2= json.filter(function(d) { 
    return d.insurance_segment == "Solid Suburbans"
    });

    seg3= json.filter(function(d) { 
    return d.insurance_segment == "Stretched Singles"
    });

    seg4= json.filter(function(d) { 
    return d.insurance_segment == "Full House"
    });

    seg5= json.filter(function(d) { 
    return  d.insurance_segment == "The Nest is Empty"
    });

    seg6= json.filter(function(d) { 
    return d.insurance_segment == "Getting By"
    });

    seg7= json.filter(function(d) { 
    return d.insurance_segment == "Hands Full"
    });

    seg8= json.filter(function(d) { 
    return d.insurance_segment == "Country Middles"
    });

    d3.select(".image1").selectAll("img").remove();
    var img1 = Math.floor((Math.random() * seg1.length) + 0);
    var img2 = Math.floor((Math.random() * seg2.length) + 0);
    var img3 = Math.floor((Math.random() * seg3.length) + 0);
    var img4 = Math.floor((Math.random() * seg4.length) + 0);
    var img5 = Math.floor((Math.random() * seg5.length) + 0);
    var img6 = Math.floor((Math.random() * seg6.length) + 0);
    var img7 = Math.floor((Math.random() * seg7.length) + 0);
    var img8 = Math.floor((Math.random() * seg8.length) + 0);

    var img1 = d3.select(".image").selectAll("#image1")
        .data(seg1.filter(function (d, i) { return i === img1;}))
        .enter()
        .append('img')
        .style("width","100%")
        .style("height","100%")
        .style("background-position","center")
        .style("background-size","30%")
        .attr("src",function(d) {return d.path;})
        .attr("class", "target")
        .attr("id", "target1")
        .exit();



    d3.select("#viz ul")
        .selectAll("li")
        .data(groupByClass)
        .enter()
        .append("li")
        .text(function(d) { return "Economic Stability Level " + d.key + ": " + d.values});
});