import * as typecardController from "../Controllers/typecardController.js";
import express from "express";

const router = express.Router();

router.post("/typecard", typecardController.createTypeCard);

export default router;
