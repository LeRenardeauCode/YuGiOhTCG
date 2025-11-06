import axios from 'axios';

const backendBaseUrl = 'http://localhost:3000';

export const getEditions = async () => {
  const response = await axios.get(`${backendBaseUrl}/api/allEditions`);
  return response.data;
};