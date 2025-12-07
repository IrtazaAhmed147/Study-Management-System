
import quizModel from "../models/quizModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";


export const createQuizs = async (req, res) => {
    try {
        const files = req.files;
        const { title, description, dueDate, status, courseId } = req.body;
        if (!title.trim() || !description.trim()) {
            return errorHandler(res, 404, "missing fields")
        }
        let attachments = [];
        if (files) {
            for (const file of files) {

                const url = await uploadOnCloudinary(file, 'Quiz-images');
                attachments.push(url.secure_url);
            }
        }

        let QuizData = await quizModel({
            title, description, createdBy: req.user.id, dueDate, status, attachments, courseId, type:"quiz"
        })
        let savedQuiz = await QuizData.save();
        successHandler(res, 200, "Quiz created successfully", savedQuiz)


    } catch (error) {
        errorHandler(res, 400, error.message)
    }
}

export const getAllQuizs = async (req, res) => {
    const { Quizsname, email, isAdmin } = req.query;
    const filter = {};
    if (Quizsname) filter.Quizsname = Quizsname;
    if (email) filter.email = email;
    if (isAdmin !== undefined) filter.isAdmin = isAdmin === 'true';
    try {
        const quizsData = await quizModel.find(filter);
        successHandler(res, 200, "All Quizss fetched", quizsData)
    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}


export const getSingleQuiz = async (req, res) => {
    try {
        const quizData = await quizModel.findById(req.params.id);
        if (!quizData) return errorHandler(res, 404, "Quizs not found")
        successHandler(res, 200, "Quiz found successfully", quizData)
    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}


export const getUserQuizs = async (req, res) => {
    try {

        const quizsData = await quizModel.find({ createdBy: req.user.id });
        if (!quizsData) return errorHandler(res, 404, "Quizs not found")
        successHandler(res, 200, "Quizs found successfully", quizsData)
    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}

export const deleteQuiz = async (req, res) => {
    try {
        await quizModel.findByIdAndDelete(req.params.id);
        successHandler(res, 200, "Quizs deleted successfully")
    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}

export const updateQuiz = async (req, res) => {

    try {
        const file = req.file
        if (file) {
            const url = await uploadOnCloudinary(file, 'Quizs-images');
            req.body.profilePic = url.secure_url
        }
        const quizData = await quizModel.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },
            { new: true });
        successHandler(res, 200, "Quizs updated successfully", quizData)

    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}
