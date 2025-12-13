import mongoose from "mongoose";

const inviteSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "course" },
    status: { type: String, default: "pending" } // pending, accepted, rejected
  },
  { timestamps: true }
);

export default mongoose.model("Invite", inviteSchema);
