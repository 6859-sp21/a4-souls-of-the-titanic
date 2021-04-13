// using d3 for convenience
const margin1 = { top: 10, right: 10, bottom: 30, left: 0 },
  width = 1300 - margin1.left - margin1.right,
  height = 1000 - margin1.top - margin1.bottom,
  squareSize1 = 12,
  strokeWidth1 = 0,
  numSoulRow1 = 63;
(squareColor = "rgba(198, 198, 198, .2)"),
  (highlightColor = "grey"),
  (diedColor = "#adc3c7"),
  (survivedColor = "#e0c3a7");

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
var crash = article.selectAll("#crash");

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
  crash.style("height", window.innerHeight + "px");
  crash.attr("zIndex", 5);

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
  if (response.index == 0) {
    belfastVis();
  } else if (response.index == 1) {
    southamptonVis();
  } else if (response.index == 2) {
    cherbourgVis();
  } else if (response.index == 3) {
    queenstownVis();
  } else if (response.index == 4) {
    classes();
  } else if (response.index == 5) {
  } else if (response.index == 6) {
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
      .attr("fill", "white")
      .attr("opacity", 1);
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
  } else if (response.index == 7) {
    musicianVis();
  } else if (response.index == 8) {
    firstClassVis();
  } else if (response.index == 9) {
    womenAndChildrenVis();
  }
  // el.select(".progress").text(d3.format(".1%")(response.progress));
}
function belfastVis() {
  const belfastData = rawData.filter((d) => d.Boarded === "Belfast");

  belfast = svg.selectAll("rect").data(belfastData);

  belfast
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
    .on("mouseout", handleMouseOut)
    .on("click", handleClick);

  belfast.transition().duration(500);

  belfast.exit().remove();
}
function southamptonVis() {
  const southamptonData = rawData.filter(
    (d) => d.Boarded === "Belfast" || d.Boarded === "Southampton"
  );

  southampton = svg.selectAll("rect").data(southamptonData);

  southampton
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
    .on("mouseout", handleMouseOut)
    .on("click", handleClick);

  southampton.transition().duration(500);

  southampton.exit().remove();
}
function cherbourgVis() {
  const cherbourgData = rawData.filter(
    (d) =>
      d.Boarded === "Belfast" ||
      d.Boarded === "Southampton" ||
      d.Boarded === "Cherbourg"
  );
  cherbourg = svg.selectAll("rect").data(cherbourgData);

  cherbourg
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
    .on("mouseout", handleMouseOut)
    .on("click", handleClick);
  cherbourg.transition().duration(500);
  cherbourg.exit().remove();
}

function queenstownVis() {
  const queenstownData = rawData.filter(
    (d) =>
      d.Boarded === "Belfast" ||
      d.Boarded === "Southampton" ||
      d.Boarded === "Cherbourg" ||
      d.Boarded === "Queenstown"
  );
  queenstown = svg.selectAll("rect").data(queenstownData).attr("fill", "white");

  queenstown
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
    .on("mouseout", handleMouseOut)
    .on("click", handleClick);
  queenstown.transition().duration(500);
  queenstown.exit().remove();
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

  svg
    .selectAll("rect")
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
      return d.Job == "Musician" ? diedColor : highlightColor;
    })
    .attr("id", (d) => {
      if (d.Survived == "Alive") {
        return d.Job == "Musician" ? "survived-active" : "survived-inactive";
      } else {
        return d.Job == "Musician" ? "dead-active" : "dead-inactive";
      }
    });
}

function firstClassVis() {
  var dx_ind = 0;
  var ax_ind = 0;
  var dy_ind = 0;
  var ay_ind = 0;
  var nsrow = 35;
  var w = 1300 - margin.left - margin.right;
  var h = 1000 - margin.top - margin.bottom;
  first = rawData.filter((d) => d.Class == "1");
  firstRest = rawData.filter((d) => d.Class != "1");

  sortedFirst = first.concat(firstRest);

  svg
    .selectAll("rect")
    .data(sortedFirst)
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
      if (d.Survived == "Alive") {
        return d.Class == "1" ? survivedColor : highlightColor;
      } else {
        return d.Class == "1" ? diedColor : highlightColor;
      }
    })
    .attr("id", (d) => {
      if (d.Survived == "Alive") {
        return d.Class == "1" ? "survived-active" : "survived-inactive";
      } else {
        return d.Class == "1" ? "dead-active" : "dead-inactive";
      }
    });
}
function womenAndChildrenVis() {
  var dx_ind = 0;
  var ax_ind = 0;
  var dy_ind = 0;
  var ay_ind = 0;
  var nsrow = 35;
  var w = 1300 - margin.left - margin.right;
  var h = 1000 - margin.top - margin.bottom;
  womenAndChildren = rawData.filter(
    (d) => d.Sex == "Female" || d.Adut_or_Chld == "Child"
  );
  womenAndChildrenRest = rawData.filter(
    (d) => !(d.Sex == "Female" || d.Adut_or_Chld == "Child")
  );

  sortedwomenAndChildren = womenAndChildren.concat(womenAndChildrenRest);

  svg
    .selectAll("rect")
    .data(sortedwomenAndChildren)
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
      if (d.Survived === "Alive") {
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
      if (d.Survived == "Alive") {
        return d.Sex == "Female" || d.Adut_or_Chld == "Child"
          ? survivedColor
          : highlightColor;
      } else {
        return d.Sex == "Female" || d.Adut_or_Chld == "Child"
          ? diedColor
          : highlightColor;
      }
    })
    .attr("id", (d) => {
      if (d.Survived == "Alive") {
        return d.Sex == "Female" || d.Adut_or_Chld == "Child"
          ? "survived-active"
          : "survived-inactive";
      } else {
        return d.Sex == "Female" || d.Adut_or_Chld == "Child"
          ? "dead-active"
          : "dead-inactive";
      }
    });
}

function classes() {
  firstClass = rawData.filter((d) => d.Class == "1");
  secondClass = rawData.filter((d) => d.Class == "2");
  thirdClass = rawData.filter((d) => d.Class == "3");
  crew = rawData.filter((d) => d.Class == "Crew");

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
    .attr("id", (d) => {
      return d.Class;
    });
}

function init() {
  // 1. force a resize on load to ensure proper dimensions are sent to scrollama
  handleResize();
~
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
  console.log(d3.select(this).attr("id"));
  d3.select(this).style("fill", function () {
    if (d3.select(this).attr("class") == "class-active") {
      return colorMap[d3.select(this).attr("id")];
    } else {
      console.log("here");
      if (d3.select(this).attr("id") == "survived-active") {
        return survivedColor;
      } else if (d3.select(this).attr("id") == "dead-active") {
        return diedColor;
      } else if (
        d3.select(this).attr("id") == "survived-inactive" ||
        d3.select(this).attr("id") == "dead-inactive"
      ) {
        return highlightColor;
      } else {
        return "white";
      }
    }
  });
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
                        <h1 id="modal_info">Boarding Location: ${d.Boarded}</h1>
                        <br>
                        <div style="text-align:center"><a href="https://www.encyclopedia-titanica.org/${
                          d.Survived == "Alive"
                            ? "titanic-survivor"
                            : "titanic-victim"
                        }/${d.FirstName.split(" ").join("-")}-${
    d.LastName
  }.html" class="button1" target="blank">Hear My Story from Encyclopedia Titanica</a></div>`);
}
function render1() {
  d3.csv("data/titanic.csv").then(function (data) {
    // sorted_data = data.sort((d1, d2) => (d1.Class > d2.Class) ? 1 : -1);
    d3.select("#title_died1").text(`Titanic: 2208 Souls`);

    // souls = svg
    //   .selectAll("rect")
    //   .data(data)
    //   .enter()
    //   .append("rect")

    // console.log(data)
  });
}

render1();
