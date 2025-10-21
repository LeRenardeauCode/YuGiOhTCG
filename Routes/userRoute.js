import * as userController from "../Controllers/userController.js"; // import du controller (enfant)
// import du module express
import express from "express";
// création du routeur
const router = express.Router();

// ici on définit la route pour récupérer les utilisateurs
router.get("/allUsers", userController.getAllUsers);
router.get("/allRoles", userController.getAllRoles);
router.get("/allUsersId/:id", userController.getAllUsersById);
router.post("/addUser", userController.addUser);
router.put("/updateUser/:id", userController.updateUser);
router.delete("/deleteUser/:id", userController.deleteUser);

export default router;
