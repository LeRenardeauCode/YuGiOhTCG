import connexion from '../config/bdd.js';


export const getAllRaretes = async () => {
  const selectAllRaretes = "SELECT * FROM rarete";
  const [response] = await connexion.query(selectAllRaretes);
  return response;
}

export const createRarete = async (NomRarete) => {
  const sql = "INSERT INTO rarete (NomRarete) VALUES (?)";
  const [result] = await connexion.query(sql, [NomRarete]);
  return result;
};

export const updateRarete = async (id, NomRarete) => {
  const sql = `
    UPDATE rarete
    SET NomRarete = ?
    WHERE RareteId = ?
  `;
  const [result] = await connexion.query(sql, [NomRarete, id]);
  return result;
};

export const deleteRarete = async (id) => {
  const sql = `
    DELETE FROM rarete WHERE RareteId = ?
  `;
  const [result] = await connexion.query(sql, [id]);
  return result;
};