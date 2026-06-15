import axios from 'axios';

const BASE_URL = 'https://legallite-ai-backend.onrender.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
});

export const analyzeContract = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
