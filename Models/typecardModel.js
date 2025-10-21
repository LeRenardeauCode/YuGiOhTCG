import connexion from '../config/bdd.js';

export const createTypeCard = async (nomType) => {
  const sql = "INSERT INTO type_carte (NomTypeCarte) VALUES (?)";
  const [result] = await connexion.query(sql, [nomType]);
  return result;
};