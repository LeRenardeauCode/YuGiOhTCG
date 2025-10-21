import connexion from '../config/bdd.js';

export const createEdition = async (nomEdition, codeEdition, dateEdition, typeImpression) => {
  const sql = "INSERT INTO edition (NomEdition, CodeEdition, DateEdition, TypeImpression) VALUES (?,?,?,?)";
  const [result] = await connexion.query(sql, [nomEdition, codeEdition, dateEdition, typeImpression]);
  return result;
};
