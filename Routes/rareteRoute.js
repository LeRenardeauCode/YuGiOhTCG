import * as rareteController from "../Controllers/rareteController.js";
import express from "express";

const router = express.Router();

router.post("/rarete", rareteController.createRarete);

export default router;
