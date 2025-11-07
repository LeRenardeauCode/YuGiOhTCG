import * as attributController from "../Controllers/attributController.js";
import express from "express";

const router = express.Router();

router.get("/allAttributs", attributController.getAllAttributs);
router.post("/attribut", attributController.createAttribut);
router.put("/updateAttribut/:id", attributController.updateAttribut);
router.delete("/deleteAttribut/:id", attributController.deleteAttribut);

export default router;
