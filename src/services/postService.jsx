import axios from 'axios';

//const API_URL = 'http://localhost:8000/api/v1/dashboard/';
const API_URL = 'https://api.harvestabadi.com/api/v1/dashboard/';

export const fetchArticles = async (token) => {
    try {
        const response = await axios.get(`${API_URL}artikels`, {
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
      const response = await axios.delete(`${API_URL}artikels/${articleId}`, {
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
      const response = await axios.post(`${API_URL}artikels`, articleData, {
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
        const response = await axios.get(`${API_URL}artikels/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const updateArticle = async (id, articleData, token) => {
    try {
        const response = await axios.post(`${API_URL}artikels/${id}`, articleData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Failed to update article');
    }
};
