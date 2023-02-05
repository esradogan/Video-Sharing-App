import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken"
import { JsonWebTokenError } from "jsonwebtoken";
import { use } from "vue/types/umd.js";

export const signUp = async (req, res, next) => {
    console.log(req.body)
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash });

        await newUser.save();
        res.status(200).send("User has been created")
    } catch (error) {
        next(error)
    }
}

export const signIn = async (req, res, next) => {
    console.log(req.body)
    try {
        const user = await User.findOne({ name: req.body.name })
        console.log("user", user)
        if (!user) { return next(createError(404, "No found user")) }

        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isCorrect) {
            return next(createError(400, "Wrong credntials"))
        }
        else {
            const token = jwt.sign({id : user._id}, process.env.JWT_SECRET_KEY)
            res.cookie(access_token)
        }
        // const salt = bcrypt.genSaltSync(10);
        // const hash = bcrypt.hashSync(req.body.password, salt);
        // const newUser = new User({ ...req.body, password: hash });

        // await newUser.save();
        // res.status(200).send("User has been created")
    } catch (error) {
        next(error)
    }
}