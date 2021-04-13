const margin = { top: 0, right: 30, bottom: 10, left: 0 },
  width_died = 700 - margin.left - margin.right,
  height_died = 700 - margin.top - margin.bottom,
  width_survived = 700 - margin.left - margin.right,
  height_survived = 300 - margin.top - margin.bottom,
  squareSize = 15,
  strokeWidth = 0,
  numSoulRow = 40,
  //Square and Highlight Colors
  squareColor = "rgba(198, 198, 198, .2)",
  highlightColor = "grey",
  diedColor = "#adc3c7",
  survivedColor = "#e0c3a7";

var row = d3.scaleLinear().domain([0, numSoulRow]).range([0, width_died]);

 //Filter JSON
 var filters = {
  gender: [],
  class: [],
  age: [],
};

var filtersDefault = {
gender: ["Male", "Female"],
class: ["1", "2", "3", "Crew"],
age: [
  [0, 17],
  [18, 35],
  [35, 50],
  [50, 75],
],
};

var activeFilterTitle = d3.select("#activeFilterTitle");
var filterTitle = "Select a filter to see passenger demographics!";

//Died Grid Dimensions
var title_died = d3.select("#title_died");
var svg_died = d3
  .select("#final_died")
  .append("svg")
  .attr("width", width_died + margin.left + margin.right)
  .attr("height", height_died + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Survived Grid Dimensions
var title_survived = d3.select("#title_survived");
var svg_survived = d3
  .select("#final_survived")
  .append("svg")
  .attr("width", width_survived + margin.left + margin.right)
  .attr("height", height_survived + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tooltip = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

// Filter and Update Data (TODO!)
function updateFilter() {
  genderFilter = ["Male", "Female"];
  classFilter = ["1", "2", "3", "Crew"];
  ageFilter = ["ageGroup1", "ageGroup2", "ageGroup3", "ageGroup4"];
  ageMap = {
    ageGroup1: [0, 17],
    ageGroup2: [18, 35],
    ageGroup3: [35, 50],
    ageGroup4: [50, 75],
  };
  titleMap = {
    "Male": "Male",
    "Female": "Female",
    "1": "1st Class",
    "2": "2nd Class",
    "3": "3rd Class",
    "Crew": "Crew",
    "0,17": "0-17 Years",
    "18,35": "18-35 Years",
    "35,50": "35-50 Years",
    "50,75": "50-75 Years"
  }

  filters["gender"] = genderFilter.map((f) => {
    if (document.getElementById(f).checked == true) return f;
  });
  filters["class"] = classFilter.map((f) => {
    if (document.getElementById(f).checked == true) return f;
  });
  filters["age"] = ageFilter.map((f) => {
    if (document.getElementById(f).checked == true) return ageMap[f];
  });
  noSelectCount = 0
  filterTitle = ""
  for (filterKey in filters) {
    var filterCount = 0
    var curFilter = filters[filterKey]
    for (f in curFilter) {
      if (curFilter[f] === undefined) filterCount+=1;
      else {filterTitle += titleMap[curFilter[f].toString()] + ", "; console.log(curFilter[f].toString())};
    }
    noSelectCount += filterCount;
    if (filterCount === curFilter.length) {
      filters[filterKey] = filtersDefault[filterKey];
    }
  }

  filterTitle = "You are looking at all passengers who are: " + filterTitle.substring(0,filterTitle.length-2)

  console.log('ok', noSelectCount)
  console.log('ok')
  console.log(filterTitle)

  if (noSelectCount === 10) {
    filters["gender"] = [];
    filters["class"] = [];
    filters["age"] = [];
    filterTitle = "Select a filter to see passenger demographics!"
  }

  return filters;
}

      
function filter(data, survived) {
  survived_data = data.filter((d) => d.Survived === survived);
  filtered_data = survived_data.filter((d) => fitsFilter(d));
  rest_of_data = survived_data.filter((d) => !filtered_data.includes(d));

  const all_data = [];
  var i = 0;
  for (key in filtered_data) {
    if (filtered_data.hasOwnProperty(key)) {
      all_data[i] = filtered_data[key];
      i++;
    }
  }
  for (key in rest_of_data) {
    if (rest_of_data.hasOwnProperty(key)) {
      all_data[i] = rest_of_data[key];
      i++;
    }
  }
  return all_data;
}
function fitsFilter(d) {
  return (
    filters["gender"].includes(d.Sex) &&
    filters["class"].includes(d.Class) &&
    inAgeRange(filters["age"], d.Age)
  );
}
function inAgeRange(rangeList, age) {
  // console.log('rangeList', rangeList)
  for (var i = 0; i < rangeList.length; i++) {
    if (rangeList[i]) {
      if (
        parseInt(age) >= rangeList[i][0] &&
        parseInt(age) <= rangeList[i][1]
      ) {
        return true;
      }
    }
  }
  return false;
}

    function findPerson(firstName, lastName) {
      // find the person and highlight their square
      person = svg_died
        .selectAll('rect')
        .filter((d) => d.FirstName.toLowerCase().includes(firstName.toLowerCase()) 
                      && d.LastName.toLowerCase().includes(lastName.toLowerCase()))
        .attr('stroke', 'red')
        .attr('stroke-width', 5)
      person_s = svg_survived
        .selectAll('rect')
        .filter((d) => d.FirstName.toLowerCase().includes(firstName.toLowerCase()) 
                      && d.LastName.toLowerCase().includes(lastName.toLowerCase()))
        .attr('stroke', 'red')
        .attr('stroke-width', 5)

    }
    function updateFinding() {
      if (document.getElementById("Dorothy").checked == true) findPerson("Dorothy", "Gibson");
      if (document.getElementById("Wallace").checked == true) findPerson("Wallace", "Hartley");
      if (document.getElementById("Edward").checked == true) findPerson("Edward", "Smith");
      if (document.getElementById("Margaret").checked == true) findPerson("Margaret", "Brown");
    }

    // Render Grids
    function render() {
      d3.csv("../data/titanic.csv").then(function (data) {
        // data = filter(data)
        unhighlight();
        // console.log('good')

    // Died Grid
    died = filter(data, "Dead");
    title_died.text(`0 Souls, 0% of Total Victims`).style("color", diedColor);

    svg_died
      .selectAll("rect")
      .data(died)
      .enter()
      .append("rect")
      .attr("x", (d, i) => {
        const n = i % numSoulRow;
        return row(n);
      })
      .attr("y", (d, i) => {
        const n = Math.floor(i / numSoulRow);
        return row(n);
      })
      .attr("rx", 3)
      .attr("ry", 3)
      .attr("width", squareSize)
      .attr("height", squareSize)
      .attr("stroke-width", strokeWidth)
      .attr("stroke", squareColor)
      .attr("fill", squareColor)
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut_died)
      .on("click", handleClick);

    // Survived Grid
    survived = filter(data, "Alive");
    title_survived
      .text(`0 Souls, 0% of Total Survivors`)
      .style("color", survivedColor);

    svg_survived
      .selectAll("rect")
      .data(survived)
      .enter()
      .append("rect")
      .attr("x", (d, i) => {
        const n = i % numSoulRow;
        return row(n);
      })
      .attr("y", (d, i) => {
        const n = Math.floor(i / numSoulRow);
        return row(n);
      })
      .attr("rx", 3)
      .attr("ry", 3)
      .attr("width", squareSize)
      .attr("height", squareSize)
      .attr("stroke-width", strokeWidth)
      .attr("stroke", squareColor)
      .attr("fill", squareColor)
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut_survived)
      .on("click", handleClick);

        handleFilter();
        updateFinding();
        console.log('hello', filterTitle.substring(0,filterTitle.length-2))
        activeFilterTitle
          .text(filterTitle)
          .style("color", "white")

    // MouseOvers
    function handleMouseOver(d) {
      d3.select(this).style("fill", highlightColor);
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
    function handleMouseOut_died(d) {
      d3.select(this).style("fill", function () {
        return d3.select(this).attr("id") == "is-active"
          ? diedColor
          : squareColor;
      });
      d3.select(this).style("opacity", 1);

      // tooltip
      tooltip.transition().duration(30).style("opacity", 0);
      d3.select(this).attr("class", null);
    }

    function handleMouseOut_survived(d) {
      d3.select(this).style("fill", function () {
        return d3.select(this).attr("id") == "is-active"
          ? survivedColor
          : squareColor;
      });
      d3.select(this).style("opacity", 1);

      // tooltip
      tooltip.transition().duration(30).style("opacity", 0);
      d3.select(this).attr("class", null);
    }

    //Handle Click, need to implement the modal
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
                        }/${d.FirstName.split(" ").join("-")}-${d.LastName}.html" class="button1" target="blank">Hear My Story from Encyclopedia Titanica</a></div>`);
    }

    function handleFilter(d) {
      filtered_died = svg_died.selectAll("rect").filter((d) => fitsFilter(d));
      filtered_survived = svg_survived
        .selectAll("rect")
        .filter((d) => fitsFilter(d));
      highlight(filtered_died, filtered_survived);
      update_title(filtered_died, filtered_survived);
    }

    // Update Title for Both Grids
    function update_title(filtered_died, filtered_survived) {
      title_died.text(
        `Died: ${filtered_died.size()} Souls, ${(
          (filtered_died.size() * 100) /
          1496
        )
          .toFixed(1)
          .toString()}% of Total Victims`
      );
      title_survived.text(
        `Survived: ${filtered_survived.size()} Souls, ${(
          (filtered_survived.size() * 100) /
          712
        )
          .toFixed(1)
          .toString()}% of Total Survivors`
      );
    }
    //Highlighting Boxes
    function highlight(filtered_died, filtered_survived) {
      filtered_died
        .transition()
        .duration(100)
        .delay(function (d, i) {
          return i;
        })
        .style("fill", diedColor)
        .attr("id", "is-active");
      filtered_survived
        .transition()
        .duration(100)
        .delay(function (d, i) {
          return i;
        })
        .style("fill", survivedColor)
        .attr("id", "is-active");
    }

    //TODO use unhighlight somewhere
    function unhighlight() {
      d3.selectAll("rect").remove();
    }
  });
}

render();
render1();

// d3
// .select(".target")  // select the elements that have the class 'target'
// .style("stroke-width", 8)
