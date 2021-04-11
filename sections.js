// using d3 for convenience
var main = d3.select("main");
var scrolly = main.select("#scrolly");
var figure = scrolly.select("figure");
var article = scrolly.select("article");
var step = article.selectAll(".step");

// initialize the scrollama
var scroller = scrollama();

// generic window resize listener event
function handleResize() {
  // 1. update height of step elements
  var stepH = Math.floor(window.innerHeight * 0.25);
  step.style("height", stepH + "px");

  var figureHeight = window.innerHeight * 0.8;
  var figureMarginTop = (window.innerHeight - figureHeight) / 2;

  figure
    .style("height", figureHeight + "px")
    .style("top", figureMarginTop + "px");

  // 3. tell scrollama to update new element dimensions
  scroller.resize();
}

function handleStepEnter(response) {
  // var el = d3.select(response.element);
  if (response.index == 1) {
    var dx_ind = 0;
    var ax_ind = 0;
    var dy_ind = 0;
    var ay_ind = 0;

    var m = { top: 5, right: 5, bottom: 30, left: 0 };
    var w = 1300 - margin.left - margin.right;
    var h = 1000 - margin.top - margin.bottom;
    var nsrow = 35;

    svg.attr("width", w).attr("height", h);

    svg
      .selectAll("rect")
      .transition()
      .duration(700)
      .attr("x", (d, i) => {
        var n;
        if (d.Survived === "Dead") {
          n = dx_ind % nsrow;
          dx_ind++;
          return row(n);
        } else {
          n = ax_ind % nsrow;
          ax_ind++;
          return row(n) + 600;
        }
      })
      .attr("y", (d, i) => {
        if (d.Survived === "Dead") {
          const n = Math.floor(dy_ind / nsrow);
          dy_ind++;
          return row(n);
        } else {
          const n = Math.floor(ay_ind / nsrow);
          ay_ind++;
          return row(n);
        }
      })
      .attr("fill", "white");
    svg.selectAll("rect");
    // died = data.filter(d => d.Survived === "Dead")
    died = 1496;
    d3.select("#title_died1").text(
      `Died: ${died.toString()} Souls, ${Math.round(
        (died * 100) / 2208
      ).toString()}% of All Passengers`
    );
    survived = 712;
    d3.select("#title_survived1").text(
      `Survived: ${survived.toString()} Souls, ${Math.round(
        (survived * 100) / 2208
      ).toString()}% of All Passengers`
    );
  }
  // el.select(".progress").text(d3.format(".1%")(response.progress));
}
function handleContainerEnter(response) {
	// response = { direction }

	// sticky the graphic
	$graphic.classed('is-fixed', true);
	$graphic.classed('is-bottom', false);
}

function handleContainerExit(response) {
	// response = { direction }

	// un-sticky the graphic, and pin to top/bottom of container
	$graphic.classed('is-fixed', false);
	$graphic.classed('is-bottom', response.direction === 'down');
}

function init() {
  // 1. force a resize on load to ensure proper dimensions are sent to scrollama
  handleResize();

  // 2. setup the scroller passing options
  // 		this will also initialize trigger observations
  // 3. bind scrollama event handlers (this can be chained like below)
  scroller
    .setup({
      step: "#scrolly article .step",
      offset: 0.5,
      progress: true,
      // debug: true
    })
    .onStepEnter(handleStepEnter)

  // setup resize event
  window.addEventListener("resize", handleResize);
}

// kick things off
init();
const margin1 = { top: 10, right: 10, bottom: 30, left: 0 },
  width = 1300 - margin1.left - margin1.right,
  height = 1000 - margin1.top - margin1.bottom,
  squareSize1 = 12,
  strokeWidth1 = 0,
  numSoulRow1 = 63;

const colorMap = {
  1: "#B9C7C5",
  2: "#C8B794",
  3: "#8A98A3",
  Crew: "#BE8275",
};

var row = d3.scaleLinear().domain([0, numSoulRow1]).range([0, width]);

var title_died1 = d3.select("#title_died1");
var title_survived1 = d3.select("#title_survived1");

var svg = d3
  .select("#area")
  .append("svg")
  .attr("width", width + margin1.left + margin1.right)
  .attr("height", height + margin1.top + margin1.bottom)
  .append("g")
  .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");

var tooltip = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

function render1() {
  d3.csv("../data/titanic.csv").then(function (data) {
    // sorted_data = data.sort((d1, d2) => (d1.Class > d2.Class) ? 1 : -1);
    d3.select("#title_died1").text(`Titanic: 2208 Souls`);

    souls = svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => {
        const n = i % numSoulRow1;
        return row(n);
      })
      .attr("y", (d, i) => {
        const n = Math.floor(i / numSoulRow1);
        return row(n);
        x;
      })
      .attr("rx", 3)
      .attr("ry", 3)
      .attr("width", squareSize1)
      .attr("height", squareSize1)
      .attr("stroke-width", strokeWidth1)
      .attr("stroke", "white")
      .attr("fill", "white")
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut);
    // console.log(data)

    function handleMouseOver(d) {
      d3.select(this).style("fill", "black");
      d3.select(this).style("opacity", 0.5);

      // tooltip
      tooltip.transition().duration(30).style("opacity", 1);
      tooltip
        .html(
          `${d.Title} ${d.FirstName} ${d.LastName}, ${parseInt(d.Age)}${
            d.Job ? ", " + d.Job : ""
          }<br><div class='tooltip-more'> Click to learn more </div>`
        )
        .style("left", d3.event.pageX + 20 + "px")
        .style("top", d3.event.pageY - 20 + "px");
      d3.select(this).attr("class", "info").datum(d).style("cursor", "pointer");
    }
    function handleMouseOut(d) {
      d3.select(this).style("fill", "white");
      d3.select(this).style("opacity", 1);

      // tooltip
      tooltip.transition().duration(30).style("opacity", 0);
      d3.select(this).attr("class", null);
    }
  });
}


render1();
