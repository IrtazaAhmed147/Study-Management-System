import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courses: [],           // all courses
    singleCourse: {},    // course detail page
    courseIsLoading: false,
    error: null,
};

const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {

        // FETCH ALL COURSES
        fetchCoursesStart: (state) => {
            state.courseIsLoading = true;
            state.error = null;
        },
        fetchCoursesSuccess: (state, { payload }) => {
            state.courseIsLoading = false;
            state.courses = payload;
        },
        fetchCoursesFailure: (state, action) => {
            state.courseIsLoading = false;
            state.error = action.payload;
            console.log(state.error);
            
        },

        // FETCH SINGLE COURSE
        fetchSingleCourseStart: (state) => {
            state.courseIsLoading = true;
            state.error = null;
        },
        fetchSingleCourseSuccess: (state, { payload }) => {
            state.courseIsLoading = false;
            state.singleCourse = payload;
        },
        fetchSingleCourseFailure: (state, action) => {
            state.courseIsLoading = false;
            state.error = action.payload;
        },

        // CREATE COURSE
        createCourseStart: (state) => {
            state.courseIsLoading = true;
            state.error = null;
        },
        createCourseSuccess: (state, { payload }) => {
            state.courseIsLoading = false;
            state.courses.push(payload);
        },
        createCourseFailure: (state, action) => {
            state.courseIsLoading = false;
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
