import * as typecardModel from "../Models/typecardModel.js";


export const getAllTypecards = async (req, res) => {
  try {
    const typecards = await typecardModel.getAllTypecards();
    res.status(200).json(typecards);
  } catch (error) {
    console.error("Une erreur est survenue", error);
  }
};

export const createTypeCard = async (req, res) => {
  const { NomType } = req.body;
  try {
    const result = await typecardModel.createTypeCard(NomType);
    res.status(201).json({ message: "Type créé", id: result.insertId });
  } catch (error) {
    console.error("Erreur lors de la création du type", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const updateTypecard = async (req, res) => {
  const id = req.params.id;
  const { NomTypeCarte } = req.body;

  if (!NomTypeCarte) {
    return res.status(400).json({ error: "Le champ NomTypeCarte est requis" });
  }

  try {
    const result = await typecardModel.updateTypecard(id, NomTypeCarte);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "TypeCarte non trouvé" });
    }

    res.status(200).json({ message: "TypeCarte mis à jour" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const deleteTypecard = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await typecardModel.deleteTypecard(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "TypeCarte non trouvée" });
    }

    res.status(200).json({ message: "TypeCarte supprimée" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};
