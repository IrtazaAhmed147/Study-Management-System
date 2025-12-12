import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courses: [],           // all courses
    singleCourse: null,    // course detail page
    isLoading: false,
    error: null,
};

const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {

        // FETCH ALL COURSES
        fetchCoursesStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchCoursesSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.courses = payload;
        },
        fetchCoursesFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log(state.error);
            
        },

        // FETCH SINGLE COURSE
        fetchSingleCourseStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchSingleCourseSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.singleCourse = payload;
        },
        fetchSingleCourseFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // CREATE COURSE
        createCourseStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        createCourseSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.courses.push(payload);
        },
        createCourseFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // CLEAR COURSE STATE 
        clearCourseState: (state) => {
            state.singleCourse = null;
            state.error = null;
        }
    }
});

export const {
    fetchCoursesStart,
    fetchCoursesSuccess,
    fetchCoursesFailure,
    fetchSingleCourseStart,
    fetchSingleCourseSuccess,
    fetchSingleCourseFailure,
    createCourseStart,
    createCourseSuccess,
    createCourseFailure,
    clearCourseState
} = courseSlice.actions;

export default courseSlice.reducer;
