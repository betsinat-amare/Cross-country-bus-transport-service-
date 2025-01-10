const API_URL = 'http://localhost:8000';

export const signup = async (userData: any) => {
  const response = await fetch(`${API_URL}/user/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const signin = async (userData: any) => {
  const response = await fetch(`${API_URL}/user/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const createBooking = async (bookingData: any, token: string) => {
  const response = await fetch(`${API_URL}/booking`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(bookingData),
  });
  return response.json();
};

export const createPayment = async (paymentData: any, token: string) => {
  const response = await fetch(`${API_URL}/payment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(paymentData),
  });
  return response.json();
};