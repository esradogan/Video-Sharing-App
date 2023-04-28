import { createError } from "../error.js"
import User from "../models/User.js"

export const updateUser = async (req, res, next) => {
    if (req.params.id == req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true })
            res.status(200).json(updatedUser)
        } catch (error) {
            next(error)
        }
    }
    else {
        return next(createError(403, "You can only update your account!"))
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.params.id == req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User has been deleted successfuly!")
        } catch (error) {
            next(error)
        }
    }
    else {
        return next(createError(403, "You can delete only your account!"))
    }
}
export const getUser = async (req, res, next) => {
    if (req.params.id == req.user.id) {
        try {
            const user = await User.findById(req.params.id)
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }
    else {
        return next(createError(403, "You can delete only your account!"))
    }
}
export const subscribe = async (req, res, next) => {
    try {
        await User.findById(req.user.id, {
            $push: { subscribedUsers: req.params.id }
        })
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 }
        })
        res.status(200).json("Subscription successful!")
    } catch (error) {
        next(error)
    }

}
export const unsubscribe = async (req, res, next) => {
    try {
        await User.findById(req.user.id, {
            $pull: { subscribedUsers: req.params.id }
        })
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 }
        })
        res.status(200).json("Unsubscription successful!")
    } catch (error) {
        next(error)
    }
}
export const like = (req, res, next) => {
}
export const dislike = (req, res, next) => {
}

