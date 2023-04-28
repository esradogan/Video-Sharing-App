
import express from "express";
import { createVideo, deleteVideo, getVideo, updateVideo } from "../controllers/video.js"
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.get("/find/:id", getVideo)
router.post("/create", verifyToken, createVideo)
router.put("/update/:id", verifyToken, updateVideo)
router.delete("/delete/:id", verifyToken, deleteVideo)
router.put("/view/:id", viewVideo)
router.get("/trend", getTrendVideos)
router.get("/random", getRandomVideos)





export default router;