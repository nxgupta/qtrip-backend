import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let url = new URL(`${config.backendEndpoint}/${search}`)
  let params = new URLSearchParams(url.search);
  //console.log(params.get("adventure"))

  // Place holder for functionality to work in the Stubs
  return params.get("adventure")
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let data = await fetch(`${config.backendEndpoint}/adventures/detail/?adventure=${adventureId}`);
    let adventureDetails = (await data).json();
    return await adventureDetails
  }
  catch (error) {
    return null;
  } 
  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById('adventure-name').innerHTML = `${adventure.name}`
  document.getElementById('adventure-subtitle').innerHTML = `${adventure.subtitle}`
  adventure.images.forEach(image => {
    let div = document.createElement("div");
    div.innerHTML = `<img src=${image} class='activity-card-image'>`
    document.getElementById("photo-gallery").append(div)
  })
  document.getElementById('adventure-content').innerText=`${adventure.content}`
  //console.log(adventure)

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  
  document.getElementById('photo-gallery').innerHTML = ""
  document.getElementById('photo-gallery').innerHTML=`<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
</div>`
  
  
 let carouselInner = document.createElement("div");
  carouselInner.classList.add("carousel-inner");
  images.forEach((img,idx) =>{
    let carouselItem = document.createElement("div");
    if(idx === 0){
      carouselItem.classList.add("carousel-item","active");
    }else{
      carouselItem.classList.add("carousel-item");
    }
    let image = document.createElement("img");
    image.setAttribute("src", img);
    image.classList.add("d-block", "w-100", "activity-card-image");
    carouselItem.append(image);
    carouselInner.append(carouselItem);
  })
  document.getElementById("carouselExampleIndicators").append(carouselInner);

  let button = document.createElement("div");
  button.innerHTML=`<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>`
  document.getElementById('carouselExampleIndicators').append(button)
 
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  
  if (adventure.available) {
    document.getElementById("reservation-panel-sold-out").style.display = "none"
    document.getElementById("reservation-panel-available").style.display = "block"
    document.getElementById("reservation-person-cost").innerHTML=`${adventure.costPerHead}`
  }
  else {
    document.getElementById("reservation-panel-sold-out").style.display = "block"
    document.getElementById("reservation-panel-available").style.display = "none"
    document.getElementById("reservation-person-cost").innerHTML=""
  }
  

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let totalCost=adventure.costPerHead*persons
  //console.log(persons)
  document.getElementById("reservation-cost").innerHTML = totalCost


}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let formData = document.getElementById("myForm")
  formData.addEventListener("submit", async (event) => {
    event.preventDefault()
    let data = {};
    data["name"] = formData.elements["name"].value
    data["date"] = formData.elements["date"].value
    data["person"] = formData.elements["person"].value
    data["adventure"] = adventure.id;
    try {
      let post = await fetch(`${config.backendEndpoint}/reservations/new`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      let response = await post.json();
      if (response.success === true) {
        alert("Success!")
        location.reload();
      }
      else {
        alert("Failed!");
      }
    }
    catch (error) {
      alert("Failed!");
    }
  
  })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved == true){
    document.getElementById("reserved-banner").style.display = "block";
  }else{
    document.getElementById("reserved-banner").style.display = "none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
