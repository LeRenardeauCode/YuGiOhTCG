import * as collectionModel from "../Models/collectionModel.js";

export const getCollectionByUserId = async (req, res) => {
  const userId = req.params.id;
  try {
    const collection = await collectionModel.getCollectionByUserId(userId);
    res.status(200).json(collection);
  } catch (error) {
    console.error("Erreur collection user :", error);
  }
};

export const CreateCollection = async (req, res) => {
  const { UserId, CarteId, NombreExemplaire } = req.body;
  if (!UserId || !CarteId || !NombreExemplaire) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }
  try {
    const result = await collectionModel.CreateCollection(UserId, CarteId, NombreExemplaire);
    res.status(201).json({ message: "Collection créée", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const UpdateCollection = async (req, res) => {
  const CollectionPersoId = req.params.id;
  const { UserId, CarteId, NombreExemplaire } = req.body;
  try {
    const result = await collectionModel.UpdateCollection(CollectionPersoId, UserId, CarteId, NombreExemplaire);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Collection non trouvée" });
    }
    res.status(200).json({ message: "Collection mise à jour" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const DeleteCollection = async (req, res) => {
  const CollectionPersoId = req.params.id;
  try {
    const result = await collectionModel.DeleteCollection(CollectionPersoId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Collection non trouvée" });
    }
    res.status(200).json({ message: "Collection supprimée" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};