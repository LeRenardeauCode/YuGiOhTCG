// importation du module express
import express from "express";
// importation du fichier .env pour les données sensibles
import "dotenv/config";
// importation de la connexion à la BDD MYSQL
import connexion from "./config/bdd.js";
// importation des routes utilisateurs
import userRoute from './Routes/userRoute.js';
import cardRoute from './Routes/cardRoute.js';
import deckRoute from './Routes/deckRoute.js';
import collectionRoute from './Routes/collectionRoute.js';
import typecardRoute from "./Routes/typecardRoute.js";
import editionRoute from "./Routes/editionRoute.js";
import rareteRoute from "./Routes/rareteRoute.js";
import attributRoute from "./Routes/attributRoute.js";

// création de l'application express
const app = express();

// Middleware global pour parser JSON
app.use(express.json());


app.use('/api', userRoute);
app.use('/api', cardRoute);
app.use('/api', deckRoute);
app.use('/api', collectionRoute);
app.use("/api", typecardRoute);
app.use("/api", editionRoute);
app.use("/api", rareteRoute);
app.use("/api", attributRoute);

// définition de la route pour l'URL /accueil
// mauvaise méthode

// app.get("/", (req, res) => {
//   // envoi de la réponse "Hello World"
//   res.send("Hello ewan");
// });

// app.get("/users", async (req, res) => {
//   try {
//     const [utilisateurs] = await connexion.query("SELECT * FROM user");
//     res.status(200).json({
//       message: "Utilisateurs récupérés avec succès",
//       utilisateurs,
//     });
//   } catch (error) {
//     console.error("Erreur lors de la récupération des utilisateurs:", error);
//   }
// });

// app.get("/cards", async (req, res) => {
//   try {
//     const [cartes] = await connexion.query("SELECT * FROM carte");
//     res.status(200).json(cartes);
//   } catch (error) {
//     console.error("Erreur lors de la récupération des cartes", error);
//   }
// });

// démarrage du serveur sur le port 3000
app.listen(3000, () => {
  // message dans la console lorsque le serveur est démarré
  console.log("Serveur démarré sur le port 3000 🟢​");
});
