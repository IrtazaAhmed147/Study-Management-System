import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
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
    Members: [
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
},
    { timestamps: true }
)

export default mongoose.model("course", courseSchema)