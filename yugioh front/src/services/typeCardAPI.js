import axios from 'axios';

const backendBaseUrl = 'http://localhost:3000';

export const getTypes = async () => {
  const response = await axios.get(`${backendBaseUrl}/api/allTypecards`);
  return response.data;
};