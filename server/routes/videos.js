
import express from "express";
import { addView, createVideo, deleteVideo, getRandomVideos, getTrendVideos, getVideo, subscribe, updateVideo } from "../controllers/video.js"
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.get("/find/:id", getVideo)
router.post("/create", verifyToken, createVideo)
router.put("/update/:id", verifyToken, updateVideo)
router.delete("/delete/:id", verifyToken, deleteVideo)
router.post("/view/:id", addView)
router.get("/trend", getTrendVideos)
router.get("/random", getRandomVideos)
router.post("/subscribe", verifyToken, subscribe)



export default router;