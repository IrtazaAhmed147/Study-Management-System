import express from 'express';
import { deactivateUser, deleteUser, getAllUsers, getSingleUser, suspendUser, updateUser } from '../controllers/userController.js';
import multer from 'multer';
import { verifyAdmin, verifyToken } from '../middleware/verifyToken.js';

const userRouter = express.Router();


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix + `.${file.mimetype.split('/')[1]}`)
//     }
// })


const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

// router.post('/', verifyToken, upload.single('image'), imageUpload)
// router.post('/', verifyToken, upload.array('image',10), imageUpload)


userRouter.get('/', verifyToken, verifyAdmin, getAllUsers)
userRouter.get('/:id', verifyToken, getSingleUser)
userRouter.delete('/:id', verifyToken, verifyAdmin, deleteUser);
userRouter.put('/deactivate/:id', verifyToken, deactivateUser)
userRouter.put('/suspend/:id', verifyToken,verifyAdmin, suspendUser)
userRouter.put('/:id', verifyToken, upload.single('profilePic'), updateUser)




export { userRouter }