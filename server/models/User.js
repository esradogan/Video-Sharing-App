import mongoose, { Mongoose } from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        // required: true,
    },
    img: {
        type: String,
    },
    subscribers: {
        type: Number,
        default: 0
    }, // kendisine abone olan sayısı
    subscribedUsers: {
        type: [String],
        default: 0
    }, // kendisinin abone oldukları
    fromGoogle:{
        type: Boolean,
        default: false
    }


}, { timestamps: true })

export default mongoose.model("User", UserSchema)