import connexion from '../config/bdd.js';

export const createRarete = async (nomRarete) => {
  const sql = "INSERT INTO rarete (NomRarete) VALUES (?)";
  const [result] = await connexion.query(sql, [nomRarete]);
  return result;
};
