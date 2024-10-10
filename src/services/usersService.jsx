import axios from 'axios';
import { API_URL } from '../config/config';

export const fetchUsers = async (token) => {
    const response = await axios.get(`${API_URL}dashboard/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const fetchUserById = async (id, token) => {
  const response = await axios.get(`${API_URL}dashboard/users/${id}`, {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  });
  return response.data;
};


export const createUser = async (userData, token) => {
    const response = await axios.post(`${API_URL}dashboard/users`, userData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const updateUser = async (id, userData, token) => {
    const response = await axios.put(`${API_URL}dashboard/users/${id}`, userData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const deleteUser = async (id, token) => {
    const response = await axios.delete(`${API_URL}dashboard/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};