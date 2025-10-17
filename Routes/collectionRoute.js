import * as collectionController from "../Controllers/collectionController.js";
import express from "express";

const router = express.Router();

router.get("/collection/:id", collectionController.getCollectionByUserId);

export default router;
