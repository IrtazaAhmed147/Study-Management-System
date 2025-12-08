import express from 'express'
import {  forgotPassword, login, logout, register, resetPass, verifyEmail } from '../controllers/authController.js'
import { verifyToken } from '../middleware/verifyToken.js'

const authRouter = express.Router()



authRouter.post('/signup', register)
authRouter.post('/login', login)
authRouter.post('/forgotPassword', forgotPassword)
authRouter.post('/resetPassword', resetPass)
authRouter.get('/logout', logout)
authRouter.post('/verifyEmail', verifyEmail)
 
export {authRouter}