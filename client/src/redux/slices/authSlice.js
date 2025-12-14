import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: null,
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    // LOGIN
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    loginSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      state.isAuthenticated = true;
      state.error = null;
    },

    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // LOAD USER (token valid)
    loadUserStart: (state) => {
      state.isLoading = true;
    },

    loadUserSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      state.isAuthenticated = true;
    },

    loadUserFailure: (state) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("token");
    },

    // LOGOUT
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },

    // OTP / SIGNUP
    otpSuccess: (state) => {
      state.isLoading = false;
      state.error = null;
    },

    signupStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    signupSuccess: (state) => {
      state.isLoading = false;
    },

    signupFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    userReset:(state, action)=> {
        state.isLoading = false;
        state.user = null
        state.token  = null
        state.isAuthenticated = false
        
    }
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  otpSuccess,
  loadUserStart,
  loadUserSuccess,
  loadUserFailure,
  logout,
  userReset
} = authSlice.actions;

export default authSlice.reducer;
