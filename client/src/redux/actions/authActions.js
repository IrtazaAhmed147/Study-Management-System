import api from '../../utils/common.js'
import { loginFailure, loginStart, loginSuccess, signupStart, signupSuccess, signupFailure, otpSuccess, loadUserSuccess, loadUserFailure, loadUserStart, userReset } from "../slices/authSlice"


export const registerUser = (credentials) => async (dispatch) => {
 
    
    try {
        dispatch(signupStart())

        const res = await api.post('/auth/signup', credentials, {
            withCredentials: true
        })
       
        localStorage.setItem('tempToken', res.data.data.token)
        if(res.data.success) {
            dispatch(signupSuccess())
        }
        return res.data.message
    } catch (error) {
        dispatch(signupFailure(error.response.data.message))
        throw error.response.data.message
    }
}

export const loginUser = (credentials) => async (dispatch) => {

    try {
        dispatch(loginStart())

        const res = await api.post('/auth/login', credentials, {
            withCredentials: true
        })

        console.log(res?.data);
        if(res?.data?.data?.tempToken) {

            localStorage.setItem("tempToken", res?.data?.data?.tempToken)
            dispatch(otpSuccess())
            return {msg:res.data.message, url:"otp"}
            
        } else {
            
            localStorage.setItem("token", res?.data?.token)
            dispatch(loginSuccess(res?.data.data))
            return {msg:res.data.message, url:"dashboard"}
        }
    } catch (error) {
        console.log(error);
        
        dispatch(loginFailure(error.response?.data?.message))
        throw error.response?.data?.message
    }
}

export const forgotPassAction = (email) => async (dispatch) => {

    try {
        dispatch(loginStart())

        const res = await api.post('/auth/forgotPassword', {email:email}, {

            withCredentials: true
        })

        console.log(res?.data);
      
            
            // localStorage.setItem("token", res?.data?.token)
            dispatch(otpSuccess())
            return res.data.message
        
    } catch (error) {
        console.log(error);
        
        dispatch(loginFailure(error.response.data.message))
        throw error.response.data.message
    }
}

export const resetPassAction = (ceredentials) => async (dispatch) => {

    try {
        dispatch(loginStart())
        const res = await api.post('/auth/resetPassword', ceredentials, {
            withCredentials: true
        })
        console.log(res?.data);
      dispatch(otpSuccess())
            return res.data.message
        
    } catch (error) {
        console.log(error);
        
        dispatch(loginFailure(error.response.data.message))
        throw error.response.data.message
    }
}
export const fetchLoggedInUser = () => async (dispatch) => {
  try {
    dispatch(loginStart());

    const token = localStorage.getItem("token");

    const res = await api.get("/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    

    dispatch(loginSuccess(res.data.data));

  } catch (err) {
    console.log(err);
    
    localStorage.removeItem("token");
    dispatch(userReset());
  }
};
