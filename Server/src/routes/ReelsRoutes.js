import express from "express";
import { getAllReels } from "../controllers/reelController.js";

const router = express.Router();

router.get("/reels", getAllReels);

export default router;