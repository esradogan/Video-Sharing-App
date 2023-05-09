
import express from "express";
import { addView, createVideo, deleteVideo, getRandomVideos, getSearchedVideos, getTaggedVideos, getTrendVideos, getVideo, subscribe, updateVideo } from "../controllers/video.js"
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.get("/find/:id", getVideo)
router.post("/create", verifyToken, createVideo)
router.put("/update/:id", verifyToken, updateVideo)
router.delete("/delete/:id", verifyToken, deleteVideo)
router.post("/view/:id", addView)
router.get("/trend", getTrendVideos)
router.get("/random", getRandomVideos)
router.get("/subscribe", verifyToken, subscribe)
router.get("/tags", getTaggedVideos)
router.get("/search", getSearchedVideos)

export default router;