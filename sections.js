// using d3 for convenience
const margin1 = { top: 10, right: 10, bottom: 30, left: 0 },
  width = 1200 - margin1.left - margin1.right,
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

// HANDLE TIMELINE SCROLL
window.smoothScroll = function (target) {
  var scrollContainer = target;
  do {
    //find scroll container
    scrollContainer = scrollContainer.parentNode;
    if (!scrollContainer) return;
    scrollContainer.scrollTop += 1;
  } while (scrollContainer.scrollTop == 0);

  var targetY = 0;
  do {
    //find the top of target relatively to the container
    if (target == scrollContainer) break;
    targetY += target.offsetTop;
  } while ((target = target.offsetParent));

  scroll = function (c, a, b, i) {
    i++;
    if (i > 30) return;
    c.scrollTop = a + ((b - a) / 30) * i;
    setTimeout(function () {
      scroll(c, a, b, i);
    }, 20);
  };
  // start scrolling
  scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
};

clickable_labels = d3
  .selectAll(".circle")
  .on("click", function () {
    stepNumber = d3.select(this).attr("id").split("circle")[1];
    if (stepNumber == 0) {
      step = document.getElementsByClassName("intro__dek")[0];
      console.log(step);
      smoothScroll(step);
    } else {
      step = document.getElementsByClassName("step")[stepNumber - 1];
      console.log(step);
      smoothScroll(step);
    }
  })
  .on("mouseover", function () {
    d3.select(this)
      .transition()
      .duration(400)
      .style("width", "14px")
      .style("height", "14px")
      .style("background", "grey");
  })
  .on("mouseout", function () {
    d3.select(this)
      .transition()
      .duration(400)
      .style("width", "10px")
      .style("height", "10px")
      .style("background", "black");
  });

// get scrollama percentages
function handleStepProgress(response) {
  progress = d3
    .select(`#step${response.index}`)
    .style("height", `${response.progress * 100}%`)
    .style("background", "black");
}

function handleStepEnter(response) {
  console.log(response.index);
  if (response.index == 0){
    singleSquare();
  } else if (response.index == 1) {
    belfastVis();
  } else if (response.index == 2) {
    southamptonVis();
  } else if (response.index == 3) {
    cherbourgVis();
  } else if (response.index == 4) {
    queenstownVis();
  } else if (response.index == 5) {
    classes();
  } 
  // el.select(".progress").text(d3.format(".1%")(response.progress));
}
function singleSquare() {
  const dorothyData = rawData.filter((d) => d.FirstName === "Dorothy Winifred");

  dorothy = svg.selectAll("rect").data(dorothyData);

  dorothy
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
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

  dorothy.transition().duration(500);

  dorothy.exit().remove();
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

  d3.select("#title_died1").text(`Titanic Passengers: ${belfastData.length} Souls from Belfast`);

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

  d3.select("#title_died1").text(`Titanic Passengers: ${southamptonData.length} Souls from Belfast and Southampton`);

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

  d3.select("#title_died1").text(`Titanic Passengers: ${cherbourgData.length} Souls from Belfast, Southampton, and Cherbourg`);

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

  d3.select("#title_died1").text(`Titanic Passengers: ${queenstownData.length} Souls from Belfast, Southampton, Cherbourg, and Queenstown`);

  queenstown.exit().remove();
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
    .attr("fill", (d, i) => {
      return colorMap[d.Class];
    })
    .attr("rx", 3)
    .attr("ry", 3)
    .attr("id", (d) => {
      return d.Class;
    });

    classes_title = d3.select("#title_died1").text(`Titanic Passengers: `);
    classes_title.append("text").text(`${firstClass.length} Souls in 1st Class, `).style('color', colorMap[1]);
    classes_title.append("text").text(`${secondClass.length} Souls in 2nd Class, `).style("color", colorMap[2]);
    classes_title.append("text").text(`${thirdClass.length} Souls in 3rd Class, `).style("color", colorMap[3]);
    classes_title.append("text").text(`and ${crew.length} Souls in the Crew `).style("color", colorMap['Crew']);

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
    .onStepProgress(handleStepProgress)
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
  d3.select(this).style('stroke', 'black').attr('stroke-width', 1)

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
