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

export const CreateDeck = async (req, res) => {
  const { UserId, NomDeck, DescriptionDeck, CompositionDeck, NombreCarteDeck } = req.body;
  if (!UserId || !NomDeck || !DescriptionDeck || !CompositionDeck || !NombreCarteDeck) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }
  try {
    const result = await deckModel.CreateDeck(UserId, NomDeck, DescriptionDeck, CompositionDeck, NombreCarteDeck);
    res.status(201).json({ message: "Deck créé", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const UpdateDeck = async (req, res) => {
  const DeckId = req.params.id;
  const { UserId, NomDeck, DescriptionDeck, CompositionDeck, NombreCarteDeck } = req.body;
  try {
    const result = await deckModel.UpdateDeck(DeckId, UserId, NomDeck, DescriptionDeck, CompositionDeck, NombreCarteDeck);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Deck non trouvé" });
    }
    res.status(200).json({ message: "Deck mis à jour" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const DeleteDeck = async (req, res) => {
  const DeckId = req.params.id;
  try {
    const result = await deckModel.DeleteDeck(DeckId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Deck non trouvé" });
    }
    res.status(200).json({ message: "Deck supprimé" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};