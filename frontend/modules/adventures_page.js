import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let url = new URL(`${config.backendEndpoint}/${search}`)
  let param= new URLSearchParams(url.search)
  return param.get("city");
  
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let url = `${config.backendEndpoint}/adventures?city=${city}`;
    let data = await fetch(url);
    data = await data.json();
    return await data;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach(adventure => {
    let div = document.createElement("div");
    div.classList.add("col-lg-3", "col-6", "activity-class","mb-4");
    div.innerHTML =
      `<div class="category-banner">
        ${adventure.category}
        </div>
      <a href="detail/?adventure=${adventure.id}" id="${adventure.id}">
      <div class="activity-card">
          <img src="${adventure.image}">
        <div class="d-flex justify-content-between w-100 pb-1 pt-2">
          <div class="ps-2 h6">${adventure.name}</div>
          <div class="pe-2">&#8377;${adventure.costPerHead}</div>
        </div>
        <div class="d-flex justify-content-between w-100 pb-2 pt-1">
          <div class="ps-2 h6">Duration</h6></div>
          <div class="pe-2">${adventure.duration} hours</div>
        </div>
      </div>
    </a>`;
    document.getElementById("data").append(div);
  })
  
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  let filteredList = list.filter(adventures => {
    return ((adventures.duration >= low) && (adventures.duration <= high));
  })
  return filteredList;
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList = list.filter(adventures => {
    return categoryList.includes(adventures.category)
  })
  return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };
//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  //filteredList=filterByDuration(list, low, high)
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  // Place holder for functionality to work in the Stubs
  //console.log(typeof +filters.duration.substring(0,1), typeof +filters.duration.substring(2))
  
  let [low, high] = filters.duration.split('-');
  console.log(low,high)
  let filteredList=[]
  if (filters.duration && filters.category.length>0) {
    filteredList=filterByDuration(list, low, high)
    filteredList = filterByCategory(filteredList, filters.category)
    return filteredList;
  }
  else if (filters.duration.length>0) {
    filteredList=filterByDuration(list, low, high)
  }
  else if(filters.category.length>0){
    filteredList=filterByCategory(list, filters.category)
  }
  else {
    filteredList = list;
  }
  return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  let storage = localStorage.setItem("filters", JSON.stringify(filters))
  console.log(storage)
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const getItem=JSON.parse(localStorage.getItem("filters"));
  // Place holder for functionality to work in the Stubs
  return getItem;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let pills = document.getElementById('category-list');
  filters.category.forEach(element => {
    let div = document.createElement("div");
    div.className = 'category-filter';
    div.innerHTML = `<div>${element}</div>`
    pills.append(div);
  })

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
