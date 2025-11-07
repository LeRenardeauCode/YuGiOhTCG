import * as collectionController from "../Controllers/collectionController.js";
import express from "express";

const router = express.Router();

router.get("/collection/:id", collectionController.getCollectionByUserId);
router.post("/collection", collectionController.CreateCollection);
router.put("/updateCollection/:id", collectionController.UpdateCollection);
router.delete("/deleteCollection/:id", collectionController.DeleteCollection);

export default router;
