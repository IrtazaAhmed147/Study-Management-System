import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    isLoading: false,
    error: false,

}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true
            state.error = null

        },
        loginSuccess: (state, { payload }) => {
            state.isLoading = false
            state.error = null
            state.user = payload
            localStorage.setItem("user", JSON.stringify(payload))
        },
        loginFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
          otpSuccess: (state) => {
            state.isLoading = false
            state.error = null
        },
        signupStart: (state) => {
            state.isLoading = true
            state.error = null

        },
        signupSuccess: (state) => {
            state.isLoading = false
            state.error = null
        },
        signupFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        userReset: (state)=> {
            state.user = null
            state.token = null
        }
    }
})

export const { loginStart, loginSuccess, loginFailure, signupStart, signupSuccess, signupFailure,userReset,otpSuccess } = authSlice.actions
export default authSlice.reducer