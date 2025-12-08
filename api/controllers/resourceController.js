// import resourceModel from "../models/resourceModel.js";
import mongoose from "mongoose";
import resourceModel from "../models/resourceModel.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";
import courseModel from "../models/courseModel.js";
// import { sendNotification } from "../utils/sendNotification.js";
import SubscriptionModel from "../models/SubscriptionModel.js";
import { sendPushNotification } from "../utils/webPush.js";

export const uploadResource = async (req, res) => {
    try {
        const files = req.files; // array of files
        if (!files || files.length === 0) {
            return errorHandler(res, 404, "materials required");
        }
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return errorHandler(res, 400, "Invalid courseId");
        }

        // 1️⃣ Upload all files in parallel
        const uploadPromises = files.map(file => uploadOnCloudinary(file, "resource-images"));
        const uploadedUrls = await Promise.all(uploadPromises);

        // 2️⃣ Save resources in parallel
        const savedResources = await Promise.all(
            uploadedUrls.map(async (url, i) => {
                const file = files[i];
                const resource = new resourceModel({
                    uploadedBy: req.user.id,
                    fileUrl: url.secure_url,
                    publicId: url.public_id,
                    courseId: req.params.id,
                    fileType: file.mimetype
                });
                const saved = await resource.save();

                // add resource to course
                await courseModel.findByIdAndUpdate(req.params.id, {
                    $push: { resources: saved._id }
                });

                return saved;
            })
        );

        // 3️⃣ Send push notifications to all members except uploader
        const course = await courseModel.findById(req.params.id).select("members");
        for (let memberId of course.members) {
            if (memberId.toString() === req.user.id) continue;

            const sub = await SubscriptionModel.findOne({ userId: memberId });
            if (sub) {
                await sendPushNotification(sub.subscription, {
                    title: "New Course Material",
                    message: `${files.length} new materials added to the course.`
                });
            }
        }

        successHandler(res, 200, "resources uploaded successfully", savedResources);

    } catch (error) {
        errorHandler(res, 400, error.message);
    }
};


export const getAllResources = async (req, res) => {
    const { resourcesname, email, isAdmin } = req.query;
    const filter = {};
    if (resourcesname) filter.resourcesname = resourcesname;
    if (email) filter.email = email;
    if (isAdmin !== undefined) filter.isAdmin = isAdmin === 'true';
    try {
        const resourcesData = await resourceModel.find(filter);
        successHandler(res, 200, "All resourcess fetched", resourcesData)
    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}


export const getSingleResource = async (req, res) => {
    try {
        const resourcesData = await resourceModel.findById(req.params.id);
        if (!resourcesData) return errorHandler(res, 404, "resources not found")
        successHandler(res, 200, "resources found successfully", resourcesData)
    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}


export const getCourseResources = async (req, res) => {
    try {

        const resourcesData = await resourceModel.find({ courseId: req.params.id });
        if (!resourcesData) return errorHandler(res, 404, "resources not found")
        successHandler(res, 200, "resources found successfully", resourcesData)
    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}
export const deleteResource = async (req, res) => {
    try {
        const resource = await resourceModel.findById(req.params.id);
        if (!resource) return errorHandler(res, 404, "Resource not found");

        await deleteFromCloudinary(resource.publicId);

        await resourceModel.findByIdAndDelete(req.params.id);

        await courseModel.findByIdAndUpdate(req.params.courseId, {
            $pull: { resources: req.params.id }
        });

        successHandler(res, 200, "Resource deleted successfully");
    } catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message);
    }
};


// export const updateResource = async (req, res) => {

//     try {
//         const file = req.file
//         if (file) {
//             const url = await uploadOnCloudinary(file, 'resources-images');
//             req.body.profilePic = url.secure_url
//         }
//         const resourcesData = await resourceModel.findByIdAndUpdate(req.params.id, {
//             $set: req.body,
//         },
//             { new: true });
//         successHandler(res, 200, "resources updated successfully", resourcesData)

//     }
//     catch (err) {
//         console.log(err);
//         errorHandler(res, 400, err.message)
//     }
// }
