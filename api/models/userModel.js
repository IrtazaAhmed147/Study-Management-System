import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    rollNo: { type: String,  unique: true },
    username: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatarUrl: { type: String },
    department: { type: String },
    semester: { type: Number },
    gender: { type: String },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    phone: { type: String },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Courses" }],
    otp: {
        type: String,
    },
    otpExpires: {
        type: Date,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true }
)

export default mongoose.model("User", userSchema)