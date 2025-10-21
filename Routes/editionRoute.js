import * as editionController from "../Controllers/editionController.js";
import express from "express";

const router = express.Router();

router.post("/edition", editionController.createEdition);

export default router;
