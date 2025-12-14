import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import userSlice from './slices/userSlice'
import courseSlice from './slices/courseSlice'
import assignmentsSlice from './slices/assignmentsSlice'
import resourceSlice from './slices/resourceSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        course: courseSlice,
        assignments: assignmentsSlice,
        resource: resourceSlice,

    }
})

export default store