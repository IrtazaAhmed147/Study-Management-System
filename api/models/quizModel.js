import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
    {
        courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
        title: { type: String, required: true },
        description: { type: String },
        type: { type: String },
        attachments: [{ type: String }],
        dueDate: { type: Date, required: true },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: { type: String, default: "pending" },
    },
    { timestamps: true }
);

export default mongoose.model("Quiz", quizSchema);
