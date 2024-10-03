import axios from 'axios';
import { API_URL } from '../config/config';

export const fetchArticles = async (token) => {
    try {
        const response = await axios.get(`${API_URL}dashboard/artikels`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const deleteArticle = async (articleId, token) => {
  try {
      const response = await axios.delete(`${API_URL}dashboard/artikels/${articleId}`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });

      return response.data;
  } catch (error) {
      throw new Error(error);
  }
};

export const addArticle = async (articleData, token) => {
  try {
      const response = await axios.post(`${API_URL}dashboard/artikels`, articleData, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      return response.data;
  } catch (error) {
      throw new Error(error);
  }
};

export const fetchArticleById = async (id, token) => {
    try {
        const response = await axios.get(`${API_URL}dashboard/artikels/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const updateArticle = async (id, articleData, token) => {
    try {
        const response = await axios.post(`${API_URL}dashboard/artikels/${id}`, articleData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Failed to update article');
    }
};
