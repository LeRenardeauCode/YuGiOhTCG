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
