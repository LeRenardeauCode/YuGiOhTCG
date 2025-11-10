import api from './api';

export const getAllCards = async () => {
  try {
    const response = await api.get('/api/allCards');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des cartes:', error);
    throw error;
  }
};

export const createCard = async (cardData) => {
  try {
    const response = await api.post('/api/card', cardData);
    return response.data;
  } catch (error) {
    console.error('Erreur dans createCard:', error);
    throw error;
  }
};
