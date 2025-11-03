import axios from 'axios';

// Créer une base URL réutilisable pour éviter de tout réécrire
const API = axios.create({
    baseURL: 'http://localhost:3000/api'
});

export default API;