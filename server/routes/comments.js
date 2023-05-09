import express from "express";
import { addComment, deleteComment, getComment } from "../controllers/comment.js"
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.get("/get/:videoId", getComment);
router.post("/add", verifyToken, addComment);
router.delete("/delete/:id", verifyToken, deleteComment);

export default router;