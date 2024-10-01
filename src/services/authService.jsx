import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}auth/login`, {
    email,
    password,
  });
  return response.data;
};

export const verifyToken = async (token) => {
  const response = await axios.get(`${API_URL}auth/verify/token`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const logout = async (token) => {
  const response = await axios.post(`${API_URL}dashboard/logout`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};