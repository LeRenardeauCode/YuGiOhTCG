import mysql from 'mysql2/promise';

// creation de la connexion à la base de données
const connexion = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// test de la connexion
connexion.getConnection()
// si la connexion est réussie
    .then(() =>
    console.log("database OK 🟢"))
    // si la connexion échoue
    .catch(error => console.error("database KO 🔴​", error));

export default connexion