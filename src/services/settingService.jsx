import axios from 'axios';
import { API_URL } from '../config/config';

export const getWhatsAppNumber = async (token) => {
    try {
        const response = await axios.get(`${API_URL}dashboard/setting/whatsapp-number`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching WhatsApp number:', error);
        throw error;
    }
};

export const saveWhatsAppNumber = async (token, data) => {
    try {
        const response = await axios.post(`${API_URL}dashboard/setting/whatsapp-number`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Error saving WhatsApp number:', error);
        throw error;
    }
};

export const getFeaturedImage = async (token) => {
    try {
        const response = await axios.get(`${API_URL}dashboard/setting/featured-image`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching Featured image:', error);
        throw error;
    }
};

export const saveFeaturedImage = async (token, data) => {
    try {
        const response = await axios.post(`${API_URL}dashboard/setting/featured-image`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Error saving Featured image:', error);
        throw error;
    }
};
