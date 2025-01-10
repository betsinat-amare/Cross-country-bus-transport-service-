window.onload = async function () {
  const cardContainer = document.getElementById("cardContainer");
  const thirdCard = document.getElementById("thirdCard");
  const departureCityEl = document.getElementById("departureCity");
  const priceText = document.getElementById("priceText");
  const bookingForm = document.getElementById("bookingForm");
  const departureInput = document.getElementById("departure");
  const arrivalInput = document.getElementById("arrival");
  const priceInput = document.getElementById("price");

  // Fetch data from backend API
  try {
    const response = await fetch("http://localhost:8000/routes");
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const routes = await response.json();

    // Generate cards dynamically from fetched data
    routes.forEach((route) => {
      const card = document.createElement("div");
      card.className = "card col-md-4 m-3 p-3 border shadow";
      card.style.cursor = "pointer";

      card.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; height: 120px;">
          <p style="margin: 0;">
            <strong>${route.departure}</strong>
          </p>
          <img
            src="./assets/image/Vector (4).png"
            alt="Arrow Icon"
            style="width: 20px; height: 20px;"
          />
          <p style="margin: 0;">
            <strong>${route.destination}</strong>
          </p>
        </div>
      `;

      // Add event listener to handle card click
      card.addEventListener("click", () => {
        cardContainer.style.display = "none";
        thirdCard.style.display = "block";

        // Update thirdCard content dynamically
        departureCityEl.textContent = route.departure;
        const timeAndDateHTML = `
          ${route.time || "N/A"}
        `;
        departureCityEl.nextElementSibling.innerHTML = timeAndDateHTML; 
        priceText.textContent = `Price: ${route.price} ETB`;
      });

      cardContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching card data:", error);
  }

  // Handle "Book Ticket" button click
  const bookTicketButton = document.getElementById("bookTicketButton");
  if (bookTicketButton) {
    bookTicketButton.addEventListener("click", () => {
      thirdCard.style.display = "none";
      bookingForm.style.display = "block";
      departureInput.value = departureCityEl.textContent || "";
      arrivalInput.value = departureCityEl.nextElementSibling.textContent || "";
      priceInput.value = priceText.textContent.replace("Price: ", "") || "";
    });
  }
};






// console.log("Script loaded")
// window.onload = function () {
//   const cardContainer = document.getElementById("cardContainer");
//   const thirdCard = document.getElementById("thirdCard");
//   const departureCityEl = document.getElementById("departureCity");
//   const arrivalCityEl = document.getElementById("arrivalCity");
//   const priceText = document.getElementById("priceText");
//   const bookingForm = document.getElementById("bookingForm");
//   const departureInput = document.getElementById("departure");
//   const arrivalInput = document.getElementById("arrival");

  // const cardContent = [
  //   { city1: "Addis Ababa", city2: "Adama", price: "300 ETB" },
  //   { city1: "Addis Ababa", city2: "Hawassa", price: "500 ETB" },
  //   { city1: "Addis Ababa", city2: "Jimma", price: "1,050 ETB" },
  //   { city1: "Addis Ababa", city2: "Gondar", price: "800 ETB" },
  //   { city1: "Addis Ababa", city2: "Bahir Dar", price: "600 ETB" },
  //   { city1: "Addis Ababa", city2: "Harar", price: "400 ETB" },
  //   { city1: "Addis Ababa", city2: "Debre Markos", price: "350 ETB" },
  //   { city1: "Addis Ababa", city2: "Mekele", price: "750 ETB" },
  //   { city1: "Addis Ababa", city2: "Yirga Chefe", price: "450 ETB" },
  //   { city1: "Addis Ababa", city2: "Adigrat", price: "700 ETB" },
  //   { city1: "Addis Ababa", city2: "Gambela", price: "1,200 ETB" },
  //   { city1: "Addis Ababa", city2: "Debre Berhan", price: "500 ETB" },
  //   { city1: "Addis Ababa", city2: "Shashemene", price: "550 ETB" },
  //   { city1: "Addis Ababa", city2: "Robe", price: "650 ETB" },
  //   { city1: "Addis Ababa", city2: "Dire Dawa", price: "800 ETB" },
  // ];

  // Add this to your index.html
  // <div id="routes-container">
  //   <div id="routes">
  //     <h2>Available Routes</h2>
  //     <ul id="routes-list"></ul>
  //   </div>
  // </div>
  
  
    // const response = await fetch('http://localhost:8000/routes');
    // const routes = await response.json();
    // routes.forEach(route => {
    //   const li = document.createElement('li');
    //   li.textContent = `${route.departure} to ${route.destination} - ${route.price} ETB`;
    //   routesList.appendChild(li);
    // });

 

//   cardContent.forEach((content) => {
//     const card = document.createElement("div");
//     card.className = "card col-md-4 m-3 p-3 border shadow";
//     card.style.cursor = "pointer";

//     card.innerHTML = `
//       <div style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; height: 120px;">
//         <p style="margin: 0;">
//           <strong>${content.city1}</strong>
//         </p>
//         <img
//         src="./assets/image/Vector (4).png"
          
//           alt="Arrow Icon"
//           style="width: 20px; height: 20px;"
//         />
//         <p style="margin: 0;">
//           <strong>${content.city2}</strong>
//         </p>
//       </div>
//     `;

   
//     card.addEventListener("click", () => {
//       cardContainer.style.display = "none"; 
//       thirdCard.style.display = "block"; 
//       departureCityEl.textContent = content.city1;
//       arrivalCityEl.textContent = content.city2;
//       priceText.textContent = content.price;
//     });

//     cardContainer.appendChild(card);
//   });

 
//   const bookTicketButton = document.getElementById("bookTicketButton");
//   bookTicketButton.addEventListener("click", () => {
//     thirdCard.style.display = "none"; 
//     bookingForm.style.display = "block"; 
//     departureInput.value = departureCityEl.textContent;
//     arrivalInput.value = arrivalCityEl.textContent;
//     priceInput.value = priceText.textContent;
//   });
// };
