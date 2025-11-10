import api from './api';

export const getEditions = async () => {
  const response = await api.get('/api/allEditions');
  return response.data;
};
