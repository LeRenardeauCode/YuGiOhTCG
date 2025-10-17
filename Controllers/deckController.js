import * as deckModel from "../Models/deckModel.js";

export const getAllDecks = async (req, res) => {
  const userId = req.params.id;
  try {
    const decks = await deckModel.getAllDecks(userId);
    res.status(200).json(decks);
  } catch (error) {
    console.error("Une erreur est survenue", error);
  }
};