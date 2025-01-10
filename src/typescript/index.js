console.log("Script loaded")
window.onload = function () {
  const cardContainer = document.getElementById("cardContainer");
  const thirdCard = document.getElementById("thirdCard");
  const departureCityEl = document.getElementById("departureCity");
  const arrivalCityEl = document.getElementById("arrivalCity");
  const priceText = document.getElementById("priceText");
  const bookingForm = document.getElementById("bookingForm");
  const departureInput = document.getElementById("departure");
  const arrivalInput = document.getElementById("arrival");

  const cardContent = [
    { city1: "Addis Ababa", city2: "Adama", price: "300 ETB" },
    { city1: "Addis Ababa", city2: "Hawassa", price: "500 ETB" },
    { city1: "Addis Ababa", city2: "Jimma", price: "1,050 ETB" },
    { city1: "Addis Ababa", city2: "Gondar", price: "800 ETB" },
    { city1: "Addis Ababa", city2: "Bahir Dar", price: "600 ETB" },
    { city1: "Addis Ababa", city2: "Harar", price: "400 ETB" },
    { city1: "Addis Ababa", city2: "Debre Markos", price: "350 ETB" },
    { city1: "Addis Ababa", city2: "Mekele", price: "750 ETB" },
    { city1: "Addis Ababa", city2: "Yirga Chefe", price: "450 ETB" },
    { city1: "Addis Ababa", city2: "Adigrat", price: "700 ETB" },
    { city1: "Addis Ababa", city2: "Gambela", price: "1,200 ETB" },
    { city1: "Addis Ababa", city2: "Debre Berhan", price: "500 ETB" },
    { city1: "Addis Ababa", city2: "Shashemene", price: "550 ETB" },
    { city1: "Addis Ababa", city2: "Robe", price: "650 ETB" },
    { city1: "Addis Ababa", city2: "Dire Dawa", price: "800 ETB" },
  ];

  cardContent.forEach((content) => {
    const card = document.createElement("div");
    card.className = "card col-md-4 m-3 p-3 border shadow";
    card.style.cursor = "pointer";

    card.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; height: 120px;">
        <p style="margin: 0;">
          <strong>${content.city1}</strong>
        </p>
        <img
          src="./assets/image/icon/material-symbols_line-start-arrow-notch-rounded.png"
          alt="Arrow Icon"
          style="width: 20px; height: 20px;"
        />
        <p style="margin: 0;">
          <strong>${content.city2}</strong>
        </p>
      </div>
    `;

    // Card click behavior
    card.addEventListener("click", () => {
      cardContainer.style.display = "none"; // Hide all cards
      thirdCard.style.display = "block"; // Show the "Book Ticket Here" section
      departureCityEl.textContent = content.city1;
      arrivalCityEl.textContent = content.city2;
      priceText.textContent = content.price;
    });

    cardContainer.appendChild(card);
  });

  // "Book Ticket Here" button click behavior
  const bookTicketButton = document.getElementById("bookTicketButton");
  bookTicketButton.addEventListener("click", () => {
    thirdCard.style.display = "none"; // Hide the "Book Ticket Here" section
    bookingForm.style.display = "block"; // Show the booking form
    departureInput.value = departureCityEl.textContent;
    arrivalInput.value = arrivalCityEl.textContent;
    priceInput.value = priceText.textContent;
  });
};
