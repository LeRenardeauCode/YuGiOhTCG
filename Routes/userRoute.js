import * as userController from '../Controllers/userController.js'; // import du controller (enfant)
// import du module express
import express from "express";
// création du routeur
const router = express.Router();

// ici on définit la route pour récupérer les utilisateurs
router.get('/allUsers', userController.getAllUsers);
router.get('/allRoles', userController.getAllRoles);

export default router;