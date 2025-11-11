import * as userController from "../Controllers/userController.js";
import { authMiddleware, checkRole } from "../middleware/authMiddleware.js";
// import du module express
import express from "express";
// création du routeur
const router = express.Router();

// ici on définit la route pour récupérer les utilisateurs
router.get("/allUsers", userController.getAllUsers);
router.get("/allRoles", userController.getAllRoles);
router.get("/allUsersId/:id", userController.getAllUsersById);
router.post("/addUser", authMiddleware, userController.addUser);
router.put("/updateUser/:id", authMiddleware, userController.updateUser);
router.delete("/deleteUser/:id", authMiddleware, checkRole(1), userController.deleteUser);
router.get('/profile', authMiddleware, userController.getMyProfile);
router.put('/profile', authMiddleware, userController.updateMyProfile);
router.put('/profile/password', authMiddleware, userController.changePassword);

export default router;
