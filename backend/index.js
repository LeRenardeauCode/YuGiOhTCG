// importation du module express
import express from "express";
// importation du fichier .env pour les données sensibles
import "dotenv/config";
// importation des routes utilisateurs
import userRoute from './Routes/userRoute.js';
import cardRoute from './Routes/cardRoute.js';
import deckRoute from './Routes/deckRoute.js';
import collectionRoute from './Routes/collectionRoute.js';
import typecardRoute from "./Routes/typecardRoute.js";
import editionRoute from "./Routes/editionRoute.js";
import rareteRoute from "./Routes/rareteRoute.js";
import attributRoute from "./Routes/attributRoute.js";
import authRoute from "./Routes/authRoute.js";

import cors from 'cors';

// création de l'application express
const app = express();

// middleware pour autoriser les requêtes cross-origin
app.use(cors());

// Middleware global pour parser JSON
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api', userRoute);
app.use('/api', cardRoute);
app.use('/api', deckRoute);
app.use('/api', collectionRoute);
app.use("/api", typecardRoute);
app.use("/api", editionRoute);
app.use("/api", rareteRoute);
app.use("/api", attributRoute);


// démarrage du serveur sur le port 3000
app.listen(3000, () => {
  // message dans la console lorsque le serveur est démarré
  console.log("Serveur démarré sur le port 3000 🟢​");
});
