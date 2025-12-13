import assignmentsModel from "../models/assignmentsModel.js";
import courseModel from "../models/courseModel.js";
import { uploadOnCloudinary, deleteFromCloudinary, uploadFileOnCloudinary } from "../utils/cloudinary.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";


export const createAssignment = async (req, res) => {
    try {
        const files = req.files || [];
        const { title, description, dueDate, status } = req.body;

        if (!title?.trim() || !description?.trim()) {
            return errorHandler(res, 400, "Title and description are required");
        }

        if (!dueDate) {
            return errorHandler(res, 400, "Due date required");
        }

        const attachments = [];

        for (const file of files) {
            if (file.mimetype?.startsWith("image/")) {
                const url = await uploadOnCloudinary(file, "assignmentsFile");
                attachments.push({ url: url.secure_url, mimetype: file.mimetype });
            } else if (file.mimetype === "application/pdf" || file.mimetype === "text/plain") {
                const url = await uploadFileOnCloudinary(file, "assignmentsFile");
                attachments.push({ url: url.secure_url, mimetype: file.mimetype });
            } else {
                console.log("Unsupported file type:", file.mimetype);
            }

        }
        console.log(title, description, dueDate, attachments);

        const assignment = new assignmentsModel({
            title: title,
            description,
            createdBy: req.user.id,
            dueDate,
            status,
            attachments,
            courseId: req.params.id,
            type: "assignment"
        });

        const saved = await assignment.save();

        await courseModel.findByIdAndUpdate(req.params.id, {
            $push: { assignments: saved._id }
        });

        successHandler(res, 200, "Assignment created successfully", saved);
        // successHandler(res, 200, "Assignment created successfully");

    } catch (error) {
        errorHandler(res, 400, error.message);
    }
};



export const getAllAssignments = async (req, res) => {
    try {

        const { title, dueDate, createdBy, status } = req.query;

        const filter = {};
        if (title) { filter.title = { $regex: title, $options: "i" } };
        if (dueDate) { filter.dueDate = dueDate };
        if (createdBy) { filter.createdBy = createdBy };
        if (status) { filter.status = status };



        const assignments = await assignmentsModel.find(filter);
        successHandler(res, 200, "All assignments fetched", assignments);
    } catch (err) {
        errorHandler(res, 400, err.message);
    }
};


export const getSingleAssignment = async (req, res) => {
    try {
        const assignment = await assignmentsModel.findById(req.params.id).populate({
            path: "courseId",
            select: "title"
        });
        if (!assignment) return errorHandler(res, 404, "Assignment not found");

        successHandler(res, 200, "Assignment found", assignment);
    } catch (err) {
        errorHandler(res, 400, err.message);
    }
};



export const getUserAssignments = async (req, res) => {
    try {

        const { title, dueDate, status } = req.query;

        const filter = { createdBy: req.user.id };
        if (title) { filter.title = { $regex: title, $options: "i" } };
        if (dueDate) { filter.dueDate = dueDate };
        if (status) { filter.status = status };
        const assignments = await assignmentsModel.find(filter).populate({
            path: "courseId",
            select: "title"
        });

        successHandler(res, 200, "Assignments fetched", assignments);
    } catch (err) {
        errorHandler(res, 400, err.message);
    }
};



export const deleteAssignment = async (req, res) => {
    try {
        const assignment = await assignmentsModel.findById(req.params.id);
        if (!assignment) return errorHandler(res, 404, "Assignment not found");

        for (let url of assignment.attachments) {
            await deleteFromCloudinary(url);
        }

        await assignmentsModel.findByIdAndDelete(req.params.id);

        await courseModel.findByIdAndUpdate(req.params.courseId, {
            $pull: { assignments: req.params.id }
        });

        successHandler(res, 200, "Assignment deleted");
    } catch (err) {
        errorHandler(res, 400, err.message);
    }
};



export const updateAssignment = async (req, res) => {
    try {
        const files = req.files || [];
        req.body.attachments = [];
        if (req.files) {

            for (const file of files) {
                if (file.mimetype?.startsWith("image/")) {
                    const url = await uploadOnCloudinary(file, "assignmentsFile");
                    req.body.attachments.push({ url: url.secure_url, mimetype: file.mimetype });
                } else if (file.mimetype === "application/pdf" || file.mimetype === "text/plain") {
                    const url = await uploadFileOnCloudinary(file, "assignmentsFile");
                    req.body.attachments.push({ url: url.secure_url, mimetype: file.mimetype });
                } else {
                    console.log("Unsupported file type:", file.mimetype);
                }

            }
        }
        console.log(req.body);

        const updated = await assignmentsModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (req?.body?.newAttachment) {
            updated.attachments.push(req.body.newAttachment);
            await updated.save();
        }

        successHandler(res, 200, "Assignment updated", updated);

    } catch (err) {
        errorHandler(res, 400, err.message);
    }
};
