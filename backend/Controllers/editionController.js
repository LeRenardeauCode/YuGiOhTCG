import * as editionModel from "../Models/editionModel.js";


export const getAllEditions = async (req, res) => {
  try {
    const editions = await editionModel.getAllEditions();
    res.status(200).json(editions);
  } catch (error) {
    console.error("Une erreur est survenue", error);
    
  }
};

export const createEdition = async (req, res) => {
  const { NomEdition, CodeEdition, DateEdition, TypeImpression } = req.body;
  try {
    const result = await editionModel.createEdition(NomEdition, CodeEdition, DateEdition, TypeImpression);
    res.status(201).json({ message: "Édition créée", id: result.insertId });
  } catch (error) {
    console.error("Erreur édition", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const updateEdition = async (req, res) => {
  const id = req.params.id;
  const { NomEdition, CodeEdition, DateEdition, TypeImpression } = req.body;

  if (!NomEdition || !CodeEdition || !DateEdition || !TypeImpression) {
    return res.status(400).json({ error: "Tous les champs obligatoires sont requis" });
  }

  try {
    const result = await editionModel.updateEdition(id, NomEdition, CodeEdition, DateEdition, TypeImpression);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Edition non trouvée" });
    }

    res.status(200).json({ message: "Edition mise à jour" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const deleteEdition = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await editionModel.deleteEdition(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Edition non trouvée" });
    }

    res.status(200).json({ message: "Edition supprimée" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};