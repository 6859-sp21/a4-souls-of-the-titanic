// using d3 for convenience
const margin1 = { top: 10, right: 10, bottom: 30, left: 0 },
  width = 1300 - margin1.left - margin1.right,
  height = 1000 - margin1.top - margin1.bottom,
  squareSize1 = 12,
  strokeWidth1 = 0,
  numSoulRow1 = 63;
  squareColor = "rgba(198, 198, 198, .2)",
  highlightColor = "grey",
  diedColor = "#adc3c7",
  survivedColor = "#e0c3a7";

const colorMap = {
  1: "#B9C7C5",
  2: "#C8B794",
  3: "#8A98A3",
  Crew: "#BE8275",
};

var main = d3.select("main");
var scrolly = main.select("#scrolly");
var figure = scrolly.select("figure");
var article = scrolly.select("article");
var step = article.selectAll(".step");

var rawData;
d3.csv("data/titanic.csv").then(function (data) {
  rawData = data;
});

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
  console.log(response.index);
  // remove extra rects??

  // var el = d3.select(response.element);
  if (response.index == 0) {
    belfastVis();
  } else if (response.index == 1) {
    southamptonVis();
  } else if (response.index == 2){
    cherbourgVis();
   } else if (response.index == 3) {
    queenstownVis();
  } else if (response.index == 4) {
    classes();
  } else if (response.index == 5) {
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
  } else if (response.index == 6){
      musicianVis();
  }
  // el.select(".progress").text(d3.format(".1%")(response.progress));
}
function belfastVis() {
    const belfastData = rawData.filter(d => d.Boarded === "Belfast");
  svg
    .selectAll("rect")
    .data(belfastData)
    .transition()
    .attr("x", (d, i) => {
      const n = i % numSoulRow1;
      return row(n);
    })
    .attr("y", (d, i) => {
      const n = Math.floor(i / numSoulRow1);
      return row(n);
      x;
    })
    .duration(700)
    .attr("rx", 3)
    .attr("ry", 3)
    .attr("width", squareSize1)
    .attr("height", squareSize1)
    .attr("stroke-width", strokeWidth1)
    .attr("stroke", "white")
    .attr("fill", "white");
}
function southamptonVis() {
  d3.csv("data/titanic.csv").then((data) => {
    southamptonData = data.filter((d) =>  d.Boarded === "Belfast" || d.Boarded === "Southampton");
    svg
      .selectAll("rect")
      .data(southamptonData)
      .attr("x", (d, i) => {
        const n = i % numSoulRow1;
        return row(n);
      })
      .attr("y", (d, i) => {
        const n = Math.floor(i / numSoulRow1);
        return row(n);
        x;
      })
      .transition()
      .duration(700)
      .attr("rx", 3)
      .attr("ry", 3)
      .attr("width", squareSize1)
      .attr("height", squareSize1)
      .attr("stroke-width", strokeWidth1)
      .attr("stroke", "white")
      .attr("fill", "white");
  });
}
function cherbourgVis() {
    const cherbourgData = rawData.filter(d =>  d.Boarded === "Belfast" || d.Boarded === "Southampton" || d.Boarded === "Cherbourg");
  svg
    .selectAll("rect")
    .data(cherbourgData)
    .transition()
    .attr("x", (d, i) => {
      const n = i % numSoulRow1;
      return row(n);
    })
    .attr("y", (d, i) => {
      const n = Math.floor(i / numSoulRow1);
      return row(n);
      x;
    })
    .duration(700)
    .attr("rx", 3)
    .attr("ry", 3)
    .attr("width", squareSize1)
    .attr("height", squareSize1)
    .attr("stroke-width", strokeWidth1)
    .attr("stroke", "white")
    .attr("fill", "white");
}

function queenstownVis(){
    const queenstownData = rawData.filter(d =>  d.Boarded === "Belfast" || d.Boarded === "Southampton" || d.Boarded === "Cherbourg" || d.Boarded === "Queenstown");
  svg
    .selectAll("rect")
    .data(queenstownData)
    .transition()
    .attr("x", (d, i) => {
      const n = i % numSoulRow1;
      return row(n);
    })
    .attr("y", (d, i) => {
      const n = Math.floor(i / numSoulRow1);
      return row(n);
      x;
    })
    .duration(700)
    .attr("rx", 3)
    .attr("ry", 3)
    .attr("width", squareSize1)
    .attr("height", squareSize1)
    .attr("stroke-width", strokeWidth1)
    .attr("stroke", "white")
    .attr("fill", "white");
}

function musicianVis() {
    var dx_ind = 0;
    var ax_ind = 0;
    var dy_ind = 0;
    var ay_ind = 0;
    var nsrow = 35;
    var w = 1300 - margin.left - margin.right;
    var h = 1000 - margin.top - margin.bottom;
    musicians = rawData.filter((d) => d.Job == "Musician");
    rest = rawData.filter((d) => d.Job != "Musician");

    sortedMusicians = musicians.concat(rest);

    svg.selectAll("rect")
    .data(sortedMusicians)
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
    .transition()
    .duration(700)
    .attr("fill", (d) => {
        return d.Job == "Musician" ? survivedColor : highlightColor 
    })
    
}

function firstClass() {}

function classes() {
    firstClass = rawData.filter((d) => d.Class == "1");
    secondClass = rawData.filter((d) => d.Class == "2");
    thirdClass = rawData.filter((d) => d.Class== "3");
    crew = rawData.filter((d) => d.Class== "Crew");

    allData3 = firstClass.concat(secondClass);
    allData4 = allData3.concat(thirdClass);
    allData5 = allData4.concat(crew);
    
    svg
    .selectAll("rect")
    .data(allData5)
    .transition()
    .duration(700)
    .attr("fill", (d, i) => {
    return colorMap[d.Class];
    })
    .attr("rx", 3)
    .attr("ry", 3)
    .on("mouseout", handleClassMouseOut)
}

function handleClassMouseOut(d){
    d3.select(this).unbind("mouseout")
    d3.select(this).style("fill", (d, i) => {
        return colorMap[d.Class];
        });
      d3.select(this).style("opacity", 1);

      // tooltip
      tooltip.transition().duration(30).style("opacity", 0);
      d3.select(this).attr("class", null);
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
    .onStepEnter(handleStepEnter);

  // setup resize event
  window.addEventListener("resize", handleResize);
}
function handleMouseOut(d) {
    d3.select(this).style("fill", "white");
    d3.select(this).style("opacity", 1);

    // tooltip
    tooltip.transition().duration(30).style("opacity", 0);
    d3.select(this).attr("class", null);
  }

// kick things off
init();


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
  d3.csv("data/titanic.csv").then(function (data) {
    // sorted_data = data.sort((d1, d2) => (d1.Class > d2.Class) ? 1 : -1);
    d3.select("#title_died1").text(`Titanic: 2208 Souls`);

    souls = svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut)
      .on("click", handleClick);
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
    
    function handleClick(d) {
      $("#myModal").modal({
        fadeDuration: 300,
      }).html(`<h1 id="modal_name">${d.Title} ${d.FirstName} ${d.LastName}</h1>
                          <h1 id="modal_survived"">${
                            d.Survived == "Alive" ? "Survived" : "Died"
                          }</h1>
                          <h1 id="modal_info">Gender: ${d.Sex}</h1>
                          <h1 id="modal_info">Age: ${d.Age}</h1>
                          <h1 id="modal_info">Class: ${d.Class_Dept}</h1>
                          <h1 id="modal_info">${
                            d.Job ? "Occupation: " + d.Job : ""
                          }</h1>
                          <h1 id="modal_info">Boarding Location: ${
                            d.Boarded
                          }</h1>
                          <br>
                          <div style="text-align:center"><a href="https://www.encyclopedia-titanica.org/${
                            d.Survived == "Alive"
                              ? "titanic-survivor"
                              : "titanic-victim"
                          }/${d.FirstName.split(" ").join("-")}-${d.LastName}.html" class="button1" target="blank">Hear My Story from Encyclopedia Titanica</a></div>`);
    }
  });
}

render1();