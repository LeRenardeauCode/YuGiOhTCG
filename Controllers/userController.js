import * as userModel from "../Models/userModel.js";

// fonction pour récupérer tous les utilisateurs
export const getAllUsers = async (req, res) => {
  try {
    // appel du modèle pour récupérer les utilisateurs
    const users = await userModel.getAllUsers();
    // envoi de la réponse avec les utilisateurs récupérés
    res.status(200).json(users);
  } catch (error) {
    // gestion des erreurs
    console.error("Une erreur est survenue", error);
  }
};

export const getAllRoles = async (req, res) => {
    try {
        const usersRole = await userModel.getAllRoles();
        res.status(200).json(usersRole)
    } catch (error) {
        console.error("Une erreur est survenue", error);
    }
};