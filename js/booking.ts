import { createBooking } from './api';

document.getElementById('booking-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = {
    firstName: (document.getElementById('booking-firstName') as HTMLInputElement).value,
    middleName: (document.getElementById('booking-middleName') as HTMLInputElement).value,
    lastName: (document.getElementById('booking-lastName') as HTMLInputElement).value,
    phoneNumber: (document.getElementById('booking-phoneNumber') as HTMLInputElement).value,
    busRouteId: parseInt((document.getElementById('booking-busRouteId') as HTMLInputElement).value, 10),
  };
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User not authenticated');
    }
    const response = await createBooking(formData, token);
    console.log('Booking successful:', response);
  } catch (error) {
    console.error('Booking error:', error);
  }
});