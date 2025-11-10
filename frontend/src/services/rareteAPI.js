import api from './api';

export const getRaretes = async () => {
  const response = await api.get('/api/allRaretes');
  return response.data;
};
