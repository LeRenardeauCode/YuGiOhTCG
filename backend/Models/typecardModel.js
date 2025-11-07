import connexion from '../config/bdd.js';


export const getAllTypecards = async () => {
  const selectAllTypescards = "SELECT * FROM type_carte";
  const [response] = await connexion.query(selectAllTypescards);
  return response;
}

export const createTypeCard = async (NomType) => {
  const sql = "INSERT INTO type_carte (NomTypeCarte) VALUES (?)";
  const [result] = await connexion.query(sql, [NomType]);
  return result;
};

export const updateTypecard = async (id, NomTypeCarte) => {
  const sql = `
    UPDATE type_carte
    SET NomTypeCarte = ?
    WHERE TypeCarteId = ?
  `;
  const [result] = await connexion.query(sql, [NomTypeCarte, id]);
  return result;
};

export const deleteTypecard = async (id) => {
  const sql = `
    DELETE FROM type_carte WHERE TypeCarteId = ?
  `;
  const [result] = await connexion.query(sql, [id]);
  return result;
};