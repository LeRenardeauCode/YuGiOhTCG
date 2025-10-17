import * as deckController from "../Controllers/deckController.js";

import express from "express";

const router = express.Router();

router.get("/allDecks/:id", deckController.getAllDecks);

export default router;