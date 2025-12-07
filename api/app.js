import express from 'express'
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from './utils/connectDB.js'
import helmet from "helmet"
import { userRouter } from './routes/userRoute.js'
import { authRouter } from './routes/authRoute.js'
import { courseRouter } from './routes/courseRoute.js'
import { assignmentsRouter } from './routes/assignmentsRoute.js'
import { quizRouter } from './routes/quizRoute.js'
import { resourceRouter } from './routes/resourceRoute.js'

const app = express()

dotenv.config()


// mongodb connection
connectDB()


// middleware
app.use(express.json())
app.use(helmet())
// app.use(mongoSanitize())

app.use(cors({
    origin: 'http://localhost:5173' ,
    credentials: true
}))



// routes
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/course',courseRouter)
app.use('/api/assignment',assignmentsRouter)
app.use('/api/quiz',quizRouter)
app.use('/api/resource',resourceRouter)




if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 6500;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

// Export for Vercel
export default app;