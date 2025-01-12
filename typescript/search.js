document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("searchForm");

  searchForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const from = document.getElementById("fromText").value;
    const to = document.getElementById("toText").value;

    if (!from || !to) {
      alert("Please enter both departure and destination.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/routes/${from}/${to}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch route: ${response.statusText}`);
      }

      const routes = await response.json();

      if (routes.length === 0) {
        alert("No routes found for the selected departure and destination.");
        return;
      }

      // Store the search results in localStorage
      localStorage.setItem("searchResults", JSON.stringify(routes));

      // Redirect to index.html
      window.location.href = "./index.html";
    } catch (error) {
      console.error("Error fetching route:", error);
      alert("Error fetching route. Please try again later.");
    }
  });
});