// Get form containers
const loginPage = document.getElementById('loginPage') as HTMLDivElement;
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
