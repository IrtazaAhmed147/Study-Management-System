import express from 'express';
import { deactivateUser, deleteUser, getAllUsers, getLoginUser, getSingleUser, suspendUser, updateUser } from '../controllers/userController.js';
import multer from 'multer';
import { verifyAdmin, verifyToken } from '../middleware/verifyToken.js';

const userRouter = express.Router();



const storage = multer.memoryStorage();
const upload = multer({ storage: storage })


userRouter.get('/all', verifyToken, verifyAdmin, getAllUsers)
userRouter.get('/me', verifyToken, getLoginUser)
userRouter.get('/:id', verifyToken, getSingleUser)
userRouter.delete('/:id', verifyToken, verifyAdmin, deleteUser);
userRouter.put('/deactivate/:id', verifyToken, deactivateUser)
userRouter.put('/suspend/:id', verifyToken,verifyAdmin, suspendUser)
userRouter.put('/:id', verifyToken, upload.single('profilePic'), updateUser)




export { userRouter }