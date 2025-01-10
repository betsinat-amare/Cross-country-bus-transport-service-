// Get form containers
const LoginPage = document.getElementById('loginPage') as HTMLDivElement;
const signupPage = document.getElementById('signupPage') as HTMLDivElement;

// Get navigation links
const goToSignup = document.getElementById('goToSignup') as HTMLAnchorElement;
const goToLogin = document.getElementById('goToLogin') as HTMLAnchorElement;

// Handle "Create new account" link
goToSignup.addEventListener('click', (event) => {
    event.preventDefault();
    loginPage.classList.add('hidden');
    signupPage.classList.remove('hidden');
});

// Handle "Login" link
goToLogin.addEventListener('click', (event) => {
    event.preventDefault();
    signupPage.classList.add('hidden');
    loginPage.classList.remove('hidden');
});
// Get references to elements
const loginPage = document.getElementById('loginPage') as HTMLElement;
const profilePage = document.getElementById('profilePage') as HTMLElement;
const editProfilePage = document.getElementById('editProfilePage') as HTMLElement;
const loginForm = document.getElementById('loginForm') as HTMLFormElement;
const editProfileForm = document.getElementById('editProfileForm') as HTMLFormElement;
const profilePicture = document.getElementById('profilePicture') as HTMLElement;
const displayName = document.getElementById('displayName') as HTMLElement;
const displayEmail = document.getElementById('displayEmail') as HTMLElement;
const displayPhone = document.getElementById('displayPhone') as HTMLElement;
const logoutButton = document.getElementById('logoutButton') as HTMLButtonElement;
const editButton = document.getElementById('editButton') as HTMLButtonElement;
const cancelEdit = document.getElementById('cancelEdit') as HTMLButtonElement;

// Variables to store user data
let userName = "";
let userEmail = "";
let userPhone = "";

// Event listener for login
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Assume login is successful
    userPhone = (document.getElementById('loginPhone') as HTMLInputElement).value;
    userName = "Default User"; // Default name
    userEmail = "default@example.com"; // Default email

    // Display profile data
    updateProfilePage();

    // Switch to profile page
    loginPage.classList.add('hidden');
    profilePage.classList.remove('hidden');
});

// Event listener for editing profile
editButton.addEventListener('click', () => {
    profilePage.classList.add('hidden');
    editProfilePage.classList.remove('hidden');

    // Pre-fill form with current data
    (document.getElementById('editName') as HTMLInputElement).value = userName;
    (document.getElementById('editEmail') as HTMLInputElement).value = userEmail;
    (document.getElementById('editPhone') as HTMLInputElement).value = userPhone;
});

// Event listener for saving edited profile
editProfileForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Update user information
    userName = (document.getElementById('editName') as HTMLInputElement).value;
    userEmail = (document.getElementById('editEmail') as HTMLInputElement).value;
    userPhone = (document.getElementById('editPhone') as HTMLInputElement).value;

    // Update profile page
    updateProfilePage();

    // Switch back to profile page
    editProfilePage.classList.add('hidden');
    profilePage.classList.remove('hidden');
});

// Event listener for canceling edit
cancelEdit.addEventListener('click', () => {
    editProfilePage.classList.add('hidden');
    profilePage.classList.remove('hidden');
});

// Event listener for logging out
logoutButton.addEventListener('click', () => {
    profilePage.classList.add('hidden');
    loginPage.classList.remove('hidden');
});

// Function to update the profile page with user data
function updateProfilePage(): void {
    displayName.textContent = userName;
    displayEmail.textContent = userEmail;
    displayPhone.textContent = userPhone;

    // Update profile picture letter
    const firstLetter = userName.charAt(0).toUpperCase();
    profilePicture.textContent = firstLetter;
}

