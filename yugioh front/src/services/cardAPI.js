import axios from 'axios';

const backendBaseUrl = 'http://localhost:3000';

export const getAllCards = async () => {
  try {
    const response = await axios.get(`${backendBaseUrl}/api/allCards`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des cartes:', error);
    throw error;
  }
};

export const createCard = async (cardData) => {
  try {
    const response = await axios.post(`${backendBaseUrl}/api/card`, cardData, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.error('Erreur dans createCard:', error);
    throw error;
  }
};
