import * as rareteModel from "../Models/rareteModel.js";

export const createRarete = async (req, res) => {
  const { nomRarete } = req.body;
  try {
    const result = await rareteModel.createRarete(nomRarete);
    res.status(201).json({ message: "Rareté créée", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur rareté" });
  }
};
