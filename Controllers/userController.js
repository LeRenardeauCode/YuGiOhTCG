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

export const addUtilisateur = async (req, res) => {
  const { prenomUser, nomUser, mail, motDePasse, dateNaissance, roleId } = req.body;
  if (!prenomUser || !nomUser || !mail || !motDePasse || !dateNaissance || !roleId) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }
  try {
    // Hash du mot de passe
    const hashMdp = await bcrypt.hash(motDePasse, 10);
    const dateInscription = new Date();

    const result = await userModel.addUtilisateur(
      prenomUser, nomUser, mail, hashMdp, dateNaissance, dateInscription, roleId
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

export const updateUtilisateur = async (req, res) => {
  const { id } = req.params;
  const { prenomUser, nomUser, mail, motDePasse, dateNaissance, roleId } = req.body;

  if (!prenomUser || !nomUser || !mail || !dateNaissance || !roleId) {
    return res.status(400).json({ error: "Tous les champs obligatoires sauf motDePasse sont requis" });
  }

  try {
    let hashMdp = null;
    if (motDePasse) {
      hashMdp = await bcrypt.hash(motDePasse, 10);
    }
    const result = await userModel.updateUtilisateur(
      id, prenomUser, nomUser, mail, hashMdp, dateNaissance, roleId
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
