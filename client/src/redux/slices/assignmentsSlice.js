import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    assignments: [],        // all assignments
    singleAssignment: null, // single assignment detail
    isLoading: false,
    error: null,
};

const assignmentsSlice = createSlice({
    name: "assignment",
    initialState,
    reducers: {

        // FETCH ALL USER ASSIGNMENTS
        fetchAssignmentsStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchAssignmentsSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.assignments = payload;
        },
        fetchAssignmentsFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // FETCH SINGLE ASSIGNMENT
        fetchSingleAssignmentStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchSingleAssignmentSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.singleAssignment = payload;
        },
        fetchSingleAssignmentFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // CREATE ASSIGNMENT
        createAssignmentStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        createAssignmentSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.assignments.push(payload);
        },
        createAssignmentFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // CLEAR ASSIGNMENT STATE
        clearAssignmentState: (state) => {
            state.singleAssignment = null;
            state.error = null;
        }
    }
});

export const {
    fetchAssignmentsStart,
    fetchAssignmentsSuccess,
    fetchAssignmentsFailure,
    fetchSingleAssignmentStart,
    fetchSingleAssignmentSuccess,
    fetchSingleAssignmentFailure,
    createAssignmentStart,
    createAssignmentSuccess,
    createAssignmentFailure,
    clearAssignmentState
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
