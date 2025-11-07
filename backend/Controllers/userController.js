import * as userModel from "../Models/userModel.js";
import bcrypt from "bcryptjs";

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
    res.status(200).json(usersRole);
  } catch (error) {
    console.error("Une erreur est survenue", error);
  }
};

export const getAllUsersById = async (req, res) => {
  const id = req.params.id;
  try {
    const usersId = await userModel.getAllUsersById(id);
    res.status(200).json(usersId);
  } catch (error) {
    console.error("Une erreur est survenue", error);
  }
};

export const addUser = async (req, res) => {
  const { PrenomUser, NomUser, Mail, MotDePasse, DateNaissance, RoleId } = req.body;
  if (!PrenomUser || !NomUser || !Mail || !MotDePasse || !DateNaissance || !RoleId) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }
  try {
    // Hash du mot de passe
    const hashMdp = await bcrypt.hash(MotDePasse, 10);
    const dateInscription = new Date();

    const result = await userModel.addUser(
      PrenomUser, NomUser, Mail, hashMdp, DateNaissance, dateInscription, RoleId
    );

    // Erreur si rien n'a été inséré
    if (!result.insertId) {
      return res.status(404).json({ error: "Utilisateur non créé" });
    }

    res.status(201).json({ message: "Utilisateur créé", id: result.insertId });
  } catch (error) {
    // Erreur SQL (duplicate, etc)
    if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062) {
      return res.status(409).json({ error: "Utilisateur déjà existant" });
    }
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { PrenomUser, NomUser, Mail, MotDePasse, DateNaissance, RoleId } = req.body;

  if (!PrenomUser || !NomUser || !Mail || !DateNaissance || !RoleId) {
    return res.status(400).json({ error: "Tous les champs obligatoires sauf motDePasse sont requis" });
  }

  try {
    let hashMdp = null;
    if (MotDePasse) {
      hashMdp = await bcrypt.hash(MotDePasse, 10);
    }
    const result = await userModel.updateUser(
      id, PrenomUser, NomUser, Mail, hashMdp, DateNaissance, RoleId
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    res.status(200).json({ message: "Utilisateur mis à jour" });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: "Mail ou utilisateur déjà existant" });
    }
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const deleteUser = async (req, res) => {
  const UserId = req.params.id;

  try {
    const existant = await userModel.getAllUsersById(UserId);
    if (existant.length === 0) {
      return res.status(404).json({ message: "Utilisateur inconnu" });
    }

    const deletedUser = await userModel.deleteUser(UserId);
    if (deletedUser.affectedRows === 0) {
      return res.status(404).json({ message: "Utilisateur non supprimé (introuvable)" });
    }

    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error("Erreur deleteUser:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
