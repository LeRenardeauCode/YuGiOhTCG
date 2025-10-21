import * as editionModel from "../Models/editionModel.js";

export const createEdition = async (req, res) => {
  const { nomEdition, codeEdition, dateEdition, typeImpression } = req.body;
  try {
    const result = await editionModel.createEdition(nomEdition, codeEdition, dateEdition, typeImpression);
    res.status(201).json({ message: "Édition créée", id: result.insertId });
  } catch (error) {
    console.error("Erreur édition", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
