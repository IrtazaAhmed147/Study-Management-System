import express from 'express'
// import {  login, logout, register, verifyEmail } from '../controllers/courseController.js'
import { verifyAdmin, verifyToken } from '../middleware/verifyToken.js'
import { deleteAllResource, deleteResource, getAllResources, getCourseResources, getSingleResource, uploadResource } from '../controllers/resourceController.js';
import multer from 'multer';

const resourceRouter = express.Router()


const storage = multer.memoryStorage();
const upload = multer({ storage: storage,    limits: { fileSize: 10 * 1024 * 1024 },  })

resourceRouter.post("/course/:id/", verifyToken,upload.array('materials',10), uploadResource);
resourceRouter.get("/all", verifyToken,verifyAdmin, getAllResources);
resourceRouter.get("/courses/:id/", verifyToken, getCourseResources);
resourceRouter.get("/:id", getSingleResource);
resourceRouter.delete("/:id/course/:courseId", verifyToken, deleteResource);
resourceRouter.delete("/course/:courseId", verifyToken, deleteAllResource);
// resourceRouter.put("/:id", verifyToken, updateResource);


export {resourceRouter}
