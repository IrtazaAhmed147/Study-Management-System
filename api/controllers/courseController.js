import assignmentsModel from "../models/assignmentsModel.js";
import courseModel from "../models/courseModel.js";
import course from "../models/courseModel.js"
import quizModel from "../models/quizModel.js";
import resourceModel from "../models/resourceModel.js";
import userModel from "../models/userModel.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";


export const createCourse = async (req, res) => {
    try {

        const { title, description, courseCode } = req.body;
        if (!title.trim() ) {
            return errorHandler(res, 404, "missing fields")
        }

        let courseData = await courseModel({
            title, description, courseCode, owner: req.user.id,
        })
        let savedCourse = await courseData.save();

        await userModel.findByIdAndUpdate(req.user.id, {
            $push: { courses: savedCourse._id }
        });

        successHandler(res, 200, "course created successfully", savedCourse)


    } catch (error) {
        errorHandler(res, 400, error.message)
    }
}

export const getAllcourses = async (req, res) => {
    const { courseName, } = req.query;
    const filter = {};
    if (courseName) filter.title = courseName;
    try {
        const courseData = await course.find(filter);
        successHandler(res, 200, "All courses fetched", courseData)
    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}


export const getSinglecourse = async (req, res) => {
    try {
        const courseData = await course.findById(req.params.id);
        if (!courseData) return errorHandler(res, 404, "course not found")
        successHandler(res, 200, "course found successfully", courseData)
    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}

export const getUserCourses = async (req, res) => {
    try {
        const { courseName, courseType } = req.query;
        console.log(req.query);
        
        const filter = {};
        if (courseName) {
            filter.title = { $regex: courseName, $options: "i" }; // better search
        }
        if (courseType === 'all') {

            filter.$or = [
                { owner: req.user.id },
                { members: req.user.id }
            ];
        }
        if (courseType === "mycourses") {
            filter.owner = req.user.id;
        }
        else if (courseType === "sharedcourses") {
            filter.members = req.user.id;
        }
        const courseData = await course.find(filter);

        if (!courseData || courseData.length === 0) {
            return errorHandler(res, 404, "No courses found");
        }
        return successHandler(res, 200, "Courses fetched successfully", courseData);

    } catch (err) {
        console.log(err);
        return errorHandler(res, 400, err.message);
    }
};


export const deletecourse = async (req, res) => {
    try {
        // const courseData = await course.findByIdAndDelete(req.params.id);
        const courseData = await courseModel.findById(req.params.id).populate("resources");

        for (const resource of courseData?.resources) {
            if (resource?.publicId) {
                await deleteFromCloudinary(resource.publicId);
            }
            await resourceModel.findByIdAndDelete(resource._id)
        }
        for (const assignment of courseData?.assignments) {

            await assignmentsModel.findByIdAndDelete(assignment._id)
        }
        for (const quiz of courseData?.quizzes) {
            await quizModel.findByIdAndDelete(quiz._id)
        }
        await courseModel.findByIdAndDelete(req.params.id);
        successHandler(res, 200, "course deleted successfully", courseData)
    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}

export const suspendCourse = async (req, res) => {
    try {
        const courseData = await course.findByIdAndUpdate(req.params.id, {
            $set: { suspend: true },
        });
        successHandler(res, 200, "course deleted successfully", courseData)
    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}

export const updatecourse = async (req, res) => {

    try {
        const { title, description } = req.body;
        if (!title.trim() || !description.trim()) {
            return errorHandler(res, 404, "missing fields")
        }

        const courseData = await course.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },
            { new: true });
        successHandler(res, 200, "course updated successfully", courseData)

    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}
