var seg1;
var seg2;
var seg3;
var seg4;
var seg5;
var seg6;
var seg7;
var seg8;
var groupByClass;
var json;

window.onload = function() {
        $("#small-multiples").hide();
        $("#editorial").hide();
}

window.onscroll = function() {scrollState()};

function scrollState() {

    var elmnt = document.getElementById("es");
    var rep = elmnt.offsetTop;
    var elmnt2 = document.getElementById("landing");
    var rep2 = elmnt2.offsetTop;
    var elmnt3 = document.getElementById("signature");
    var rep3 = elmnt3.offsetTop;


    if (window.pageYOffset >= rep2) { 
        $("#small-multiples").show();
        $("#editorial").show();
         $("#get-reclass").hide();
        $(".header").css("background-color", "#002D6E");

    } else if (window.pageYOffset <= elmnt3.offsetHeight){
        $("#small-multiples").hide();
        $("#editorial").hide();
        $("#get-reclass").show();

    } else if (window.pageYOffset <= elmnt2.offsetHeight){
        $(".header").css("background-color", "#002D6E");
        $("#small-multiples").hide();
        $("#editorial").hide();
        $("#get-reclass").show();

    };
};

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

    // Group by Economic Stability Class (High, Medium, Low)
    // High = 01 - 10; Medium = 11 - 20; Low = > 20
    groupByClass= d3.nest()
        .key(function(d) { return d.economic_stability_class; })
        .rollup(function(v) { return v.length; })
        .entries(json);

    console.log(groupByClass);

    formatPercent = d3.format(".0%")

    // Average Income by Economic Reclass
    lowIncome= json.filter(function(d) { 
    return d.economic_stability_class == "Low"
    });

    lowIncomeAvg = d3.mean(lowIncome, function(d) { return d.income; });

    medIncome= json.filter(function(d) { 
    return d.economic_stability_class == "Medium"
    });

    medIncomeAvg = d3.mean(medIncome, function(d) { return d.income; });

    highIncome= json.filter(function(d) { 
    return d.economic_stability_class == "High"
    });

    highIncomeAvg = d3.mean(highIncome, function(d) { return d.income; });

    // Filter by Insurance Segments
    seg1= json.filter(function(d) { 
    return d.insurance_segment_id == 01
    });

    seg2= json.filter(function(d) { 
    return d.insurance_segment_id == 02
    });

    seg3= json.filter(function(d) { 
    return d.insurance_segment_id == 03
    });

    seg4= json.filter(function(d) { 
    return d.insurance_segment_id == 04
    });

    seg5= json.filter(function(d) { 
    return  d.insurance_segment_id == 05
    });

    seg6= json.filter(function(d) { 
    return d.insurance_segment_id == 06
    });

    seg7= json.filter(function(d) { 
    return d.insurance_segment_id == 07
    });

    seg8= json.filter(function(d) { 
    return d.insurance_segment_id == 08
    });

    getCircles();
    getProfiles();
    getArcs();

    document.getElementById("loading").style.display = "none";


});

function getProfiles() {

    // Begin Profile 1

    var seg1Low = seg1.filter(function(d) { 
    return d.economic_stability_class == "Low"
    });

    var percentSeg1Low = seg1Low.length/seg1.length;

    var seg1Medium = seg1.filter(function(d) { 
    return d.economic_stability_class == "Medium"
    });

    var percentSeg1Medium = seg1Medium.length/seg1.length;

    var seg1High = seg1.filter(function(d) { 
    return d.economic_stability_class == "High"
    });

    var percentSeg1High = seg1High.length/seg1.length;

    d3.select(".image1").selectAll("img").remove();

    var img1 = d3.select(".image1").selectAll("#image1")
        .data(seg1.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('img')
        .attr("src",function(d) {return "https://raw.githubusercontent.com/3milychu/mm-exercise/master/assets/img" + d.path;})
    
    var img1 = d3.select(".image1").selectAll("#image1")
        .data(seg1.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('div')
        .attr("class","overlay")
        .attr("id","overlay1")
        .append('h2')
        .text(function(d) { return "Segment " + d.insurance_segment_id;})
        .append('h1')
        .text(function(d) { return d.insurance_segment;})
        .attr("class","segment")
        .append('h3')
        .text("Economic Stability")

    var gauge1 = d3.select(".overlay").selectAll("#overlay1")
        .data(seg1.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('div')
        .attr("class", "gauge")
        .attr("id", "gauge1")

    var low1 = d3.select(".gauge").selectAll("#gauge1")
        .data(seg1.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('div')
        .attr("class", "low")
        .style("width",function(d) { return formatPercent(percentSeg1Low);})
        .append('div')
        .attr("class", "tooltip")
        .attr("id", "tooltip1")
        .append("text")
        .text(function(d) { return "Low: " + formatPercent(percentSeg1Low);})


    var medium1 = d3.select(".gauge").selectAll("#gauge1")
        .data(seg1.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('div')
        .attr("class", "medium")
        .style("width",function(d) { return formatPercent(percentSeg1Medium);} )
        .append('div')
        .attr("class", "tooltip")
        .attr("id", "tooltip2")
        .append("text")
        .text(function(d) { return "Medium: " + formatPercent(percentSeg1Medium);})

    var high1 = d3.select(".gauge").selectAll("#gauge1")
        .data(seg1.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('div')
        .attr("class", "high")
        .style("width",function(d) { return formatPercent(percentSeg1High);} )
        .append('div')
        .attr("class", "tooltip")
        .attr("id", "tooltip3")
        .append("text")
        .text(function(d) { return "High: " + formatPercent(percentSeg1High);})

    var button1 = d3.select(".overlay").selectAll("#overlay1")
        .data(seg1.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('button')
        .attr('onclick',"nextSteps();")
        .text("Deep Dive")

    // End profile 1

    // Begin profile 2

    var seg2Low = seg2.filter(function(d) { 
    return d.economic_stability_class == "Low"
    });

    var percentSeg2Low = seg2Low.length/seg2.length;

    var seg2Medium = seg2.filter(function(d) { 
    return d.economic_stability_class == "Medium"
    });

    var percentSeg2Medium = seg2Medium.length/seg2.length;

    var seg2High = seg2.filter(function(d) { 
    return d.economic_stability_class == "High"
    });

    var percentSeg2High = seg2High.length/seg2.length;
    
    d3.select(".image2").selectAll("img").remove();
    var img2 = d3.select(".image2").selectAll("#image2")
        .data(seg2.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('img')
        .attr("src",function(d) {return "https://raw.githubusercontent.com/3milychu/mm-exercise/master/assets/img" + d.path;})
    
    var img2 = d3.select(".image2").selectAll("#image2")
        .data(seg2.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('div')
        .attr("class","overlay2")
        .attr("id","overlay2")
        .append('h2')
        .text(function(d) { return "Segment " + d.insurance_segment_id;})
        .append('h1')
        .text(function(d) { return d.insurance_segment;})
        .attr("class","segment")
        .append('h3')
        .text("Economic Stability")

    var gauge2 = d3.select(".overlay2").selectAll("#overlay2")
        .data(seg2.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('div')
        .attr("class", "gauge2")
        .attr("id", "gauge2")

    var low1 = d3.select(".gauge2").selectAll("#gauge2")
        .data(seg2.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('div')
        .attr("class", "low")
        .style("width",function(d) { return formatPercent(percentSeg2Low);})
        .append('div')
        .attr("class", "tooltip")
        .attr("id", "tooltip4")
        .style("margin-left", "10%")
        .append("text")
        .text(function(d) { return "Low: " + formatPercent(percentSeg2Low);})

    var medium2 = d3.select(".gauge2").selectAll("#gauge2")
        .data(seg2.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('div')
        .attr("class", "medium")
        .style("width",function(d) { return formatPercent(percentSeg2Medium);} )
        .append('div')
        .attr("class", "tooltip")
        .attr("id", "tooltip5")
        .style("margin-left", "-15%")
        .append("text")
        .text(function(d) { return "Medium: " + formatPercent(percentSeg2Medium);})

    var high2 = d3.select(".gauge2").selectAll("#gauge2")
        .data(seg2.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('div')
        .attr("class", "high")
        .style("width",function(d) { return formatPercent(percentSeg2High);} )
        .append('div')
        .attr("class", "tooltip")
        .attr("id", "tooltip6")
        .style("margin-left", "-15%")
        .append("text")
        .text(function(d) { return "High: " + formatPercent(percentSeg2High);})

    var button2 = d3.select(".overlay2").selectAll("#overlay2")
        .data(seg2.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('button')
        .attr('onclick',"nextSteps();")
        .text("Deep Dive")

    // End profile 2

    // Begin profile 3

    var seg3Low = seg3.filter(function(d) { 
    return d.economic_stability_class == "Low"
    });

    var percentSeg3Low = seg3Low.length/seg3.length;

    var seg3Medium = seg3.filter(function(d) { 
    return d.economic_stability_class == "Medium"
    });

    var percentSeg3Medium = seg3Medium.length/seg3.length;

    var seg3High = seg3.filter(function(d) { 
    return d.economic_stability_class == "High"
    });

    var percentSeg3High = seg3High.length/seg3.length;

    d3.select(".image3").selectAll("img").remove();
    var img2 = d3.select(".image3").selectAll("#image3")
        .data(seg3.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('img')
        .attr("src",function(d) {return "https://raw.githubusercontent.com/3milychu/mm-exercise/master/assets/img" + d.path;})

     var img3 = d3.select(".image3").selectAll("#image3")
            .data(seg3.filter(function (d, i) { return i === 0;}))
            .enter()
            .append('div')
            .attr("class","overlay3")
            .attr("id","overlay3")
            .append('h2')
            .text(function(d) { return "Segment " + d.insurance_segment_id;})
            .append('h1')
            .text(function(d) { return d.insurance_segment;})
            .attr("class","segment")
            .append('h3')
        .text("Economic Stability")

    var gauge3 = d3.select(".overlay3").selectAll("#overlay3")
        .data(seg3.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('div')
        .attr("class", "gauge3")
        .attr("id", "gauge3")

    var low3 = d3.select(".gauge3").selectAll("#gauge3")
        .data(seg3.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('div')
        .attr("class", "low")
        .style("width",function(d) { return formatPercent(percentSeg3Low);})
        .append('div')
        .attr("class", "tooltip")
        .attr("id", "tooltip7")
        .append("text")
        .text(function(d) { return "Low: " + formatPercent(percentSeg3Low);})

    var medium3 = d3.select(".gauge3").selectAll("#gauge3")
        .data(seg3.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('div')
        .attr("class", "medium")
        .style("width",function(d) { return formatPercent(percentSeg3Medium);} )
        .append('div')
        .attr("class", "tooltip")
        .attr("id", "tooltip8")
        .append("text")
        .text(function(d) { return "Medium: " + formatPercent(percentSeg3Medium);})

    var high3 = d3.select(".gauge3").selectAll("#gauge3")
        .data(seg3.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('div')
        .attr("class", "high")
        .style("width",function(d) { return formatPercent(percentSeg3High);} )
        .append('div')
        .attr("class", "tooltip")
        .attr("id", "tooltip9")
        .append("text")
        .text(function(d) { return "High: " + formatPercent(percentSeg3High);})

    var button3 = d3.select(".overlay3").selectAll("#overlay3")
        .data(seg3.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('button')
        .attr('onclick',"nextSteps();")
        .text("Deep Dive")

    // End profile 3

    // Begin prfile 4
    var seg4Low = seg4.filter(function(d) { 
    return d.economic_stability_class == "Low"
    });

    var percentSeg4Low = seg4Low.length/seg4.length;

    var seg4Medium = seg4.filter(function(d) { 
    return d.economic_stability_class == "Medium"
    });

    var percentSeg4Medium = seg4Medium.length/seg4.length;

    var seg4High = seg4.filter(function(d) { 
    return d.economic_stability_class == "High"
    });

    var percentSeg4High = seg4High.length/seg4.length;

    d3.select(".image4").selectAll("img").remove();
    var img2 = d3.select(".image4").selectAll("#image4")
        .data(seg4.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('img')
        .attr("src",function(d) {return "https://raw.githubusercontent.com/3milychu/mm-exercise/master/assets/img" + d.path;})

     var img4 = d3.select(".image4").selectAll("#image4")
            .data(seg4.filter(function (d, i) { return i === 0;}))
            .enter()
            .append('div')
            .attr("class","overlay4")
            .attr("id","overlay4")
            .append('h2')
            .text(function(d) { return "Segment " + d.insurance_segment_id;})
            .append('h1')
            .text(function(d) { return d.insurance_segment;})
            .attr("class","segment")
            .append('h3')
        .text("Economic Stability")

    var gauge4 = d3.select(".overlay4").selectAll("#overlay4")
        .data(seg4.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('div')
        .attr("class", "gauge4")
        .attr("id", "gauge4")

    var low4 = d3.select(".gauge4").selectAll("#gauge4")
        .data(seg4.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('div')
        .attr("class", "low")
        .style("width",function(d) { return formatPercent(percentSeg4Low);})
        .append('div')
        .attr("class", "tooltip")
        .attr("id", "tooltip10")
        .append("text")
        .text(function(d) { return "Low: " + formatPercent(percentSeg4Low);})

    var medium4 = d3.select(".gauge4").selectAll("#gauge4")
        .data(seg4.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('div')
        .attr("class", "medium")
        .style("width",function(d) { return formatPercent(percentSeg4Medium);} )
        .append('div')
        .attr("class", "tooltip")
        .attr("id", "tooltip11")
        .append("text")
        .text(function(d) { return "Medium: " + formatPercent(percentSeg4Medium);})

    var high4 = d3.select(".gauge4").selectAll("#gauge4")
        .data(seg4.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('div')
        .attr("class", "high")
        .style("width",function(d) { return formatPercent(percentSeg4High);} )
        .append('div')
        .attr("class", "tooltip")
        .attr("id", "tooltip12")
        .append("text")
        .text(function(d) { return "High: " + formatPercent(percentSeg4High);})

    var button4 = d3.select(".overlay4").selectAll("#overlay4")
        .data(seg4.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('button')
        .attr('onclick',"nextSteps();")
        .text("Deep Dive")

    // End profile 4

    // Begin profile 5
    var seg5Low = seg5.filter(function(d) { 
    return d.economic_stability_class == "Low"
    });

    var percentSeg5Low = seg5Low.length/seg5.length;

    var seg5Medium = seg5.filter(function(d) { 
    return d.economic_stability_class == "Medium"
    });

    var percentSeg5Medium = seg5Medium.length/seg5.length;

    var seg5High = seg5.filter(function(d) { 
    return d.economic_stability_class == "High"
    });

    var percentSeg5High = seg5High.length/seg5.length;

    d3.select(".image5").selectAll("img").remove();
    var img2 = d3.select(".image5").selectAll("#image5")
        .data(seg5.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('img')
        .attr("src",function(d) {return "https://raw.githubusercontent.com/3milychu/mm-exercise/master/assets/img" + d.path;})

     var img5 = d3.select(".image5").selectAll("#image5")
            .data(seg5.filter(function (d, i) { return i === 0;}))
            .enter()
            .append('div')
            .attr("class","overlay5")
            .attr("id","overlay5")
            .append('h2')
            .text(function(d) { return "Segment " + d.insurance_segment_id;})
            .append('h1')
            .text(function(d) { return d.insurance_segment;})
            .attr("class","segment")
            .append('h3')
        .text("Economic Stability")

    var gauge5 = d3.select(".overlay5").selectAll("#overlay5")
        .data(seg5.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('div')
        .attr("class", "gauge5")
        .attr("id", "gauge5")

    var low5 = d3.select(".gauge5").selectAll("#gauge5")
        .data(seg5.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('div')
        .attr("class", "low")
        .style("width",function(d) { return formatPercent(percentSeg5Low);})
        .append('div')
        .attr("class", "tooltip")
        .attr("id", "tooltip13")
        .append("text")
        .text(function(d) { return "Low: " + formatPercent(percentSeg5Low);})

    var medium5 = d3.select(".gauge5").selectAll("#gauge5")
        .data(seg5.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('div')
        .attr("class", "medium")
        .style("width",function(d) { return formatPercent(percentSeg5Medium);} )
        .append('div')
        .attr("class", "tooltip")
        .attr("id", "tooltip14")
        .append("text")
        .text(function(d) { return "Medium: " + formatPercent(percentSeg5Medium);})

    var high5 = d3.select(".gauge5").selectAll("#gauge5")
        .data(seg5.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('div')
        .attr("class", "high")
        .style("width",function(d) { return formatPercent(percentSeg5High);} )
        .append('div')
        .attr("class", "tooltip")
        .attr("id", "tooltip15")
        .style("margin-left", "-15%")
        .append("text")
        .text(function(d) { return "High: " + formatPercent(percentSeg5High);})

    var button5 = d3.select(".overlay5").selectAll("#overlay5")
        .data(seg5.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('button')
        .attr('onclick',"nextSteps();")
        .text("Deep Dive")

    // End profile 5
    // Begin profile 6
    var seg6Low = seg6.filter(function(d) { 
    return d.economic_stability_class == "Low"
    });

    var percentSeg6Low = seg6Low.length/seg6.length;

    var seg6Medium = seg6.filter(function(d) { 
    return d.economic_stability_class == "Medium"
    });

    var percentSeg6Medium = seg6Medium.length/seg6.length;

    var seg6High = seg6.filter(function(d) { 
    return d.economic_stability_class == "High"
    });

    var percentSeg6High = seg6High.length/seg6.length;

    d3.select(".image6").selectAll("img").remove();
    var img2 = d3.select(".image6").selectAll("#image6")
        .data(seg6.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('img')
        .attr("src",function(d) {return "https://raw.githubusercontent.com/3milychu/mm-exercise/master/assets/img" + d.path;})


     var img6 = d3.select(".image6").selectAll("#image6")
            .data(seg6.filter(function (d, i) { return i === 0;}))
            .enter()
            .append('div')
            .attr("class","overlay6")
            .attr("id","overlay6")
            .append('h2')
            .text(function(d) { return "Segment " + d.insurance_segment_id;})
            .append('h1')
            .text(function(d) { return d.insurance_segment;})
            .attr("class","segment")
            .append('h3')
        .text("Economic Stability")

    var gauge6 = d3.select(".overlay6").selectAll("#overlay6")
        .data(seg6.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('div')
        .attr("class", "gauge6")
        .attr("id", "gauge6")

    var low6 = d3.select(".gauge6").selectAll("#gauge6")
        .data(seg6.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('div')
        .attr("class", "low")
        .style("width",function(d) { return formatPercent(percentSeg6Low);})
        .append('div')
        .attr("class", "tooltip")
        .attr("id", "tooltip16")
        .append("text")
        .text(function(d) { return "Low: " + formatPercent(percentSeg6Low);})

    var medium6 = d3.select(".gauge6").selectAll("#gauge6")
        .data(seg6.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('div')
        .attr("class", "medium")
        .style("width",function(d) { return formatPercent(percentSeg6Medium);} )
        .append('div')
        .attr("class", "tooltip")
        .attr("id", "tooltip17")
        .append("text")
        .text(function(d) { return "Medium: " + formatPercent(percentSeg6Medium);})

    var high6 = d3.select(".gauge6").selectAll("#gauge6")
        .data(seg6.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('div')
        .attr("class", "high")
        .style("width",function(d) { return formatPercent(percentSeg6High);} )
        .append('div')
        .attr("class", "tooltip")
        .attr("id", "tooltip18")
        .append("text")
        .text(function(d) { return "High: " + formatPercent(percentSeg6High);})

    var button6 = d3.select(".overlay6").selectAll("#overlay6")
        .data(seg6.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('button')
        .attr('onclick',"nextSteps();")
        .text("Deep Dive")
    // End profile 6
    // Begin profile 7
    var seg7Low = seg7.filter(function(d) { 
    return d.economic_stability_class == "Low"
    });

    var percentSeg7Low = seg7Low.length/seg7.length;

    var seg7Medium = seg7.filter(function(d) { 
    return d.economic_stability_class == "Medium"
    });

    var percentSeg7Medium = seg7Medium.length/seg7.length;

    var seg7High = seg7.filter(function(d) { 
    return d.economic_stability_class == "High"
    });

    var percentSeg7High = seg7High.length/seg7.length;

    d3.select(".image7").selectAll("img").remove();
    var img2 = d3.select(".image7").selectAll("#image7")
        .data(seg7.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('img')
        .attr("src",function(d) {return "https://raw.githubusercontent.com/3milychu/mm-exercise/master/assets/img" + d.path;})

     var img7 = d3.select(".image7").selectAll("#image7")
            .data(seg7.filter(function (d, i) { return i === 0;}))
            .enter()
            .append('div')
            .attr("class","overlay7")
            .attr("id","overlay7")
            .append('h2')
            .text(function(d) { return "Segment " + d.insurance_segment_id;})
            .append('h1')
            .text(function(d) { return d.insurance_segment;})
            .attr("class","segment")
            .append('h3')
        .text("Economic Stability")

    var gauge7 = d3.select(".overlay7").selectAll("#overlay7")
        .data(seg7.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('div')
        .attr("class", "gauge7")
        .attr("id", "gauge7")

    var low7 = d3.select(".gauge7").selectAll("#gauge7")
        .data(seg7.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('div')
        .attr("class", "low")
        .style("width",function(d) { return formatPercent(percentSeg7Low);})
        .append('div')
        .attr("class", "tooltip")
        .attr("id", "tooltip19")
        .append("text")
        .text(function(d) { return "Low: " + formatPercent(percentSeg7Low);})

    var medium7 = d3.select(".gauge7").selectAll("#gauge7")
        .data(seg7.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('div')
        .attr("class", "medium")
        .style("width",function(d) { return formatPercent(percentSeg7Medium);} )
        .append('div')
        .attr("class", "tooltip")
        .attr("id", "tooltip20")
        .append("text")
        .text(function(d) { return "Medium: " + formatPercent(percentSeg7Medium);})

    var high7 = d3.select(".gauge7").selectAll("#gauge7")
        .data(seg7.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('div')
        .attr("class", "high")
        .style("width",function(d) { return formatPercent(percentSeg7High);} )
        .append('div')
        .attr("class", "tooltip")
        .attr("id", "tooltip21")
        .append("text")
        .text(function(d) { return "High: " + formatPercent(percentSeg7High);})

    var button7 = d3.select(".overlay7").selectAll("#overlay7")
        .data(seg7.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('button')
        .attr('onclick',"nextSteps();")
        .text("Deep Dive")
    // End profile 7
    // Begin profile 8
    var seg8Low = seg8.filter(function(d) { 
    return d.economic_stability_class == "Low"
    });

    var percentSeg8Low = seg8Low.length/seg8.length;

    var seg8Medium = seg8.filter(function(d) { 
    return d.economic_stability_class == "Medium"
    });

    var percentSeg8Medium = seg8Medium.length/seg8.length;

    var seg8High = seg8.filter(function(d) { 
    return d.economic_stability_class == "High"
    });

    var percentSeg8High = seg8High.length/seg8.length;

    d3.select(".image8").selectAll("img").remove();
    var img2 = d3.select(".image8").selectAll("#image8")
        .data(seg8.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('img')
        .attr("src",function(d) {return "https://raw.githubusercontent.com/3milychu/mm-exercise/master/assets/img" + d.path;})
     var img8 = d3.select(".image8").selectAll("#image8")
            .data(seg8.filter(function (d, i) { return i === 0;}))
            .enter()
            .append('div')
            .attr("class","overlay8")
            .attr("id","overlay8")
            .append('h2')
            .text(function(d) { return "Segment " + d.insurance_segment_id;})
            .append('h1')
            .text(function(d) { return d.insurance_segment;})
            .attr("class","segment")
            .append('h3')
        .text("Economic Stability")

    var gauge8 = d3.select(".overlay8").selectAll("#overlay8")
        .data(seg8.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('div')
        .attr("class", "gauge8")
        .attr("id", "gauge8")

    var low8 = d3.select(".gauge8").selectAll("#gauge8")
        .data(seg8.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('div')
        .attr("class", "low")
        .style("width",function(d) { return formatPercent(percentSeg8Low);})
        .append('div')
        .attr("class", "tooltip")
        .attr("id", "tooltip22")
        .append("text")
        .text(function(d) { return "Low: " + formatPercent(percentSeg8Low);})

    var medium8 = d3.select(".gauge8").selectAll("#gauge8")
        .data(seg8.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('div')
        .attr("class", "medium")
        .style("width",function(d) { return formatPercent(percentSeg8Medium);} )
        .append('div')
        .attr("class", "tooltip")
        .attr("id", "tooltip23")
        .append("text")
        .text(function(d) { return "Medium: " + formatPercent(percentSeg8Medium);})

    var high8 = d3.select(".gauge8").selectAll("#gauge8")
        .data(seg8.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('div')
        .attr("class", "high")
        .style("width",function(d) { return formatPercent(percentSeg8High);} )
        .append('div')
        .attr("class", "tooltip")
        .attr("id", "tooltip24")
        .append("text")
        .text(function(d) { return "High: " + formatPercent(percentSeg8High);})

    var button8 = d3.select(".overlay8").selectAll("#overlay8")
        .data(seg8.filter(function (d, i) { return i === 0;}))
        .enter()
        .append('button')
        .attr('onclick',"nextSteps();")
        .text("Deep Dive")
}

function smallMultiples() {
    for (i=1;i<9;i++){
    document.getElementById("overlay"+[i]).style.opacity="0.9";
    }
}

function editorial() {
    for (i=1;i<9;i++){
    document.getElementById("overlay"+[i]).style.opacity="";
    }
}

function nextSteps() {
    document.getElementById("next-steps").style.display = "inline";
}

function closeNextSteps() {
    document.getElementById("next-steps").style.display = "none";
}


function reclassInfo() {
    document.getElementById("reclass").style.display = "inline";
}

function closeReclassInfo() {
    document.getElementById("reclass").style.display = "none";
}

function getCircles() {
    d3.select("svg").remove();

    d3.json("https://raw.githubusercontent.com/3milychu/mm-exercise/master/static/data.json", function(json){

    var totalRadius=Math.sqrt(json.length/Math.PI)
    var lowCircleR = (groupByClass[0].value/json.length)*totalRadius;
    console.log(lowCircleR);
    var highCircleR = (groupByClass[1].value/json.length)*totalRadius;
    console.log(highCircleR);
    var mediumCircleR = (groupByClass[2].value/json.length)*totalRadius;
    console.log(mediumCircleR);

    lowF= json.filter(function(d) { 
    return (d.economic_stability_class == "Low") & (d.gender == "F")
    });
    lowM= json.filter(function(d) { 
    return (d.economic_stability_class == "Low") & (d.gender == "M")
    });
    medF= json.filter(function(d) { 
    return (d.economic_stability_class == "Medium") & (d.gender == "F")
    });
    medM= json.filter(function(d) { 
    return (d.economic_stability_class == "Medium") & (d.gender == "M")
    });
    highF= json.filter(function(d) { 
    return (d.economic_stability_class == "High") & (d.gender == "F")
    });
    highM= json.filter(function(d) { 
    return (d.economic_stability_class == "High") & (d.gender == "M")
    });

    var esCircles = [
    {"radius": "0", "color" : "#064BA3", "x_axis": ".48", "y_axis": ".55", "label": "Book of Business", 
    "percent": groupByClass[1].value , "movex": ".47", "movey": ".53", "begRadius": totalRadius, "opacity":"1"},
    {"radius": lowCircleR, "color" : "#81BEDB", "x_axis": ".48", "y_axis": ".5", "label": "", 
    "percent": groupByClass[0].value, "movex": ".18", "movey": ".5","begRadius": "0", "opacity": "1"},
    {"radius": highCircleR, "color" : "#04316A" , "x_axis": ".48", "y_axis": ".5", "label": "", 
    "percent": groupByClass[1].value , "movex": ".47", "movey": ".5","begRadius": "0", "opacity": "1"},
    {"radius": mediumCircleR, "color" : "#199CDB", "x_axis": ".48", "y_axis": ".5", "label": "", 
    "percent": groupByClass[2].value , "movex": ".78", "movey": ".5", "begRadius": "0", "opacity": "1"}
    
    ];

    var svg = d3.select("#vis").append("svg")
        .attr("width", "100%")
        .attr("height", "50vh");

    var elem = svg.selectAll("g")
        .data(esCircles)

    /*Create and place the "blocks" containing the circle and the text */  
    var elemEnter = elem.enter()
        .append("g")
        .attr("class", "node")

    /*Create the circle for each block */
    var circle = elemEnter.append("circle")
        .attr("r", function(d){return d.begRadius} )
        .attr("cx", function (d) { return formatPercent(d.x_axis); })
        .attr("cy", function (d) { return formatPercent(d.y_axis); })
        .attr("id", function (d) { return d.label; })
        .style("fill", function(d) { return d.color; })
        // .style("cursor", "pointer")

    var text = elemEnter.append("text")
        .text(function (d) { return d.label; })
        .attr("dx", function (d) { return formatPercent(.415); })
        .attr("dy", function (d) { return formatPercent(d.y_axis); })
        .attr("fill", "white")
        .attr("id", "bob-label")

    var node = svg.selectAll("circle");

    formatDecimal = d3.format(".2s");
    formatMoney = d3.format("($,.2r");

    var t = d3.transition()
    .duration(2000)
    .ease(d3.easeBack);

    function play() {
        d3.selectAll("circle")
        .transition(t)
        .attr("cx", function (d) { return formatPercent(d.movex); })
        .attr("cy", function (d) { return formatPercent(d.movey); })
        .attr("r", function(d){return d.radius} )
        .style("opacity", function(d){return d.opacity} ) 

    };

    function showText() {

        d3.select(".details").attr("margin-top:-8%")
        d3.select("#section1-title").html("Low: " + formatPercent(groupByClass[0].value/json.length)); 
        d3.select("#section1-percent").html("Females: <em>" + formatPercent(lowF.length/groupByClass[0].value) +
        "</em><br> Males: <em>" + formatPercent(lowM.length/groupByClass[0].value) + "</em><br>"
        + "Average Income: <em>" + formatMoney(lowIncomeAvg*1000)+ "</em>"); 
        d3.select("#section2-title").html("High: " + formatPercent(groupByClass[1].value/json.length)); 
        d3.select("#section2-percent").html("Females: <em>" + formatPercent(highF.length/groupByClass[1].value)+
        "</em><br> Males: <em>" + formatPercent(highM.length/groupByClass[1].value) + "</em><br>"
        + "Average Income: <em>" + formatMoney(highIncomeAvg*1000)+ "</em>"); 
        d3.select("#section3-title").html("Medium: " + formatPercent(groupByClass[2].value/json.length)); 
        d3.select("#section3-percent").html("Females: <em>" + formatPercent(medF.length/groupByClass[2].value)+
        "</em><br> Males: <em>" + formatPercent(medM.length/groupByClass[2].value) + "</em><br>"
        + "Average Income: <em>" + formatMoney(medIncomeAvg*1000)+ "</em>"); 
    }

    play();

     $("#bob-label").delay(500).slideUp(100)


    setTimeout(
      function() 
      {
        showText();
      }, 2000);

    var setEvents = circle
    .on( 'click', function() {
      // d3.selectAll("circle")
      // .transition(t)
      // .attr("cx", function (d) { return formatPercent(d.x_axis - d.movex); })
      // .attr("cy", function (d) { return formatPercent(d.y_axis - d.movey); }) 
    })

    .on( 'mouseenter', function() {
    // select element in current context
    d3.select( this )
      // .transition()
      // .attr("r",  function(d){return d.radius + 10})
    })
    // set back
    .on( 'mouseleave', function() {
    d3.select( this )
      // .transition()
      // .attr("r",  function(d){return d.radius})
    });

    });
}

function replay () {
    d3.select(".details").attr("margin-top:-5%")
    d3.select("#section1-title").html(""); 
    d3.select("#section1-percent").html(""); 
    d3.select("#section2-title").html(""); 
    d3.select("#section2-percent").html(""); 
    d3.select("#section3-title").html(""); 
    d3.select("#section3-percent").html(""); 
    d3.select("svg").selectAll("circle").remove();
    getCircles();
}

function getArcs() {

    total=100000;

    // Seg 1 % of BOB
    var seg1svg = d3.select(".overlay")
    .append("svg")
    .attr("width", 100)
    .attr("height", 100)
    .attr("id", "seg1bob")
    .attr("cursor", "pointer")
    .append("g")
    .attr("transform", "translate(60,30)");

    var arc1bg = d3.arc()
        .innerRadius(18)
        .outerRadius(20)
        .startAngle(0)
        .endAngle(360*Math.PI/180);

    var arc1 = d3.arc()
        .innerRadius(16)
        .outerRadius(22)
        .startAngle(0)
        .endAngle((seg1.length/total*360)*Math.PI/180);

    seg1svg.append("path")
        .attr("class", "arc-bg")
        .attr("d", arc1bg);

    seg1svg.append("path")
        .attr("class", "arc")
        .attr("id", "arc1")
        .attr("d", arc1);

    seg1svg.append("text")
        .attr("dx", -10)
        .attr("dy", 5)
        .attr("id", "percent-bob")
        .text(formatPercent(seg1.length/total));

    seg1svg.append("text")
        .attr("id", "percent-bob-label")
        .attr("dx", -30)
        .attr("dy", 45)
        .text("% of BOB");


        // Seg 2 % of BOB
    var seg2svg = d3.select(".overlay2")
    .append("svg")
    .attr("width", 100)
    .attr("height", 100)
    .attr("id", "seg2bob")
    .attr("cursor", "pointer")
    .append("g")
    .attr("transform", "translate(60,30)");

    var arc2bg = d3.arc()
        .innerRadius(18)
        .outerRadius(20)
        .startAngle(0)
        .endAngle(360*Math.PI/180);

    var arc2 = d3.arc()
        .innerRadius(16)
        .outerRadius(22)
        .startAngle(0)
        .endAngle((seg2.length/total*360)*Math.PI/180);

    seg2svg.append("path")
        .attr("class", "arc-bg")
        .attr("d", arc2bg);

    seg2svg.append("path")
        .attr("class", "arc")
        .attr("id", "arc2")
        .attr("d", arc2);

    seg2svg.append("text")
        .attr("dx", -10)
        .attr("dy", 5)
        .attr("id", "percent-bob2")
        .text(formatPercent(seg2.length/total));

    seg2svg.append("text")
        .attr("id", "percent-bob-label2")
        .attr("dx", -30)
        .attr("dy", 45)
        .text("% of BOB");


    // Seg 3 % of BOB
    var seg3svg = d3.select(".overlay3")
    .append("svg")
    .attr("width", 100)
    .attr("height", 100)
    .attr("id", "seg3bob")
    .attr("cursor", "pointer")
    .append("g")
    .attr("transform", "translate(60,30)");

    var arc3bg = d3.arc()
        .innerRadius(18)
        .outerRadius(20)
        .startAngle(0)
        .endAngle(360*Math.PI/180);

    var arc3 = d3.arc()
        .innerRadius(16)
        .outerRadius(22)
        .startAngle(0)
        .endAngle((seg3.length/total*360)*Math.PI/180);

    seg3svg.append("path")
        .attr("class", "arc-bg")
        .attr("d", arc3bg);

    seg3svg.append("path")
        .attr("class", "arc")
        .attr("id", "arc3")
        .attr("d", arc3);

    seg3svg.append("text")
        .attr("dx", -10)
        .attr("dy", 5)
        .attr("id", "percent-bob3")
        .text(formatPercent(seg3.length/total));

    seg3svg.append("text")
        .attr("id", "percent-bob-label3")
        .attr("dx", -30)
        .attr("dy", 45)
        .text("% of BOB");


    // Seg 4 % of BOB
    var seg4svg = d3.select(".overlay4")
    .append("svg")
    .attr("width", 100)
    .attr("height", 100)
    .attr("id", "seg4bob")
    .attr("cursor", "pointer")
    .append("g")
    .attr("transform", "translate(60,30)");

    var arc4bg = d3.arc()
        .innerRadius(18)
        .outerRadius(20)
        .startAngle(0)
        .endAngle(360*Math.PI/180);

    var arc4 = d3.arc()
        .innerRadius(16)
        .outerRadius(22)
        .startAngle(0)
        .endAngle((seg4.length/total*360)*Math.PI/180);

    seg4svg.append("path")
        .attr("class", "arc-bg")
        .attr("d", arc4bg);

    seg4svg.append("path")
        .attr("class", "arc")
        .attr("id", "arc4")
        .attr("d", arc4);

    seg4svg.append("text")
        .attr("dx", -10)
        .attr("dy", 5)
        .attr("id", "percent-bob4")
        .text(formatPercent(seg4.length/total));

    seg4svg.append("text")
        .attr("id", "percent-bob-label4")
        .attr("dx", -30)
        .attr("dy", 45)
        .text("% of BOB");

 // Seg 5 % of BOB
    var seg5svg = d3.select(".overlay5")
    .append("svg")
    .attr("width", 100)
    .attr("height", 100)
    .attr("id", "seg5bob")
    .attr("cursor", "pointer")
    .append("g")
    .attr("transform", "translate(60,30)");

    var arc5bg = d3.arc()
        .innerRadius(18)
        .outerRadius(20)
        .startAngle(0)
        .endAngle(360*Math.PI/180);

    var arc5 = d3.arc()
        .innerRadius(16)
        .outerRadius(22)
        .startAngle(0)
        .endAngle((seg5.length/total*360)*Math.PI/180);

    seg5svg.append("path")
        .attr("class", "arc-bg")
        .attr("d", arc5bg);

    seg5svg.append("path")
        .attr("class", "arc")
        .attr("id", "arc5")
        .attr("d", arc5);

    seg5svg.append("text")
        .attr("dx", -10)
        .attr("dy", 5)
        .attr("id", "percent-bob5")
        .text(formatPercent(seg5.length/total));

    seg5svg.append("text")
        .attr("id", "percent-bob-label5")
        .attr("dx", -30)
        .attr("dy", 45)
        .text("% of BOB");


 // Seg 6 % of BOB
    var seg6svg = d3.select(".overlay6")
    .append("svg")
    .attr("width", 100)
    .attr("height", 100)
    .attr("id", "seg6bob")
    .attr("cursor", "pointer")
    .append("g")
    .attr("transform", "translate(60,30)");

    var arc6bg = d3.arc()
        .innerRadius(18)
        .outerRadius(20)
        .startAngle(0)
        .endAngle(360*Math.PI/180);

    var arc6 = d3.arc()
        .innerRadius(16)
        .outerRadius(22)
        .startAngle(0)
        .endAngle((seg6.length/total*360)*Math.PI/180);

    seg6svg.append("path")
        .attr("class", "arc-bg")
        .attr("d", arc6bg);

    seg6svg.append("path")
        .attr("class", "arc")
        .attr("id", "arc6")
        .attr("d", arc6);

    seg6svg.append("text")
        .attr("dx", -10)
        .attr("dy", 5)
        .attr("id", "percent-bob6")
        .text(formatPercent(seg6.length/total));

    seg6svg.append("text")
        .attr("id", "percent-bob-label6")
        .attr("dx", -30)
        .attr("dy", 45)
        .text("% of BOB");


 // Seg 7 % of BOB
    var seg7svg = d3.select(".overlay7")
    .append("svg")
    .attr("width", 100)
    .attr("height", 100)
    .attr("id", "seg7bob")
    .attr("cursor", "pointer")
    .append("g")
    .attr("transform", "translate(60,30)");

    var arc7bg = d3.arc()
        .innerRadius(18)
        .outerRadius(20)
        .startAngle(0)
        .endAngle(360*Math.PI/180);

    var arc7 = d3.arc()
        .innerRadius(16)
        .outerRadius(22)
        .startAngle(0)
        .endAngle((seg7.length/total*360)*Math.PI/180);

    seg7svg.append("path")
        .attr("class", "arc-bg")
        .attr("d", arc7bg);

    seg7svg.append("path")
        .attr("class", "arc")
        .attr("id", "arc7")
        .attr("d", arc7);

    seg7svg.append("text")
        .attr("dx", -10)
        .attr("dy", 5)
        .attr("id", "percent-bob7")
        .text(formatPercent(seg7.length/total));

    seg7svg.append("text")
        .attr("id", "percent-bob-label7")
        .attr("dx", -30)
        .attr("dy", 45)
        .text("% of BOB");

 // Seg 8 % of BOB
    var seg8svg = d3.select(".overlay8")
    .append("svg")
    .attr("width", 100)
    .attr("height", 100)
    .attr("id", "seg8bob")
    .attr("cursor", "pointer")
    .append("g")
    .attr("transform", "translate(60,30)");

    var arc8bg = d3.arc()
        .innerRadius(18)
        .outerRadius(20)
        .startAngle(0)
        .endAngle(360*Math.PI/180);

    var arc8 = d3.arc()
        .innerRadius(16)
        .outerRadius(22)
        .startAngle(0)
        .endAngle((seg8.length/total*360)*Math.PI/180);

    seg8svg.append("path")
        .attr("class", "arc-bg")
        .attr("d", arc8bg);

    seg8svg.append("path")
        .attr("class", "arc")
        .attr("id", "arc8")
        .attr("d", arc8);

    seg8svg.append("text")
        .attr("dx", -10)
        .attr("dy", 5)
        .attr("id", "percent-bob8")
        .text(formatPercent(seg8.length/total));

    seg8svg.append("text")
        .attr("id", "percent-bob-label8")
        .attr("dx", -30)
        .attr("dy", 45)
        .text("% of BOB");


}
