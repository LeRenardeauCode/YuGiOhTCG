import API from './api'

// service pour les requêtes liées aux cartes

export const allCards = () => API.get('./allCards')