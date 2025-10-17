import * as cardController from "../Controllers/cardController.js";

import express from "express";

const router = express.Router();

router.get("/allCards", cardController.getAllCards);
router.get("/allCardsById/:id", cardController.getAllCardsById);

export default router;
