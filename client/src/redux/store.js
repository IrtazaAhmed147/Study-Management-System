import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import courseSlice from './slices/courseSlice'
import assignmentsSlice from './slices/assignmentsSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        course: courseSlice,
        assignments: assignmentsSlice,
    }
})

export default store