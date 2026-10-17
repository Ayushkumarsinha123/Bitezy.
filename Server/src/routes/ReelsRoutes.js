import express from "express";
import { getAllReels,getRestaurantReels,deleteReel,updateReel, searchReels, toggleLike } from "../controllers/reelController.js";
import { uploadReel } from '../controllers/reelController.js';
import { upload } from '../middlewares/multerMiddleware.js';
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
// search route
router.get("/search", searchReels);
router.get("/my-reels", protect, getRestaurantReels);
router.get("/", getAllReels);
router.post('/upload',protect, upload.single('video'), uploadReel);

// like reel
router.post("/:id/like", protect, toggleLike);

// delete and update routes
router.delete('/:id', protect, deleteReel);
router.put('/:id', protect, updateReel);

export default router;