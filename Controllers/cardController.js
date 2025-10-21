import * as cardModel from "../Models/cardModel.js";

export const getAllCards = async (req, res) => {
  try {
    const cards = await cardModel.getAllCards();
    res.status(200).json(cards);
  } catch (error) {
    console.error("Une erreur est survenue", error);
  }
};

export const getAllCardsById = async (req, res) => {
  const id = req.params.id;
  try {
    const cardsId = await cardModel.getAllCardsById(id);
    res.status(200).json(cardsId);
  } catch (error) {
    console.error("Une erreur est survenue", error);
  }
};

export const createCard = async (req, res) => {
  try {
    const card = req.body;
    // Ajouter ici des validations si nécessaire
    const result = await cardModel.createCard(card);
    res.status(201).json({ message: "Carte créée", id: result.insertId });
  } catch (error) {
    console.error("Erreur création carte", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const updateCard = async (req, res) => {
  const id = req.params.id;
  const card = req.body;
  try {
    const result = await cardModel.updateCard(id, card);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Carte non trouvée" });
    }
    res.status(200).json({ message: "Carte mise à jour" });
  } catch (error) {
    console.error("Erreur mise à jour carte", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const deleteCard = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await cardModel.deleteCard(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Carte non trouvée" });
    }
    res.status(200).json({ message: "Carte supprimée" });
  } catch (error) {
    console.error("Erreur suppression carte", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
