window.onload = function (): void {
    // Hide the original card created in HTML
    const originalCard = document.getElementById('originalCard') as HTMLElement | null;
    if (originalCard) {
        originalCard.style.display = 'none'; // Hide the first card
    }

    // Get the container where new cards will be appended
    const cardContainer = document.getElementById('cardContainer') as HTMLElement | null;
    if (!cardContainer) {
        console.error("Card container element not found.");
        return; // Exit if card container is missing
    }

    // Define the type for card content
    interface CardContent {
        city1: string;
        city2: string;
    }

    // An array of content for each card
    const cardContent: CardContent[] = [
        { city1: "Adama", city2: "Addis Ababa" },
        { city1: "Addis Ababa", city2: "Adama" },
        { city1: "Addis Ababa", city2: "Hawassa" },
        { city1: "Hawassa", city2: "Addis Ababa" },
        { city1: "Addis Ababa", city2: "Gondor" },
        { city1: "Gondor", city2: "Addis Ababa" },
        { city1: "Bahir Dar", city2: "Addis Ababa" },
        { city1: "Addis Ababa", city2: "Bahir Dar" },
        { city1: "Addis Ababa", city2: "Harar" },
        { city1: "Harar", city2: "Addis Ababa" },
        { city1: "Addis Ababa", city2: "Jimma" },
        { city1: "Jimma", city2: "Addis Ababa" },
        { city1: "Addis Ababa", city2: "Debre Markos" },
        { city1: "Debre Markos", city2: "Addis Ababa" },
        { city1: "Sodo", city2: "Addis Ababa" },
        { city1: "Addis Ababa", city2: "Sodo" },
        { city1: "Mekele", city2: "Addis Ababa" },
        { city1: "Addis Ababa", city2: "Mekele" },
        { city1: "Addis Ababa", city2: "Yirga Chefe" },
        { city1: "Yirga Chefe", city2: "Addis Ababa" },
        { city1: "Addis Ababa", city2: "Adigrat" },
        { city1: "Adigrat", city2: "Addis Ababa" },
        { city1: "Addis Ababa", city2: "Gambela" },
        { city1: "Gambela", city2: "Addis Ababa" },
        { city1: "Addis Ababa", city2: "Debre Berhan" },
        { city1: "Debre Berhan", city2: "Addis Ababa" },
        { city1: "Shashemene", city2: "Addis Ababa" },
        { city1: "Addis Ababa", city2: "Shashemene" },
        { city1: "Addis Ababa", city2: "Robe" },
        { city1: "Robe", city2: "Addis Ababa" },
        { city1: "Addis Ababa", city2: "Dire dawa" },
        { city1: "Dire dawa", city2: "Addis Ababa" },
    ];

    // Generate and append the new cards
    cardContent.forEach((content) => {
        const card = document.createElement('div');
        card.className = 'card col-md-4 mb-4';
        card.style.width = '18rem';

        // Set the card content dynamically from the array
        card.innerHTML = `
        <div class="card-body">
          <p>${content.city1}</p>
          <div class="icon">
            <img
              src="./assets/image/icon/material-symbols_line-start-arrow-notch-rounded.png"
              alt="Arrow Icon"
            />
          </div>
          <p>${content.city2}</p>
        </div>
      `;

        // Append the card to the container
        cardContainer.appendChild(card);
    });

    // Show the card container with the new cards
    cardContainer.style.display = 'flex';
};
  