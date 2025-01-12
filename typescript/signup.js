document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
  
    signupForm.addEventListener("submit", async function (event) {
      event.preventDefault();
  
      const formData = {
        firstName: document.getElementById("firstName").value,
        middleName: document.getElementById("middleName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        phoneNumber: document.getElementById("phoneNumber").value,
      };
  
      try {
        const response = await fetch("http://localhost:8000/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (!response.ok) {
          throw new Error(`Failed to sign up: ${response.statusText}`);
        }
  
        const data = await response.json();
        console.log("User signed up successfully:", data);

        // set the user id in local storage
        localStorage.setItem("user", JSON.stringify(data.user))
        localStorage.setItem("access_token", data.access_token)

        // Redirect to the home page
        window.location.href="./Home.html"

      } catch (error) {
        console.error("Error signing up:", error);
        // Show error message
      }
    });
  });