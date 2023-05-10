import express from "express";
import { updateUser, deleteUser, getUser, subscribe, unsubscribe, like, dislike } from "../controllers/user.js"
import { verifyToken } from "../verifyToken.js";
const router = express.Router();

//update user
router.put("/:id", verifyToken, updateUser)

//delete user
router.delete("/:id", verifyToken, deleteUser)

//get user
router.get("/find/:id", getUser)

//subscribe user
router.put("/subscribe/:id", verifyToken, subscribe)

//unsubscribe user
router.put("/unsubscribe/:id", verifyToken, unsubscribe)

//like video
router.put("/like/:videoId", verifyToken, like)

//dislike video
router.put("/dislike/:videoId", verifyToken, dislike)

export default router;