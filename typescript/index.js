document.addEventListener("DOMContentLoaded", async function () {
  const cardContainer = document.getElementById("cardContainer");
  const thirdCard = document.getElementById("thirdCard");
  const departureCityEl = document.getElementById("departureCity");
  const destinationCityEl = document.getElementById("destinationCity");
  const priceText = document.getElementById("priceText");
  const timeEl= document.getElementById("time");
  const bookingForm = document.getElementById("bookingForm");
  const bookingFormElement = document.getElementById("bookingFormElement");
  const searchForm = document.getElementById("searchForm");
  let selectedRouteId = null; // Declare selectedRouteId in the correct scope
  const profileMenu = document.getElementById("profileMenu");
  const profileInitial = document.getElementById("profileInitial");

    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      profileMenu.style.display = "block";
      profileInitial.textContent = user.firstName.charAt(0).toUpperCase();

      if (user.role ==="ADMIN"){
        adminMenu.style.display="block";
      }
    }


 if (!cardContainer) {
  console.error("Card container not found");
    return;
 }
//new code
const searchResults = JSON.parse(localStorage.getItem("searchResults"));
if (searchResults && searchResults.length > 0) {
  const route = searchResults[0]; // Assuming you want to display the first result
  selectedRouteId = route.id; // Set selectedRouteId

  // Display the route details in the thirdCard container
  departureCityEl.textContent = route.departure;
  destinationCityEl.textContent = route.destination;
  priceText.textContent = `Price: ${route.price} ETB`;
  const isoDate = route.departureTime;
  const date = new Date(isoDate);
  const formattedDate = date.toLocaleString();
  timeEl.textContent = formattedDate;

  thirdCard.style.display = "block";

  // Clear search results from localStorage
  localStorage.removeItem("searchResults");
// till this 
  }else{
  console.log("Fetching routes...");

  try {
    const response = await fetch("http://localhost:8000/routes");

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const routes = await response.json();
    console.log(routes); // Log the response to check the data

    if (!routes || routes.length === 0) {
      cardContainer.textContent = "No routes found.";
      return;
    }

    routes.forEach((route) => {
      const card = document.createElement("div");
      card.className = "card col-md-4 m-3 p-3 border shadow";
      card.style.cursor = "pointer";
      const isoDate = route.departureTime;
    const date = new Date(isoDate);

// Format as normal date and time
    const formattedDate = date.toLocaleString();
  


      card.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; height: 120px;">
          <p style="margin: 0;"><strong>${route.departure}</strong></p>
          <img src="./assets/image/Vector (4).png" alt="Arrow Icon" style="width: 20px; height: 20px;" />
          <p style="margin: 0;"><strong>${route.destination}</strong></p>
          <p style="margin: 0;">${formattedDate}</p>
          <p style="margin: 0;">Price: ${route.price} ETB</p>
          <p style="margin: 0;">Available Seats: ${route.seats}</p>
          <p style="margin: 0;">:Passengers:${route.passengers}</p>
          
          
          
        </div>
      `;

      card.addEventListener("click", () => {
        cardContainer.style.display = "none";
        thirdCard.style.display = "block";
        selectedRouteId = route.id; // Set selectedRouteId when a card is clicked

        departureCityEl.textContent = route.departure;
        destinationCityEl.textContent = route.destination;
        priceText.textContent = `Price: ${route.price} ETB`;
      });

      cardContainer.appendChild(card);
    });
    } catch (error) {
      console.error('Error fetching routes:', error);
      cardContainer.textContent = "Error fetching routes.";

    }
  }

    document.getElementById("bookTicketButton").addEventListener("click", () => {
      thirdCard.style.display = "none";
      bookingForm.style.display = "block";
    });

    bookingFormElement.addEventListener("submit", async function (event) {
      event.preventDefault();

      const formData = {
        firstName: document.getElementById("firstName").value,
        middleName: document.getElementById("middleName").value,
        lastName: document.getElementById("lastName").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        busRouteId: selectedRouteId, // Use selectedRouteId here
      };

      try {
        const bookingResponse = await fetch("http://localhost:8000/booking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!bookingResponse.ok) {
          throw new Error(`Failed to book ticket: ${response.statusText}`);
        }

        const bookingdata = await bookingResponse.json();
        console.log("Booking successful:", bookingdata);
        //window.location.href = "./Home.html"; // Redirect to home page
        const paymentResponse=await fetch("http://localhost:8000/payment",{
          method:"POST",
          headers:{
            "Content-Type": "application/json",
          },
          body:JSON.stringify({bookingId:bookingdata.id}),
        });
        if(!paymentResponse.ok){
          throw new Error(`Faild to initiate payment:${paymentResponse.statusText}`)
        }
        const paymentData=await paymentResponse.json();
        console.log("Payment initiation successful:",paymentData);
        
        window.location.href=paymentData.data.checkout_url;
      } catch (error) {
        console.error("Error processing booking or payment:", error);
        // Show error message
      }
    });
  });

   