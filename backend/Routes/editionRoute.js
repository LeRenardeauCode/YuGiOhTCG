import * as editionController from "../Controllers/editionController.js";
import express from "express";

const router = express.Router();

router.get("/allEditions", editionController.getAllEditions);
router.post("/edition", editionController.createEdition);
router.put("/updateEdition/:id", editionController.updateEdition);
router.delete("/deleteEdition/:id", editionController.deleteEdition);

export default router;
