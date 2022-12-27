import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    let getData = await fetch(`${config.backendEndpoint}/reservations/`)
    let data = await getData.json();
    return data;
  }
  catch (error) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  //TODO: MODULE_RESERVATIONS
  if (reservations.length <= 0) {
    document.getElementById("reservation-table-parent").style.display = "none";
    document.getElementById("no-reservation-banner").style.display= "block"
  }
  else {
    document.getElementById("reservation-table-parent").style.display = "block";
    document.getElementById("no-reservation-banner").style.display = "none"
    
    reservations.forEach(reservation => {
      let localDate = new Date(reservation.time)
      let row = document.createElement("tr");
      row.setAttribute("id",`${reservation.id}`)
      row.innerHTML = `<td><a href = "../detail/?adventure=${reservation.adventure}">${reservation.id}</a></td>
    <td>${reservation.name}</td>
    <td>${reservation.adventureName}</td>
    <td>${reservation.person}</td>
    <td>${localDate.toLocaleDateString('en-IN')}</td>
    <td>${reservation.price}</td>
    <td>${localDate.toLocaleDateString('en-IN',{ day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}</td>
    <td><a href = "../detail/?adventure=${reservation.adventure}"><button class="reservation-visit-button">Visit Adventure</button></a></td>`
      document.getElementById("reservation-table").append(row)
    }
    )
  }
  //   if(reservations.length!==0){
  //     document.getElementById("reservation-table-parent").style.display = "block";
  //     document.getElementById("no-reservation-banner").style.display = "none";
      
  //   let reservationBody = document.getElementById("reservation-table");
  //     reservations.forEach(reservation => {
  //     let BookingDate = new Date(reservation.date)
  //     let BookingTime = new Date(reservation.time)
  //     let tRow = document.createElement("tr");
  //     tRow.setAttribute('id',reservation.id)
  //     tRow.innerHTML = `<td><a href = '../detail/?adventure=${reservation.adventure}'>${reservation.id}</a></td>
  //                       <td>${reservation.name}</td>
  //                       <td>${reservation.adventureName}</td>
  //                       <td>${reservation.person}</td>
  //                       <td>${BookingDate.toLocaleDateString('en-IN')}</td>
  //                       <td>${reservation.price}</td>
  //                       <td>${BookingTime.toLocaleDateString('en-IN',{ day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}</td>
  //                       <td><a href = "../detail/?adventure=${reservation.adventure}"><button class="reservation-visit-button">Visit Adventure</button></a></td>`;
  //     reservationBody.append(tRow);
  //   })
  // }else{
  //   document.getElementById("reservation-table-parent").style.display = "none";
  //   document.getElementById("no-reservation-banner").style.display = "block";
  // }
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective reservation
    The last column of the table should have a "Visit reservation" button with id=<reservation-id>, class=reservation-visit-button and should link to respective reservation page

    Note:
    1. The date of reservation booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
