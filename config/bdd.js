import 'dotenv/config';
import mysql from 'mysql2/promise';

// creation de la connexion à la base de données
const connexion = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// test de la connexion
try {
  await connexion.ping();
  console.log("database OK 🟢");
} catch (error) {
  console.error("database KO 🔴", error);
}

export default connexion;