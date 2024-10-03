import axios from 'axios';
import { API_URL } from '../config/config';

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


export const updateUserProfile = async (token, userData, email) => {
  const response = await axios.put(`${API_URL}dashboard/profile/${email}/update`, userData, {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  });
  return response.data;
};

export const updateUserPassword = async (token, { currentPassword, newPassword }, email) => {
  const response = await axios.put(`${API_URL}dashboard/profile/${email}/update/password`, { current_password: currentPassword, new_password: newPassword }, {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  });
  return response.data;
};