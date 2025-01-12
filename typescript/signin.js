document.addEventListener("DOMContentLoaded", function () {
    const signinForm = document.getElementById("signinForm");
  
    signinForm.addEventListener("submit", async function (event) {
      event.preventDefault();
  
      const formData = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      };
  
      try {
        const response = await fetch("http://localhost:8000/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (!response.ok) {
          throw new Error(`Failed to sign in: ${response.statusText}`);
        }
  
        const data = await response.json();
      
        console.log("User signed in successfully:", data);

         // set the user id in local storage
         localStorage.setItem("user", JSON.stringify(data.user))
         localStorage.setItem("access_token", data.access_token)

        // Redirect to the home page
        window.location.href="./Home.html"
      } catch (error) {
        console.error("Error signing in:", error);
        // Show error message
      }
    });
  });