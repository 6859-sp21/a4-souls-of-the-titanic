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
  var stepH = Math.floor(window.innerHeight * 0.25);
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

  postCrashSVG.selectAll("rect").remove();

  wacData = rawData.filter((d) => (d.Sex == "Female" || d.Adut_or_Chld == "Child"))
  wacRest = rawData.filter((d) => !(d.Sex == "Female" || d.Adut_or_Chld == "Child") )
  
  wacTotal = wacData.concat(wacRest);

  postCrashSVG
    .selectAll("rect")
    .data(wacTotal)
    .enter()
    .append("rect")
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
    }).attr("opacity", 1)
    .attr("width", squareSize1)
    .attr("height", squareSize1)
    .attr("stroke-width", strokeWidth1)
    .attr("stroke", "white")
    .on("mouseover", handleMouseOver)
    .on("click", handleClick)
    .on("mouseout", handleMouseOut);
    postCrashSVG.exit().remove()

    died_wac = rawData.filter((d) => (d.Sex == "Female" || d.Adut_or_Chld == "Child") && d.Survived === "Dead");
    survived_wac = rawData.filter((d) => (d.Sex == "Female" || d.Adut_or_Chld == "Child") && d.Survived === "Alive");
    died = 1496;

  d3.select("#post-crash-title-died").text(
    `Died: ${died_wac.length.toString()} Souls, ${Math.round(
      (died_wac.length * 100) / died
    ).toFixed(1).toString()}% of Total Victims`
  );
  survived = 712;
  d3.select("#post-crash-title-survived").text(
    `Survived: ${survived_wac.length.toString()} Souls, ${Math.round(
      (survived_wac.length * 100) / survived
    ).toFixed(1).toString()}% of Total Survivors`
  );
}
function firstClassVis() {
  var dx_ind = 0;
  var ax_ind = 0;
  var dy_ind = 0;
  var ay_ind = 0;

  first = rawData.filter((d) => d.Class == "1");
  firstRest = rawData.filter((d) => d.Class != "1");

  sortedFirst = first.concat(firstRest);

  postCrashSVG.selectAll("rect").remove();

  postCrashSVG
    .selectAll("rect")
    .data(sortedFirst)
    .enter()
    .append("rect")
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
    })
    .attr("opacity", 1)
    .attr("width", squareSize1)
    .attr("height", squareSize1)
    .attr("stroke-width", strokeWidth1)
    .attr("stroke", "white")
    .on("mouseover", handleMouseOver)
    .on("click", handleClick)
    .on("mouseout", handleMouseOut);

    died_firstClass = rawData.filter((d) => d.Class=== "1" && d.Survived === "Dead");
    survived_firstClass = rawData.filter((d) => d.Class=== "1" && d.Survived === "Alive");
    died = 1496;

  d3.select("#post-crash-title-died").text(
    `Died: ${died_firstClass.length.toString()} Souls, ${Math.round(
      (died_firstClass.length * 100) / died
    ).toFixed(1).toString()}% of Total Victims`
  );
  survived = 712;
  d3.select("#post-crash-title-survived").text(
    `Survived: ${survived_firstClass.length.toString()} Souls, ${Math.round(
      (survived_firstClass.length * 100) / survived
    ).toFixed(1).toString()}% of Total Survivors`
  );
}
function musicianVis() {
  var dx_ind = 0;
  var ax_ind = 0;
  var dy_ind = 0;
  var ay_ind = 0;

  postCrashSVG.selectAll("rect").remove();

  musicianD = rawData.filter((d) => d.Job === "Musician");
  restMusican = rawData.filter((d) => d.Job != "Musician");
  allMusician = musicianD.concat(restMusican)

  console.log(allMusician);
  postCrashSVG
    .selectAll("rect")
    .data(allMusician)
    .enter()
    .append("rect")
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
    })
    .attr("opacity", 1)
    .attr("width", squareSize1)
    .attr("height", squareSize1)
    .attr("stroke-width", strokeWidth1)
    .attr("stroke", "white")
    .on("mouseover", handleMouseOver)
    .on("click", handleClick)
    .on("mouseout", handleMouseOut);
    ;
died_musicians = rawData.filter((d) => d.Job === "Musician" && d.Survived === "Dead");
    died = 1496;

  d3.select("#post-crash-title-died").text(
    `Died: ${died_musicians.length.toString()} Souls, ${Math.round(
      (died_musicians.length * 100) / died
    ).toFixed(1).toString()}% of Total Victims`
  );
  survived = 712;
  d3.select("#post-crash-title-survived").text(
    `Survived: ${0} Souls, ${Math.round(
      (0) / survived
    ).toFixed(1).toString()}% of Total Survivors`
  );
}
function survivedDied() {
  var dx_ind = 0;
  var ax_ind = 0;
  var dy_ind = 0;
  var ay_ind = 0;

  postCrashSVG.selectAll("rect").remove();
  
  postCrashSVG.selectAll("rect").attr("fill", "white");
  console.log(postCrashSVG.selectAll("rect"));
  postCrashSVG
    .selectAll("rect")
    .data(rawData)
    .enter()
    .append("rect")
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

  postCrashTitleDied.text(
    `Died: ${died.toString()} Souls, ${Math.round(
      (died * 100) / 2208
    ).toString()}% of All Passengers`
  );
  survived = 712;
  postCrashTitleSurvived.text(
    `Survived: ${survived.toString()} Souls, ${Math.round(
      (survived * 100) / 2208
    ).toString()}% of All Passengers`
  );
  
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

var postCrashTitleDied = d3.select("#post-crash-title-died");
var postCrashTitleSurvived = d3.select("#post-crash-title-survived")

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
    
  });
}

render2();
