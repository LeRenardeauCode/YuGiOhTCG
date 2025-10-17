// importation du module express
import express from 'express';
import 'dotenv/config';
import connexion from './config/bdd.js';

// création de l'application express
const app = express();

// définition de la route pour l'URL /accueil
app.get('/', (req, res) => {
    // envoi de la réponse "Hello World"
    res.send('Hello World');
});

app.get('/users', (req, res) => {
    res.json([
        { nom: "toto", prenom: "titi"},
        { nom: "tata", prenom: "tutu"}
    ]);
});

app.get('/cards', (req, res) => {
    res.send('Voici les cartes');
});

// démarrage du serveur sur le port 3000
app.listen(3000, () => {
    // message dans la console lorsque le serveur est démarré
    console.log('Serveur démarré sur le port 3000 🟢​');
});