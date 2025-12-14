import api from "../../utils/common";
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchSingleUserStart,
  fetchSingleUserSuccess,
  fetchSingleUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../slices/userSlice";

export const getAllUsersAction = (query = {}) => async (dispatch) => {
  try {
    dispatch(fetchUsersStart());

    const token = localStorage.getItem("token");

    const res = await api.get("/user", {
      headers: { Authorization: `Bearer ${token}` },
      params: query,
      withCredentials: true,
    });

    dispatch(fetchUsersSuccess(res.data.data));
    return res.data.data;

  } catch (error) {
    dispatch(fetchUsersFailure(error.response?.data?.message));
    throw error.response?.data?.message;
  }
};

export const getSingleUserAction = (id) => async (dispatch) => {
  try {
    dispatch(fetchSingleUserStart());

    const token = localStorage.getItem("token");

    const res = await api.get(`/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    dispatch(fetchSingleUserSuccess(res.data.data));
    return res.data.data;

  } catch (error) {
    dispatch(fetchSingleUserFailure(error.response?.data?.message));
    throw error.response?.data?.message;
  }
};

export const updateUserAction = (id, formData) => async (dispatch) => {
  try {
    dispatch(updateUserStart());

    const token = localStorage.getItem("token");

    const res = await api.put(`/user/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    dispatch(updateUserSuccess(res.data.data));
    return res.data.message;

  } catch (error) {
    dispatch(updateUserFailure(error.response?.data?.message));
    throw error.response?.data?.message;
  }
};

export const deleteUserAction = (id) => async (dispatch) => {
  try {
    dispatch(fetchUsersStart());

    const token = localStorage.getItem("token");

    const res = await api.delete(`/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    return res.data.message;

  } catch (error) {
    dispatch(fetchUsersFailure(error.response?.data?.message));
    throw error.response?.data?.message;
  }
};

export const deactivateUserAction = (id, body) => async (dispatch) => {
  try {
    dispatch(updateUserStart());

    const token = localStorage.getItem("token");

    const res = await api.put(`/user/deactivate/${id}`, body, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    dispatch(updateUserSuccess(res.data.data));
    return res.data.message;

  } catch (error) {
    dispatch(updateUserFailure(error.response?.data?.message));
    throw error.response?.data?.message;
  }
};

export const suspendUserAction = (id, body) => async (dispatch) => {
  try {
    dispatch(updateUserStart());

    const token = localStorage.getItem("token");

    const res = await api.put(`/user/suspend/${id}`, body, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    dispatch(updateUserSuccess(res.data.data));
    return res.data.message;

  } catch (error) {
    dispatch(updateUserFailure(error.response?.data?.message));
    throw error.response?.data?.message;
  }
};
