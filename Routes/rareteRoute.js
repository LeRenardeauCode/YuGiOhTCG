import * as rareteController from "../Controllers/rareteController.js";
import express from "express";

const router = express.Router();

router.get("/allRaretes", rareteController.getAllRaretes);
router.post("/rarete", rareteController.createRarete);
router.put("/updateRarete/:id", rareteController.updateRarete);
router.delete("/deleteRarete/:id", rareteController.deleteRarete);

export default router;
