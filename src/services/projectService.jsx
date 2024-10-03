import axios from 'axios';
import { API_URL } from '../config/config';

export const fetchProjects = async (token) => {
    try {
        const response = await axios.get(`${API_URL}dashboard/projects`, {
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
        const response = await axios.get(`${API_URL}dashboard/projects/${id}`, {
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
        const response = await axios.post(`${API_URL}dashboard/projects`, projectData, {
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
        const response = await axios.post(`${API_URL}dashboard/projects/${id}`, projectData, {
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
        const response = await axios.delete(`${API_URL}dashboard/projects/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};
