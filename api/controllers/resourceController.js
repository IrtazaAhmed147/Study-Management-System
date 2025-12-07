// import resourceModel from "../models/resourceModel.js";
import mongoose from "mongoose";
import resourceModel from "../models/resourceModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";
import courseModel from "../models/courseModel.js";


export const uploadResource = async (req, res) => {
    try {
        const file = req.file;

        const { title, description, } = req.body;
        if (!title?.trim() || !description?.trim()) {
            return errorHandler(res, 404, "missing fields")
        }
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return errorHandler(res, 400, "Invalid courseId");
        }
        let attachments;
        if (file) {
            const url = await uploadOnCloudinary(file, 'resources');
            attachments = url.secure_url

        } else {
            return errorHandler(res, 404, "materials required")
        }

        let resourceData = await resourceModel({
            title, description, uploadedBy: req.user.id, fileUrl: attachments, courseId: req.params.id, fileType: file?.mimetype
        })
        let savedResource = await resourceData.save();

        let courseData = await  courseModel.findById(req.params.id);
        courseData?.resources?.push(savedResource._id);

        await courseModel.findByIdAndUpdate(req.params.id, {
            $set: { resources: courseData?.resources }
        })
        successHandler(res, 200, "resource created successfully", savedResource)


    } catch (error) {
        errorHandler(res, 400, error.message)
    }
}

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


export const getUserResources = async (req, res) => {
    try {

        const resourcesData = await resourceModel.find({ createdBy: req.user.id });
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
        const resourcesData = await resourceModel.findByIdAndDelete(req.params.id);
        successHandler(res, 200, "resources deleted successfully")
    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}

export const updateResource = async (req, res) => {

    try {
        const file = req.file
        if (file) {
            const url = await uploadOnCloudinary(file, 'resources-images');
            req.body.profilePic = url.secure_url
        }
        const resourcesData = await resourceModel.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },
            { new: true });
        successHandler(res, 200, "resources updated successfully", resourcesData)

    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}
