import config from "../conf/index.js";
//console.log(config)
async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image)
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let url = `${config.backendEndpoint}/cities`;
    let citydata = fetch(url)
    let cityData = (await citydata).json();
    return await cityData;
  }
  catch (err) {
    return null
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let anchor = document.createElement("a")
  anchor.href = `pages/adventures/?city=${id}`
  anchor.id = id;
  anchor.innerHTML = `<div class="tile"><img src="${image}"><div class="tile-text text-center"><h5>${city}</h5><p>${description}<p/></div></div>`
  let newClass = document.createElement("div");
  newClass.classList.add("col-lg-3", "col-6", "mb-4")
  newClass.append(anchor)
  document.getElementById("data").append(newClass)
}

export { init, fetchCities, addCityToDOM };
