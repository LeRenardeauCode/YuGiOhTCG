// importation du module express
import express from "express";
import "dotenv/config";
import connexion from "./config/bdd.js";

// création de l'application express
const app = express();

app.use(express.json()); // Middleware global pour parser JSON

// définition de la route pour l'URL /accueil
app.get("/", (req, res) => {
  // envoi de la réponse "Hello World"
  res.send("Hello ewan");
});

app.get("/users", async (req, res) => {
  try {
    const [utilisateurs] = await connexion.query("SELECT * FROM user");
    res.status(200).json({
      message: "Utilisateurs récupérés avec succès",
      utilisateurs,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
  }
});

app.get("/cards", async (req, res) => {
  try {
    const [cartes] = await connexion.query("SELECT * FROM carte");
    res.status(200).json(cartes);
  } catch (error) {
    console.error("Erreur lors de la récupération des cartes", error);
  }
});

// démarrage du serveur sur le port 3000
app.listen(3000, () => {
  // message dans la console lorsque le serveur est démarré
  console.log("Serveur démarré sur le port 3000 🟢​");
});
