/** @format */

var container = document.getElementById("container");
var timerId;

async function searchResult() {
  let query = document.getElementById("search").value;
  if (query.length <= 2) {
    return false;
  }
  let res = await fetch(
    `http://api.serpstack.com/search?access_key=a785b6bf5d91b1834ebecb00fa847e2d&query=${query}`
  );
  let data = await res.json();
  console.log(data.organic_results);
  return data.organic_results;
}

function throttleFunction(e) {
  if (e.keyCode == 13) {
    if (timerId) {
      return false;
    }

    timerId = setTimeout(() => {
      main();
      timerId = undefined;
    }, 500);
  }
}
function throttleFunctionSearch() {
  if (timerId) {
    return false;
  }

  timerId = setTimeout(() => {
    main();
    timerId = undefined;
  }, 500);
}

function appendResults(d) {
  container.innerHTML = null;
  d.forEach(({ displayed_url, title }) => {
    let div = document.createElement("div");
    div.setAttribute("class", "searchItems");

    let a = document.createElement("a");
    a.innerHTML = displayed_url;

    let p = document.createElement("p");
    p.innerText = title;

    div.append(a, p);
    container.append(div);
  });
}

async function main() {
  let result = await searchResult();
  if (result.length != 0) {
    appendResults(result);
    console.log(result);
  }
}
