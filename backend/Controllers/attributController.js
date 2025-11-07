import * as attributModel from "../Models/attributModel.js";


export const getAllAttributs = async (req, res) => {
  try {
    const attributs = await attributModel.getAllAttributs();
    res.status(200).json(attributs);
  } catch (error) {
    console.error("Une erreur est survenue", error);
    
  }
};

export const createAttribut = async (req, res) => {
  const { NomAttribut } = req.body;
  try {
    const result = await attributModel.createAttribut(NomAttribut);
    res.status(201).json({ message: "Attribut créé", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur attribut" });
  }
};

export const updateAttribut = async (req, res) => {
  const id = req.params.id;
  const { NomAttribut } = req.body;

  if (!NomAttribut) {
    return res.status(400).json({ error: "Le champ nomAttribut est requis" });
  }

  try {
    const result = await attributModel.updateAttribut(id, NomAttribut);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Attribut non trouvé" });
    }

    res.status(200).json({ message: "Attribut mis à jour" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const deleteAttribut = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await attributModel.deleteAttribut(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Attribut non trouvé" });
    }

    res.status(200).json({ message: "Attribut supprimé" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};
