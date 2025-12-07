import assignmentsModel from "../models/assignmentsModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";


export const createAssignment = async (req, res) => {
    try {
        const files = req.files;
        const { title, description, dueDate, status, courseId } = req.body;
        if (!title.trim() || !description.trim()) {
            return errorHandler(res, 404, "missing fields")
        }
        let attachments = [];
        if (files) {
            for (const file of files) {

                const url = await uploadOnCloudinary(file, 'assignment-images');
                attachments.push(url.secure_url);
            }
        }

        let assignmentData = await assignmentsModel({
            title, description, createdBy: req.user.id, dueDate, status, attachments, courseId, type:"assignment"
        })
        let savedAssignment = await assignmentData.save();
        successHandler(res, 200, "assignment created successfully", savedAssignment)


    } catch (error) {
        errorHandler(res, 400, error.message)
    }
}

export const getAllAssignments = async (req, res) => {
    const { assignmentsname, email, isAdmin } = req.query;
    const filter = {};
    if (assignmentsname) filter.assignmentsname = assignmentsname;
    if (email) filter.email = email;
    if (isAdmin !== undefined) filter.isAdmin = isAdmin === 'true';
    try {
        const assignmentsData = await assignmentsModel.find(filter);
        successHandler(res, 200, "All assignmentss fetched", assignmentsData)
    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}


export const getSingleAssignment = async (req, res) => {
    try {
        const assignmentsData = await assignmentsModel.findById(req.params.id);
        if (!assignmentsData) return errorHandler(res, 404, "assignments not found")
        successHandler(res, 200, "assignments found successfully", assignmentsData)
    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}


export const getUserAssignments = async (req, res) => {
    try {

        const assignmentsData = await assignmentsModel.find({ createdBy: req.user.id });
        if (!assignmentsData) return errorHandler(res, 404, "assignments not found")
        successHandler(res, 200, "assignments found successfully", assignmentsData)
    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}

export const deleteAssignment = async (req, res) => {
    try {
        const assignmentsData = await assignmentsModel.findByIdAndDelete(req.params.id);
        successHandler(res, 200, "assignments deleted successfully")
    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}

export const updateAssignment = async (req, res) => {

    try {
        const file = req.file
        if (file) {
            const url = await uploadOnCloudinary(file, 'assignments-images');
            req.body.profilePic = url.secure_url
        }
        const assignmentsData = await assignmentsModel.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },
            { new: true });
        successHandler(res, 200, "assignments updated successfully", assignmentsData)

    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}
