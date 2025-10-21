import * as attributModel from "../Models/attributModel.js";

export const createAttribut = async (req, res) => {
  const { nomAttribut } = req.body;
  try {
    const result = await attributModel.createAttribut(nomAttribut);
    res.status(201).json({ message: "Attribut créé", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur attribut" });
  }
};
