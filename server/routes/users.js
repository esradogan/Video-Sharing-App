import express from "express";
import { updateUser, deleteUser, getUser, subscribe, unsubscribe } from "../controllers/user.js"

const router = express.Router();

//update user
router.put("/:id", updateUser)

//delete user
router.delete("/:id", deleteUser)

//get user
router.get("/find/:id", getUser)

//subscribe user
router.put("/subscribe/:id", subscribe)

//unsubscribe user
router.put("/unsubscribe/:id", unsubscribe)

export default router;