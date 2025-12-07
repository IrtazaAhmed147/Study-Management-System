import express from 'express'
// import { createCourse, deletecourse, getAllcourses, getSinglecourse, getUserCourses, updatecourse, } from '../controllers/courseController.js'
import { verifyToken } from '../middleware/verifyToken.js'
import { getAllInvitations, sendInvite, updateInvite } from '../controllers/courseInviteController.js';

const inviteRouter = express.Router()


inviteRouter.post("/send/:id/course/:courseId", verifyToken, sendInvite);
// inviteRouter.get("/", verifyToken, getUserCourses);
inviteRouter.get("/all", verifyToken, getAllInvitations);
// inviteRouter.get("/:id", verifyToken, getSinglecourse);
inviteRouter.put("/:id", verifyToken, updateInvite);
// inviteRouter.delete("/:id", verifyToken, deletecourse);


export { inviteRouter }
