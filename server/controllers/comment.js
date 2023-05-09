import { createError } from "../error.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const getComment = async (req, res, next) => {
    try {
        const comments = await Comment.find({videoId: req.params.videoId })
        console.log("Comments", comments)
        res.status(200).json(comments)
    } catch (error) {
        next(error)
    }
}

export const addComment = async (req, res, next) => {
    try {
        const newComment = new Comment({ userId: req.user.id, ...req.body })
        const savedComment = await newComment.save()
        res.status(200).json(savedComment)

    } catch (error) {
        next(error)
    }
}

export const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(res.params.id);
        if (!comment) return next(createError(404, "Comment not found!"))
        const video = await Video.findById(req.user.id);

        if (comment.userId === req.user.id || video.userId === req.user.id) {
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json("Comment deleted succesfully!")
        }
        else next(createError(403, "You can delete only your comment!"))
    } catch (error) {
        createError("400", "Comment not deleted succesfully!")
    }
}