import * as typecardModel from "../Models/typecardModel.js";

export const createTypeCard = async (req, res) => {
  const { nomType } = req.body;
  try {
    const result = await typecardModel.createTypeCard(nomType);
    res.status(201).json({ message: "Type créé", id: result.insertId });
  } catch (error) {
    console.error("Erreur lors de la création du type", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
