import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    resources: [],          // all resources
    singleResource: {},     // single resource detail
    isLoading: false,
    error: null,
};

const resourceSlice = createSlice({
    name: "resource",
    initialState,
    reducers: {

        // FETCH ALL RESOURCES
        fetchResourcesStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchResourcesSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.resources = payload;
        },
        fetchResourcesFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // FETCH SINGLE RESOURCE
        fetchSingleResourceStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchSingleResourceSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.singleResource = payload;
        },
        fetchSingleResourceFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // CREATE RESOURCE
        createResourceStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        createResourceSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.resources.push(payload);
        },
        createResourceFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // DELETE RESOURCE
        deleteResourceStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        deleteResourceSuccess: (state, { payload }) => {
            state.isLoading = false;
            // state.resources = state.resources.filter(r => r._id !== payload);
        },
        deleteResourceFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // CLEAR SINGLE RESOURCE
        clearResourceState: (state) => {
            state.singleResource = null;
            state.error = null;
        }
    }
});

export const {
    fetchResourcesStart,
    fetchResourcesSuccess,
    fetchResourcesFailure,
    fetchSingleResourceStart,
    fetchSingleResourceSuccess,
    fetchSingleResourceFailure,
    createResourceStart,
    createResourceSuccess,
    createResourceFailure,
    deleteResourceStart,
    deleteResourceSuccess,
    deleteResourceFailure,
    clearResourceState
} = resourceSlice.actions;

export default resourceSlice.reducer;
