import * as cardController from "../Controllers/cardController.js";

import express from "express";

const router = express.Router();

router.get("/allCards", cardController.getAllCards);
router.get("/allCardsById/:id", cardController.getAllCardsById);
router.post("/card", cardController.createCard);
router.put("/updateCard/:id", cardController.updateCard);
router.delete("/deleteCard/:id", cardController.deleteCard);

export default router;
