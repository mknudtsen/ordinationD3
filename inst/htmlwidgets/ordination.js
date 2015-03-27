HTMLWidgets.widget({

    name: 'ordination',
    type: 'output',

    initialize: function(el, width, height) {
	return {};
    },

    renderValue: function(el, x, instance) {
	//
	// Args:
	//   el: The HTML element containing the visualization
	//   x: The problem data input by R
	//   instance: The instance data, from initialization or the last
	//     resizing

	var height = 1000;
	var width = 1000;

	var samples_df = HTMLWidgets.dataframeToD3(x.samples_df);
	var features = HTMLWidgets.dataframeToD3(x.features);

	// add the tooltip area to the webpage
	var tooltip = d3.select("body").append("div")
	    .attr("class", "tooltip")
	    .style("opacity", 0);

	console.log(x);

	// setup x
	var xValue = function(d) { return d.PC1;},
	    xScale = d3.scale.linear()
	    .domain([x.xmin, x.xmax])
	    .range([0, width]),
	    xMap = function(d) { return xScale(xValue(d));},
	    xAxis = d3.svg.axis().scale(xScale);

	// setup y
	var yValue = function(d) { return d.PC2;}, // data -> value
	    yScale = d3.scale.linear()
	    .domain([x.ymin, x.ymax])
	    .range([height, 0]), // value -> display
	    yMap = function(d) { return yScale(yValue(d));}, // data -> display
	    yAxis = d3.svg.axis().scale(yScale).orient("right");

	// setup y
	var rValue = function(d) { return d.samples_size; },
	    rScale = d3.scale.linear()
	    .range([5, 10])

	// setup fill color
	var cValue = function(d) { return d.samples_group;},
	    color = d3.scale.category10();

	// create the canvas
	var svg = d3.select("body").append("svg")
	    .attr("width", width)
	    .attr("height", height)
	    .append("g");

	// x-axis
	svg.attr("class", "x axis")
	   .append("g")
  	    .call(xAxis)
	   .append("text")
 	    .attr("class", "label")
	    .attr("x", width)
	    .style("text-anchor", "end")
	    .text("PC1");

	// y-axis
	svg.attr("class", "y axis")
	   .append("g")
	    .call(yAxis)
	   .append("text")
	    .attr("class", "label")
	    .attr("y", height)
	    .style("text-anchor", "end")
	    .text("PC2");

	// draw dots
	svg.selectAll(".dot")
	    .data(samples_df)
	    .enter().append("circle")
	    .attr("class", "dot")
	    .attr("r", function(d) {
		console.log(rValue(d));
		return rValue(d);
	    })
	    .attr("cx", function(d) {
		console.log(xMap(d));
		return xMap(d);
	    })
	    .attr("cy", function(d) {
		console.log(yMap(d));
		return yMap(d);
	    })
	    .style("fill", function(d) { return color(cValue(d));})
	    .on("mouseover", function(d) {
		tooltip.transition()
		    .duration(200)
		    .style("opacity", .9);
		tooltip.html("(" + xValue(d) + ", " + yValue(d) + ") " + d.samples_group)
		    .style("left", (d3.event.pageX + 5) + "px")
		    .style("top", (d3.event.pageY - 28) + "px");
	    })
	    .on("mouseout", function(d) {
		tooltip.transition()
		    .duration(500)
		    .style("opacity", 0);
	    });
    }
});

