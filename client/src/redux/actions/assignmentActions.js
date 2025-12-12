import api from "../../utils/common.js";
import {
    fetchAssignmentsStart,
    fetchAssignmentsSuccess,
    fetchAssignmentsFailure,
    fetchSingleAssignmentStart,
    fetchSingleAssignmentSuccess,
    fetchSingleAssignmentFailure,
    createAssignmentStart,
    createAssignmentSuccess,
    createAssignmentFailure,
} from "../slices/assignmentsSlice.js";

// CREATE ASSIGNMENT
export const createAssignmentAction = (courseId, assignmentData) => async (dispatch) => {
        console.log(courseId);
        console.log(assignmentData);
        
    try {
        dispatch(createAssignmentStart());

        const token = localStorage.getItem("token");

        const res = await api.post(`/assignment/create/course/${courseId}`, assignmentData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true,
        });

        dispatch(createAssignmentSuccess(res.data.data));
        return res.data.message;

    } catch (error) {
        dispatch(createAssignmentFailure(error.response.data.message));
        throw error.response.data.message;
    }
};

// GET USER ASSIGNMENTS
export const getUserAssignmentsAction = (query) => async (dispatch) => {
    try {
        dispatch(fetchAssignmentsStart());

        const token = localStorage.getItem("token");

        const res = await api.get(`/assignment`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
            params: query
        });

        dispatch(fetchAssignmentsSuccess(res.data.data));
        return res.data.data;

    } catch (error) {
        dispatch(fetchAssignmentsFailure(error.response.data.message));
        throw error.response.data.message;
    }
};

// GET SINGLE ASSIGNMENT
export const getSingleAssignmentAction = (id) => async (dispatch) => {
    try {
        dispatch(fetchSingleAssignmentStart());

        const token = localStorage.getItem("token");

        const res = await api.get(`/assignment/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });

        dispatch(fetchSingleAssignmentSuccess(res.data.data));
        return res.data.data;

    } catch (error) {
        dispatch(fetchSingleAssignmentFailure(error.response.data.message));
        throw error.response.data.message;
    }
};

// DELETE ASSIGNMENT
export const deleteAssignmentAction = (id, courseId) => async (dispatch) => {
    try {
        dispatch(fetchAssignmentsStart());

        const token = localStorage.getItem("token");

        const res = await api.delete(`/assignment/${id}/course/${courseId}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });

        // Remove deleted assignment from state manually
        dispatch(getUserAssignmentsAction({}));

        return res.data.message;

    } catch (error) {
        dispatch(fetchAssignmentsFailure(error.response.data.message));
        throw error.response.data.message;
    }
};

// UPDATE ASSIGNMENT
export const updateAssignmentAction = (id, assignmentData) => async (dispatch) => {
    try {
        dispatch(createAssignmentStart());

        const token = localStorage.getItem("token");

        const res = await api.put(`/assignment/${id}`, assignmentData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true,
        });

        dispatch(createAssignmentSuccess(res.data.data));
        return res.data.message;

    } catch (error) {
        dispatch(createAssignmentFailure(error.response.data.message));
        throw error.response.data.message;
    }
};
