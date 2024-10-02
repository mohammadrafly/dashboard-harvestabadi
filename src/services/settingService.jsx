import axios from 'axios';

//const API_URL = 'https://api.harvestabadi.com/api/v1/';
const API_URL = 'http://localhost:8000/api/v1/dashboard/setting/';

export const getWhatsAppNumber = async (token) => {
    try {
        const response = await axios.get(`${API_URL}whatsapp-number`, {
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
        const response = await axios.post(`${API_URL}whatsapp-number`, data, {
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
