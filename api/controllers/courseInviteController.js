import courseInviteModel from "../models/courseInviteModel.js";
import courseModel from "../models/courseModel.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";

export const sendInvite = async (req, res) => {
    try {


        let invite = await courseInviteModel({
          senderId: req.user.id, receiverId: req.params.id,courseId:req.params.courseId,status:"pending"
        })
        let savedInvite = await invite.save();
        successHandler(res, 200, "invitation send successfully", savedInvite)

    } catch (error) {
        errorHandler(res, 400, error.message)
    }
}
export const updateInvite = async (req, res) => {
    try {
        const { status } = req.body;
        const inviteId = req.params.id;
        const invite = await courseInviteModel.findByIdAndUpdate(
            inviteId,
            { status },
            { new: true }
        );
        console.log(invite);
        
        const courseId = invite.courseId;
        const receiverId = invite.receiverId;

        // 1. Update status

        // 2. If accepted → add receiver to course members
        if (status === "accept") {
            await courseModel.findByIdAndUpdate(
                courseId,
                {
                    $addToSet: { members: receiverId }  // prevents duplicates
                },
                { new: true }
            );
        }

        successHandler(res, 200, "Invitation updated successfully", invite);
    } catch (error) {
        errorHandler(res, 400, error.message);
    }
};

export const getAllInvitations = async (req, res) => {
    try {

            const invites = await courseInviteModel.find();
        successHandler(res, 200, "invitations fetched successfully", invites)

    } catch (error) {
        errorHandler(res, 400, error.message)
    }
}

