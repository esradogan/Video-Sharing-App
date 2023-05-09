import { createError } from "../error.js"
import User from "../models/User.js"
import Video from "../models/Video.js"


export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        res.status(200).json(video)

    } catch (error) {
        createError("400", "Video not found!")
    }
}


export const createVideo = async (req, res, next) => {
    const newVideo = new Video({ userId: req.user.id, ...req.body });
    console.log("Burada", newVideo)
    try {
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo)

    } catch (error) {
        createError("400", "Video not created succesfully!")
    }

}


export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return next(createError(404, "Video not found!"))
        if (req.user.id === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },
                { new: true })
            res.status(200).json(updatedVideo)
        }
        else {
            return next(createError(403, "You can update only your video "))
        }

    } catch (error) {
        createError("400", "Video not updated succesfully!")
    }

}


export const deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return next(createError(404, "Video not found!"))
        if (req.user.id === video.userId) {
            await Video.findByIdAndDelete(req.params.id)
            res.status(200).json("Video deleted succesfully!")
        }
        else {
            return next(createError(403, "You can delete only your video "))
        }

    } catch (error) {
        createError("400", "Video not deleted succesfully!")
    }
}


export const addView = async (req, res, next) => {
    try {
        const videoView = await Video.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }
        })
        res.status(200).json(videoView)

    } catch (error) {
        next(error)

    }
}

export const getTrendVideos = async (req, res, next) => {
    try {
        const videos = await Video.find.sort({ views: -1 }) // -1 getting most viewed videos
        res.status(200).json(videos)

    } catch (error) {
        createError("400", "Video not found!")
    }
}

export const getRandomVideos = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 1 } }])
        res.status(200).json(videos)

    } catch (error) {
        next(error)
    }
}

export const subscribe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        const subscribedChannels = user.subscribedUsers
        console.log(subscribedChannels)
        const list = await Promise.all(
            subscribedChannels.map((channelId) => {
                return Video.find({ userId: channelId })
            })
        )
        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt))
    } catch (error) {
        next(error)
    }
}

export const getTaggedVideos = async (req, res, next) => {
    const tags = req.query.tags.split(",");
    try {
        const taggedVideos = await Video.find({ tags: { $in: tags } }).limit(20)
        res.status(200).json(taggedVideos)
    } catch (error) {
        next(error)
    }
}

export const getSearchedVideos = async (req, res, next) => {
    const searchQuery = req.query.searchQuery
    try {
        const searchedVideos = await Video.find({ title: { $regex : searchQuery,  $options: "i" } })
        res.status(200).json(searchedVideos)
    } catch (error) {
        next(error)
    }
}

