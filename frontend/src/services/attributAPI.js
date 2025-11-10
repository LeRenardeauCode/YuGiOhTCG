import api from './api';

export const getAttributs = async () => {
  const response = await api.get('/api/allAttributs');
  return response.data;
};
