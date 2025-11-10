// backend/Controllers/authController.js
import * as userModel from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// INSCRIPTION
export const register = async (req, res) => {
  const { PrenomUser, NomUser, Mail, MotDePasse, DateNaissance } = req.body;
  
  if (!PrenomUser || !NomUser || !Mail || !MotDePasse) {
    return res.status(400).json({ error: "Tous les champs obligatoires sont requis" });
  }

  try {
    const hashMdp = await bcrypt.hash(MotDePasse, 10);
    const dateInscription = new Date();
    const RoleId = 2; // User par défaut

    const result = await userModel.addUser(
      PrenomUser, NomUser, Mail, hashMdp, DateNaissance, dateInscription, RoleId
    );

    if (!result.insertId) {
      return res.status(404).json({ error: "Utilisateur non créé" });
    }

    // Génération du token JWT
    const token = jwt.sign(
      { 
        userId: result.insertId, 
        mail: Mail,
        roleId: RoleId 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({ 
      message: "Utilisateur créé", 
      token,
      userId: result.insertId,
      prenom: PrenomUser
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: "Email déjà utilisé" });
    }
    console.error("Erreur register:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// CONNEXION
export const login = async (req, res) => {
  const { Mail, MotDePasse } = req.body;

  if (!Mail || !MotDePasse) {
    return res.status(400).json({ error: "Email et mot de passe requis" });
  }

  try {
    const users = await userModel.getAllUsers();
    const user = users.find(u => u.Mail === Mail);

    if (!user) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    const validPassword = await bcrypt.compare(MotDePasse, user.MotDePasse);

    if (!validPassword) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    const token = jwt.sign(
      { 
        userId: user.UserId, 
        mail: user.Mail,
        roleId: user.RoleId 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({ 
      message: "Connexion réussie",
      token,
      userId: user.UserId,
      prenom: user.PrenomUser,
      nom: user.NomUser
    });
  } catch (error) {
    console.error("Erreur login:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// VÉRIFIER LE TOKEN
export const verifyToken = async (req, res) => {
  res.status(200).json({ 
    message: "Token valide",
    user: req.user
  });
};
