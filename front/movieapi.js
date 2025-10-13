
import axios from 'axios';

const API_BASE = 'https://api.jikan.moe/v4';

const jikan = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

export const searchAnime = async (params) => {
  try {
    const response = await jikan.get('/anime', { params });
    return response.data.data; 
  } catch (error) {
    console.error('Jikan searchAnime error:', error);
    throw error;
  }
};

export {jikan}