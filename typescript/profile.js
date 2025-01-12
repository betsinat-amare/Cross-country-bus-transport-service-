document.addEventListener("DOMContentLoaded", async function () {
  console.log("Page loaded and script started.");

  const profileMenu = document.getElementById("profileMenu");
  const profileInitial = document.getElementById("profileInitial");
  const logout = document.getElementById("logout");
  const updateProfileForm = document.getElementById("updateProfileForm");
  const editProfileButton = document.getElementById("editProfile");
  const saveProfileButton = document.getElementById("saveProfile");
  const deleteProfileButton = document.getElementById("deleteProfile");

  try {
    // Check if user is logged in

    const user = JSON.parse(localStorage.getItem("user"));
    const access_token = localStorage.getItem("access_token")

    if (user === undefined) {
      console.error("User not logged in or token missing.");
      return (window.location.href = "./signin.html");
    }

    profileMenu.style.display = "block";
    profileInitial.textContent = user?.firstName?.charAt(0).toUpperCase() || "U";


    // Fetch user profileSSSSS
    console.log("Fetching user profile...");
    const response = await fetch(`http://localhost:8000/user/profile?user_id=${user?.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      } 
    });

    if (!response.ok) {
      console.error(`Failed to fetch profile: ${response.statusText}`);
      throw new Error("Unable to fetch user profile. Please check the server.");
    }

    const userProfile = await response.json();
    console.log("User profile fetched successfully:", userProfile);

    // Populate profile fields
    document.getElementById("firstName").value = userProfile.firstName || "";
    document.getElementById("middleName").value = userProfile.middleName || "";
    document.getElementById("lastName").value = userProfile.lastName || "";
    document.getElementById("phoneNumber").value = userProfile.phoneNumber || "";
    document.getElementById("email").value = userProfile.email || "";
  } catch (error) {
    console.error("Error in fetching user profile:", error);
    alert("Error fetching profile. Please try again later.");
  }

  // Logout logic
  logout.addEventListener("click", async () => {
    try {
      const response = await fetch("http://localhost:8000/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Logout failed: ${response.statusText}`);
      }

      localStorage.removeItem("user");
      window.location.href = "./signin.html";
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Error logging out. Please try again later.");
    }
  });

  // Enable editing of profile
  editProfileButton.addEventListener("click", () => {
    ["firstName", "middleName", "lastName", "phoneNumber", "email"].forEach((id) => {
      document.getElementById(id).readOnly = false;
    });
    editProfileButton.style.display = "none";
    saveProfileButton.style.display = "block";
  });

  // Update profile logic
  updateProfileForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = {
      firstName: document.getElementById("firstName").value,
      middleName: document.getElementById("middleName").value,
      lastName: document.getElementById("lastName").value,
      phoneNumber: document.getElementById("phoneNumber").value,
      email: document.getElementById("email").value,
    };

    try {
      const response = await fetch("http://localhost:8000/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Profile update failed: ${response.statusText}`);
      }

      const updatedUser = await response.json();
      localStorage.setItem("user", JSON.stringify(updatedUser));
      alert("Profile updated successfully!");

      // Revert to read-only mode
      ["firstName", "middleName", "lastName", "phoneNumber", "email"].forEach((id) => {
        document.getElementById(id).readOnly = true;
      });
      editProfileButton.style.display = "block";
      saveProfileButton.style.display = "none";
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again later.");
    }
  });

  // Delete profile logic
  deleteProfileButton.addEventListener("click", async () => {
    if (confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
      try {
        const response = await fetch("http://localhost:8000/user/delete", {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Profile deletion failed: ${response.statusText}`);
        }

        localStorage.removeItem("user");
        alert("Profile deleted successfully!");
        window.location.href = "./signup.html";
      } catch (error) {
        console.error("Error deleting profile:", error);
        alert("Error deleting profile. Please try again later.");
      }
    }
  });
});
