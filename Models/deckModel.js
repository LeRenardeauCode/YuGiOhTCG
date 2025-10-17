import connexion from "../config/bdd.js";

export const getAllDecks = async (userId) => {
  const selectAllDecks = `
    SELECT DeckId, NomDeck
    FROM deck
    WHERE UserId = ?
    `;
  const [response] = await connexion.query(selectAllDecks, [userId]);
  return response;
};
