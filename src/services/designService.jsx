import axios from 'axios';
import { API_URL } from '../config/config';

export const fetchDesigns = async (token) => {
    try {
        const response = await axios.get(`${API_URL}dashboard/designs`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching designs:', error);
        throw error;
    }
};

export const deleteDesign = async (designId, token) => {
    try {
        const response = await axios.delete(`${API_URL}dashboard/designs/${designId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting design:', error);
        throw error;
    }
};

export const createDesign = async (data, token) => {
  try {
      const response = await axios.post(`${API_URL}dashboard/designs`, data, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      return response.data;
  } catch (error) {
      console.error('Error creating design:', error);
      throw error;
  }
};

export const fetchDesignById = async (designId, token) => {
  try {
      const response = await axios.get(`${API_URL}dashboard/designs/${designId}`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      return response.data;
  } catch (error) {
      console.error('Error fetching design by ID:', error);
      throw error;
  }
};

export const updateDesign = async (designId, data, token) => {
  try {
      const response = await axios.post(`${API_URL}dashboard/designs/${designId}`, data, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      return response.data;
  } catch (error) {
      console.error('Error updating design:', error);
      throw error;
  }
};