import courseModel from "../models/courseModel.js";
import quizModel from "../models/quizModel.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";


export const createQuizs = async (req, res) => {
    try {
        const files = req.files || [];
        const { title, description, dueDate, status } = req.body;

        if (!title?.trim() || !description?.trim()) {
            return errorHandler(res, 400, "Title and description are required");
        }

        if (!dueDate) {
            return errorHandler(res, 400, "Due date required");
        }

        let attachments = [];
        for (const file of files) {
            const url = await uploadOnCloudinary(file, "quiz-images");
            attachments.push(url.secure_url);
        }

        const quiz = new quizModel({
            title,
            description,
            createdBy: req.user.id,
            dueDate,
            status,
            attachments,
            courseId: req.params.id,
            type: "quiz"
        });

        const savedQuiz = await quiz.save();

        await courseModel.findByIdAndUpdate(req.params.id, {
            $push: { quizzes: savedQuiz._id }
        });

        successHandler(res, 200, "Quiz created successfully", savedQuiz);

    } catch (error) {
        errorHandler(res, 400, error.message);
    }
};



export const getAllQuizs = async (req, res) => {
    try {
        const quizData = await quizModel.find();
        successHandler(res, 200, "All quizzes fetched", quizData);
    } catch (err) {
        errorHandler(res, 400, err.message);
    }
};



export const getSingleQuiz = async (req, res) => {
    try {
        const quiz = await quizModel.findById(req.params.id);
        if (!quiz) return errorHandler(res, 404, "Quiz not found");

        successHandler(res, 200, "Quiz found", quiz);
    } catch (err) {
        errorHandler(res, 400, err.message);
    }
};



export const getUserQuizs = async (req, res) => {
    try {
        const quizs = await quizModel.find({ createdBy: req.user.id });
        successHandler(res, 200, "User quizzes fetched", quizs);
    } catch (err) {
        errorHandler(res, 400, err.message);
    }
};



export const deleteQuiz = async (req, res) => {
    try {
        const quiz = await quizModel.findById(req.params.id);
        if (!quiz) return errorHandler(res, 404, "Quiz not found");

        for (const url of quiz.attachments) {
            await deleteFromCloudinary(url);
        }

        await quizModel.findByIdAndDelete(req.params.id);

        await courseModel.findByIdAndUpdate(req.params.courseId, {
            $pull: { quizzes: req.params.id }
        });

        successHandler(res, 200, "Quiz deleted successfully");

    } catch (err) {
        errorHandler(res, 400, err.message);
    }
};



export const updateQuiz = async (req, res) => {
    try {
        if (req.file) {
            const url = await uploadOnCloudinary(req.file, "quiz-images");
            req.body.newAttachment = url.secure_url;
        }

        const updatedQuiz = await quizModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (req.body.newAttachment) {
            updatedQuiz.attachments.push(req.body.newAttachment);
            await updatedQuiz.save();
        }

        successHandler(res, 200, "Quiz updated successfully", updatedQuiz);

    } catch (err) {
        errorHandler(res, 400, err.message);
    }
};
