import { signup, signin } from './api';

document.getElementById('signup-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = {
    firstName: (document.getElementById('firstName') as HTMLInputElement).value,
    middleName: (document.getElementById('middleName') as HTMLInputElement).value,
    lastName: (document.getElementById('lastName') as HTMLInputElement).value,
    phoneNumber: (document.getElementById('phoneNumber') as HTMLInputElement).value,
    email: (document.getElementById('email') as HTMLInputElement).value,
    password: (document.getElementById('password') as HTMLInputElement).value,
  };
  try {
    const response = await signup(formData);
    console.log('Signup successful:', response);
  } catch (error) {
    console.error('Signup error:', error);
  }
});

document.getElementById('signin-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = {
    email: (document.getElementById('signin-email') as HTMLInputElement).value,
    password: (document.getElementById('signin-password') as HTMLInputElement).value,
  };
  try {
    const response = await signin(formData);
    console.log('Signin successful:', response);
    localStorage.setItem('token', response.token);
  } catch (error) {
    console.error('Signin error:', error);
  }
});