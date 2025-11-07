import connexion from "../config/bdd.js";

export const getCollectionByUserId = async (userId) => {
  const selectAllCollections = `
    SELECT cp.CollectionPersoId, cp.NombreExemplaire, c.NomCarte
    FROM collection_personnelle cp
    INNER JOIN carte c ON cp.CarteId = c.CarteId
    WHERE cp.UserId = ?
  `;
  const [response] = await connexion.query(selectAllCollections, [userId]);
  return response;
};

export const CreateCollection = async (UserId, CarteId, NombreExemplaire) => {
  const sql = `
    INSERT INTO collection_personnelle (UserId, CarteId, NombreExemplaire)
    VALUES (?, ?, ?)
  `;
  const [result] = await connexion.query(sql, [UserId, CarteId, NombreExemplaire]);
  return result;
};

export const UpdateCollection = async (CollectionPersoId, UserId, CarteId, NombreExemplaire) => {
  const sql = `
    UPDATE collection_personnelle SET UserId = ?, CarteId = ?, NombreExemplaire = ?
    WHERE CollectionPersoId = ?
  `;
  const [result] = await connexion.query(sql, [UserId, CarteId, NombreExemplaire, CollectionPersoId]);
  return result;
};

export const DeleteCollection = async (CollectionPersoId) => {
  const sql = `DELETE FROM collection_personnelle WHERE CollectionPersoId = ?`;
  const [result] = await connexion.query(sql, [CollectionPersoId]);
  return result;
};