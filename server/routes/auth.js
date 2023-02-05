import express from "express";
import { signIn, signUp } from "../controllers/auth.js"

const router = express.Router();

//create a user
router.post("/signup", signUp )


//sign in
router.post("/signin", signIn)

// google auth

router.post("/google", )

export default router;