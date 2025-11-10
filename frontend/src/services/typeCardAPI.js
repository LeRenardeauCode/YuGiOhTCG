import api from './api';

export const getTypes = async () => {
  const response = await api.get('/api/allTypecards');
  return response.data;
};
