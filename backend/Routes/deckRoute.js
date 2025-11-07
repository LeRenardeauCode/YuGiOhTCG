import * as deckController from "../Controllers/deckController.js";

import express from "express";

const router = express.Router();

router.get("/allDecks/:id", deckController.getAllDecks);
router.post("/deck", deckController.CreateDeck);
router.put("/updateDeck/:id", deckController.UpdateDeck);
router.delete("/deleteDeck/:id", deckController.DeleteDeck);

export default router;