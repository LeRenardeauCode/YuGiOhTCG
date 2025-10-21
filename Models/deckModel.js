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

export const CreateDeck = async (UserId, NomDeck, DescriptionDeck, CompositionDeck, NombreCarteDeck) => {
  const sql = `
    INSERT INTO deck (UserId, NomDeck, DescriptionDeck, CompositionDeck, NombreCarteDeck)
    VALUES (?, ?, ?, ?, ?)
  `;
  const [result] = await connexion.query(sql, [UserId, NomDeck, DescriptionDeck, CompositionDeck, NombreCarteDeck]);
  return result;

};

export const UpdateDeck = async (DeckId, UserId, NomDeck, DescriptionDeck, CompositionDeck, NombreCarteDeck) => {
  const sql = `
    UPDATE deck SET UserId = ?, NomDeck = ?, DescriptionDeck = ?, CompositionDeck = ?, NombreCarteDeck = ?
    WHERE DeckId = ?
  `;
  const [result] = await connexion.query(sql, [UserId, NomDeck, DescriptionDeck, CompositionDeck, NombreCarteDeck, DeckId]);
  return result;
};

export const DeleteDeck = async (DeckId) => {
  const sql = `DELETE FROM deck WHERE DeckId = ?`;
  const [result] = await connexion.query(sql, [DeckId]);
  return result;
};