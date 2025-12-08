import express from 'express'
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import http from "http";
import { Server } from "socket.io";
import { connectDB } from './utils/connectDB.js'

// Routers
import { userRouter } from './routes/userRoute.js'
import { authRouter } from './routes/authRoute.js'
import { courseRouter } from './routes/courseRoute.js'
import { assignmentsRouter } from './routes/assignmentsRoute.js'
import { quizRouter } from './routes/quizRoute.js'
import { resourceRouter } from './routes/resourceRoute.js'
import { inviteRouter } from './routes/InviteRoute.js'
import notificationRouter from './routes/notificationRoute.js';

dotenv.config();

const app = express();

// DB
connectDB();

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


// ROUTES
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/course', courseRouter);
app.use('/api/assignment', assignmentsRouter);
app.use('/api/quiz', quizRouter);
app.use('/api/resource', resourceRouter);
app.use('/api/invite', inviteRouter);
app.use('/api/notification', notificationRouter);


if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 6500;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

// For Vercel (not used locally)
export default app;



