import courseModel from "../models/courseModel.js";
import course from "../models/courseModel.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";


export const createCourse = async(req, res)=> {
    try {
        
        const {title, description, courseCode} = req.body;
        if(!title.trim() || !description.trim() ) {
            return errorHandler(res, 404, "missing fields")
        }

        let courseData = await courseModel({
            title, description, courseCode, owner: req.user.id,
        })
       let savedCourse = await courseData.save();
        successHandler(res, 200, "course created successfully",savedCourse)
        

    } catch (error) {
        errorHandler(res,400, error.message)
    }
}

export const getAllcourses = async (req, res) => {
    const { coursename, email, isAdmin } = req.query;
    const filter = {};
    if (coursename) filter.coursename = coursename;
    if (email) filter.email = email;
    if (isAdmin !== undefined) filter.isAdmin = isAdmin === 'true';
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
        if(!courseData) return errorHandler(res, 404, "course not found")
        successHandler(res, 200, "course found successfully", courseData)
    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}


export const getUserCourses = async (req, res) => {
    try {
        
        const courseData = await course.find({owner:req.user.id});
        if(!courseData) return errorHandler(res, 404, "course not found")
        successHandler(res, 200, "course found successfully", courseData)
    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}

export const deletecourse = async (req, res) => {
    try {
        const courseData = await course.findByIdAndDelete(req.params.id);
        successHandler(res, 200, "course deleted successfully", courseData)
    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}

export const updatecourse = async (req, res) => {
    
    try {
        const file = req.file
        if(file) {
              const url = await uploadOnCloudinary(file,'course-images');
              req.body.profilePic = url.secure_url
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
