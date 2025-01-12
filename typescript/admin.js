document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("user"));


  if (!user || user.role !== 'ADMIN') {
    alert("Access denied. Admins only.");
    window.location.href = "./signin.html";
    return;
  }
  
  console.log("user........................",user)
  
  const createRouteForm = document.getElementById("createRouteForm");
  const updateRouteForm = document.getElementById("updateRouteForm");
  const deleteRouteForm = document.getElementById("deleteRouteForm");
  const assignRoleForm = document.getElementById("assignRoleForm");

  // Handle create route
  createRouteForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = {
      departure: document.getElementById("createDeparture").value,
      destination: document.getElementById("createDestination").value,
      departureTime: document.getElementById("createDepartureTime").value,
      departurePlace: document.getElementById("createDeparturePlace").value,
      price: document.getElementById("createPrice").value,
      seats: document.getElementById("createSeats").value,
      isAvailable: document.getElementById("createIsAvailable").value === "true",
    };

    try {
      const response = await fetch("http://localhost:8000/routes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create route: ${response.statusText}`);
      }

      alert("Route created successfully!");
      createRouteForm.reset();
    } catch (error) {
      console.error("Error creating route:", error);
      alert("Error creating route. Please try again later.");
    }
  });

  // Handle update route
  updateRouteForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const routeId = document.getElementById("updateRouteId").value;
    const formData = {
      departure: document.getElementById("updateDeparture").value,
      destination: document.getElementById("updateDestination").value,
      departureTime: document.getElementById("updateDepartureTime").value,
      departurePlace: document.getElementById("updateDeparturePlace").value,
      price: document.getElementById("updatePrice").value,
      seats: document.getElementById("updateSeats").value,
      isAvailable: document.getElementById("updateIsAvailable").value === "true",
    };

    try {
      const response = await fetch(`http://localhost:8000/routes/${routeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update route: ${response.statusText}`);
      }

      alert("Route updated successfully!");
      updateRouteForm.reset();
    } catch (error) {
      console.error(error);
    }
  });
});
