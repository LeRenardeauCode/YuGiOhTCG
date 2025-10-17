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
