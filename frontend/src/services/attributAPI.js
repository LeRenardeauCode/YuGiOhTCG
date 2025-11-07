import axios from 'axios';

const backendBaseUrl = 'http://localhost:3000';

export const getAttributs = async () => {
  const response = await axios.get(`${backendBaseUrl}/api/allAttributs`);
  return response.data;
};