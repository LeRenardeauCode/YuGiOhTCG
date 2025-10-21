import * as typecardController from "../Controllers/typecardController.js";
import express from "express";

const router = express.Router();

router.get("/allTypecards", typecardController.getAllTypecards);
router.post("/typecard", typecardController.createTypeCard);
router.put("/updateTypecard/:id", typecardController.updateTypecard);
router.delete("/deleteTypecard/:id", typecardController.deleteTypecard);

export default router;
