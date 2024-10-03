import axios from 'axios';
import { API_URL } from '../config/config';

export const fetchServices = async (token) => {
    try {
        const response = await axios.get(`${API_URL}dashboard/services`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const fetchServiceById = async (id, token) => {
    try {
        const response = await axios.get(`${API_URL}dashboard/services/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const createService = async (data, token) => {
    try {
        const response = await axios.post(`${API_URL}dashboard/services`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const updateService = async (id, data, token) => {
    try {
        const response = await axios.post(`${API_URL}dashboard/services/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const deleteService = async (id, token) => {
    try {
        const response = await axios.delete(`${API_URL}dashboard/services/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};
