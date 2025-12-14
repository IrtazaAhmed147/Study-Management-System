import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  singleUser: null,
  userIsLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    // ===== GET ALL USERS =====
    fetchUsersStart: (state) => {
      state.userIsLoading = true;
      state.error = null;
    },
    fetchUsersSuccess: (state, { payload }) => {
      state.userIsLoading = false;
      state.users = payload;
    },
    fetchUsersFailure: (state, { payload }) => {
      state.userIsLoading = false;
      state.error = payload;
    },

    // ===== GET SINGLE USER =====
    fetchSingleUserStart: (state) => {
      state.userIsLoading = true;
      state.error = null;
    },
    fetchSingleUserSuccess: (state, { payload }) => {
      state.userIsLoading = false;
      state.singleUser = payload;
    },
    fetchSingleUserFailure: (state, { payload }) => {
      state.userIsLoading = false;
      state.error = payload;
    },

    // ===== UPDATE USER =====
    updateUserStart: (state) => {
      state.userIsLoading = true;
      state.error = null;
    },
    updateUserSuccess: (state, { payload }) => {
      state.userIsLoading = false;
      state.singleUser = payload;
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const user = JSON.parse(storedUser);
        const updatedUser = {
          ...user,
          profilePic: payload.profilePic,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    },
    updateUserFailure: (state, { payload }) => {
      state.userIsLoading = false;
      state.error = payload;
    },

    // ===== CLEAR STATE =====
    clearUserState: (state) => {
      state.singleUser = null;
      state.error = null;
    }
  },
});

export const {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchSingleUserStart,
  fetchSingleUserSuccess,
  fetchSingleUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  clearUserState
} = userSlice.actions;

export default userSlice.reducer;
