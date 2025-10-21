import connexion from '../config/bdd.js';


export const getAllEditions = async () => {
  const selectAllEditions = "SELECT * FROM edition";
  const [response] = await connexion.query(selectAllEditions);
  return response;
}

export const createEdition = async (NomEdition, CodeEdition, DateEdition, TypeImpression) => {
  const sql = "INSERT INTO edition (NomEdition, CodeEdition, DateEdition, TypeImpression) VALUES (?,?,?,?)";
  const [result] = await connexion.query(sql, [NomEdition, CodeEdition, DateEdition, TypeImpression]);
  return result;
};

export const updateEdition = async (id, NomEdition, CodeEdition, DateEdition, TypeImpression) => {
  const sql = `
    UPDATE edition
    SET NomEdition = ?,
    CodeEdition = ?,
    DateEdition = ?,
    TypeImpression = ?
    WHERE EditionId = ?
  `;
  const [result] = await connexion.query(sql, [NomEdition, CodeEdition, DateEdition, TypeImpression, id]);
  return result;
};

export const deleteEdition = async (id) => {
  const sql = `
    DELETE FROM edition WHERE EditionId = ?
  `;
  const [result] = await connexion.query(sql, [id]);
  return result;
};
