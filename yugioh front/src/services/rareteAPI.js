import axios from 'axios';

const backendBaseUrl = 'http://localhost:3000';

export const getRaretes = async () => {
  const response = await axios.get(`${backendBaseUrl}/api/allRaretes`);
  return response.data;
};