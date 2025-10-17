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
