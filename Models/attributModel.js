import connexion from '../config/bdd.js';

export const createAttribut = async (nomAttribut) => {
  const sql = "INSERT INTO attribut (NomAttribut) VALUES (?)";
  const [result] = await connexion.query(sql, [nomAttribut]);
  return result;
};
