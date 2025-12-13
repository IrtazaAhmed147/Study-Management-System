import api from "../../utils/common.js";
import {
    fetchCoursesStart,
    fetchCoursesSuccess,
    fetchCoursesFailure,
    fetchSingleCourseStart,
    fetchSingleCourseSuccess,
    fetchSingleCourseFailure,
    createCourseStart,
    createCourseSuccess,
    createCourseFailure,
} from "../slices/courseSlice";



export const createCourseAction = (courseData) => async (dispatch) => {
    try {
        dispatch(createCourseStart());

        const token = localStorage.getItem("token");

        const res = await api.post("/course/create", courseData, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });

        dispatch(createCourseSuccess(res.data.data));
        return res.data.message;

    } catch (error) {
        dispatch(createCourseFailure(error.response.data.message));
        throw error.response.data.message;
    }
};



export const getUserCoursesAction = (query = '') => async (dispatch) => {
    console.log(query);

    try {
        dispatch(fetchCoursesStart());

        const token = localStorage.getItem("token");

        const res = await api.get(`/course`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
            params: query
        });


        dispatch(fetchCoursesSuccess(res.data.data));
        console.log(res.data.data);
        
        return res.data.data;

    } catch (error) {

        dispatch(fetchCoursesFailure(error.response.data.message));
        throw error.response.data.message;
    }
};




// export const getAllCoursesAction = () => async (dispatch) => {
//     try {
//         dispatch(fetchCoursesStart());

//         const token = localStorage.getItem("token");

//         const res = await api.get("/course/all", {
//             headers: { Authorization: `Bearer ${token}` },
//             withCredentials: true,
//         });

//         dispatch(fetchCoursesSuccess(res.data.data));
//         return res.data.data;

//     } catch (error) {
//         dispatch(fetchCoursesFailure(error.response.data.message));
//         throw error.response.data.message;
//     }
// };




export const getSingleCourseAction = (id) => async (dispatch) => {
    try {
        dispatch(fetchSingleCourseStart());

        const token = localStorage.getItem("token");

        const res = await api.get(`/course/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });

        dispatch(fetchSingleCourseSuccess(res.data.data));
        return res.data.data;

    } catch (error) {
        dispatch(fetchSingleCourseFailure(error.response.data.message));
        throw error.response.data.message;
    }
};




export const updateCourseAction = (id, body) => async (dispatch) => {
    try {
        dispatch(createCourseStart()); // reusing same loading style

        const token = localStorage.getItem("token");

        const res = await api.put(`/course/${id}`, body, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });

        dispatch(createCourseSuccess(res.data.data)); // updated data
        return res.data.message;

    } catch (error) {
        dispatch(createCourseFailure(error.response.data.message));
        throw error.response.data.message;
    }
};



export const deleteCourseAction = (id) => async (dispatch) => {
    try {
        dispatch(fetchCoursesStart());

        const token = localStorage.getItem("token");

        const res = await api.delete(`/course/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });

        dispatch(fetchCoursesSuccess()); // you may remove from list in UI manually
        return res.data.message;

    } catch (error) {
        dispatch(fetchCoursesFailure(error.response.data.message));
        throw error.response.data.message;
    }
};
