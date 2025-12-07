import express from 'express'
// import {  login, logout, register, verifyEmail } from '../controllers/courseController.js'
import { verifyToken } from '../middleware/verifyToken.js'
import { uploadResource } from '../controllers/resourceController.js';
import multer from 'multer';

const resourceRouter = express.Router()


const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

resourceRouter.post("/course/:id/", verifyToken,upload.single('material'), uploadResource);
// resourceRouter.get("/courses/:id/resources", verifyToken, getCourseResources);
// resourceRouter.get("/:id", getResourceById);
// resourceRouter.put("/:id", verifyToken, updateResource);


export {resourceRouter}
