var main = d3.select("main");
var postCrashScrolly = main.select("#post-crash-scrolly");
var postCrashFigure = postCrashScrolly.select("#post-crash-figure");
var postCrashArticle = postCrashScrolly.select("#post-crash-article");
var postCrashStep = postCrashArticle.selectAll(".step");

var dx_ind = 0;
var ax_ind = 0;
var dy_ind = 0;
var ay_ind = 0;

var m = { top: 5, right: 5, bottom: 30, left: 0 };

var nsrow = 35;

var rawData;
d3.csv("./data/titanic.csv").then(function (data) {
  rawData = data;
});

var scroller = scrollama();

function handleResize() {
  // 1. update height of step elements
  var stepH = Math.floor(window.innerHeight * 0.4);
  postCrashStep.style("height", stepH + "px");

  var figureHeight = window.innerHeight * 0.8;
  var figureMarginTop = (window.innerHeight - figureHeight) / 2;

  postCrashFigure
    .style("height", figureHeight + "px")
    .style("top", figureMarginTop + "px");

  // 3. tell scrollama to update new element dimensions
  scroller.resize();
}

function handlePostCrashStepEnter(response) {
  console.log(response.index);
  if (response.index == 0) {
    survivedDied();
  } else if (response.index == 1) {
    musicianVis();
  } else if (response.index == 2) {
    firstClassVis();
  } else if (response.index == 3) {
    womenAndChildrenVis();
  }
}

function womenAndChildrenVis() {
  var dx_ind = 0;
  var ax_ind = 0;
  var dy_ind = 0;
  var ay_ind = 0;
  
  postCrashSVG
    .selectAll("rect")
    .sort(function (a, b) {
      if (
        (a.Sex == "Female" || a.Adut_or_Chld == "Child") &&
        !(b.Sex == "Female" || b.Adut_or_Chld == "Child")
      ) {
        return -1;
      } else if (
        !(a.Sex == "Female" || a.Adut_or_Chld == "Child") &&
        (b.Sex == "Female" || b.Adut_or_Chld == "Child")
      ) {
        return 1;
      } else {
        return 0;
      }
    })
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
    postCrashSVG.exit().remove()
}
function firstClassVis() {
  var dx_ind = 0;
  var ax_ind = 0;
  var dy_ind = 0;
  var ay_ind = 0;

  first = rawData.filter((d) => d.Class == "1");
  firstRest = rawData.filter((d) => d.Class != "1");

  sortedFirst = first.concat(firstRest);

  postCrashSVG
    .selectAll("rect")
    .sort(function (a, b) {
      if (a.Class == "1" && b.Class != "1") {
        return -1;
      } else if (a.Class != "1" && b.Class == "1") {
        return 1;
      } else {
        return 0;
      }
    })
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
function musicianVis() {
  var dx_ind = 0;
  var ax_ind = 0;
  var dy_ind = 0;
  var ay_ind = 0;

  postCrashSVG
    .selectAll("rect")
    .sort(function (a, b) {
      if (a.Job == "Musician" && b.Job != "Musician") {
        return -1;
      } else if (a.Job != "Musician" && b.Job == "Musician") {
        return 1;
      } else {
        return 0;
      }
    })
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
function survivedDied() {
  var dx_ind = 0;
  var ax_ind = 0;
  var dy_ind = 0;
  var ay_ind = 0;
  
  postCrashSVG.selectAll("rect").attr("fill", "white");
  console.log(postCrashSVG.selectAll("rect"));
  postCrashSVG
    .selectAll("rect")
    .data(rawData)
    .enter()
    .append("rect")
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
    .attr("opacity", 1)
    .attr("width", squareSize1)
    .attr("height", squareSize1)
    .attr("stroke-width", strokeWidth1)
    .attr("stroke", "white")
    .attr("fill", "white")
    .on("mouseover", handleMouseOver)
    .on("click", handleClick)
    .on("mouseout", handleMouseOut);
  died = 1496;
  
}
function init() {
  handleResize();

  scroller
    .setup({
      step: "#post-crash-scrolly #post-crash-article .step",
      offset: 0.5,
    })
    .onStepEnter(handlePostCrashStepEnter);

  console.log(d3.selectAll("#post-crash-scrolly #post-crash-article .step"));

  window.addEventListener("resize", handleResize);
}
init();

var row = d3.scaleLinear().domain([0, numSoulRow1]).range([0, width]);

var title_died1 = d3.select("#title_died1");
var title_survived1 = d3.select("#title_survived1");

var postCrashSVG = d3
  .select("#post-crash-area")
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
                        <div style="text-align:center"><a href=${
                          d.url
                        } class="button1" target="blank">Hear My Story from Encyclopedia Titanica</a></div>`);
}
function render2() {
  d3.csv("./data/titanic.csv").then(function (data) {
    // sorted_data = data.sort((d1, d2) => (d1.Class > d2.Class) ? 1 : -1);
    d3.select("#post-crash-title-died").text(
      `Died: ${died.toString()} Souls, ${Math.round(
        (died * 100) / 2208
      ).toString()}% of All Passengers`
    );
    survived = 712;
    d3.select("#post-crash-title-died").text(
      `Survived: ${survived.toString()} Souls, ${Math.round(
        (survived * 100) / 2208
      ).toString()}% of All Passengers`
    );
  });
}

render2();
