import axios from 'axios';

//const API_URL = 'http://localhost:8000/api/v1/dashboard/';
const API_URL = 'https://api.harvestabadi.com/api/v1/dashboard';

export const fetchProjects = async (token) => {
    try {
        const response = await axios.get(`${API_URL}projects`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const fetchProjectById = async (id, token) => {
    try {
        const response = await axios.get(`${API_URL}projects/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const addProject = async (projectData, token) => {
    try {
        const response = await axios.post(`${API_URL}projects`, projectData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const updateProject = async (id, projectData, token) => {
    try {
        const response = await axios.post(`${API_URL}projects/${id}`, projectData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const deleteProject = async (id, token) => {
    try {
        const response = await axios.delete(`${API_URL}projects/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};
