
d3.json("/api/gender-income-spending", function(json){

	json = json;
	console.log(json);

    d3.select("#viz ul")
        .selectAll("li")
        .data(json.data)
        .enter()
        .append("li")
        .text(function(d) { return d.gender + " : " + d.income_max + " : " + d.income_avg + " : " + d.income_min; });
});