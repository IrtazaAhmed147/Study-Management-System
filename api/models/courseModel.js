import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        lowercase: true,
    },
    description: {
        type: String,
        lowercase: true,
    },
    courseCode: {
        type: String,
        trim: true,
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    assignments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Assignment",
        }
    ], quizzes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quiz",
        }
    ], resources: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resource",
        }
    ],
    disable: { type: Boolean, default: false },
},
    { timestamps: true }
)

export default mongoose.model("course", courseSchema)