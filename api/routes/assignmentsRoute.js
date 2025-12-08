import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js'
import multer from 'multer';
import { createAssignment, deleteAssignment, getAllAssignments, getSingleAssignment, getUserAssignments, updateAssignment } from '../controllers/assignmentsController.js';

const assignmentsRouter = express.Router()


const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

assignmentsRouter.post("/create/course/:id", verifyToken,upload.array('attachments'), createAssignment);
assignmentsRouter.get("/all", verifyToken,getAllAssignments);
assignmentsRouter.get("/:id", verifyToken, getSingleAssignment);
assignmentsRouter.get("/", verifyToken, getUserAssignments);
assignmentsRouter.put("/:id", verifyToken, updateAssignment);
assignmentsRouter.delete("/:id/course/:courseId", verifyToken, deleteAssignment);


export {assignmentsRouter}
