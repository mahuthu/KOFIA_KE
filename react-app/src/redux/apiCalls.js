import { loginFailure, loginStart, loginSuccess, updateUserStart, updateUserSuccess, updateUserFailure } from "./userRedux"
import { publicRequest, userRequest } from "../requestmethods"

export const login = async(dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        console.log("API response:", res.data);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        console.error("API error:", err);
        let errorMessage = "An unexpected error occurred";
        if (err.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            errorMessage = err.response.data.message || err.response.data;
        } else if (err.request) {
            // The request was made but no response was received
            errorMessage = "No response received from server";
        } else {
            // Something happened in setting up the request that triggered an Error
            errorMessage = err.message;
        }
        dispatch(loginFailure(errorMessage));
    }   
}

export const register = async(dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/register", user);
        console.log("API response:", res.data);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        console.error("API error:", err);
        dispatch(loginFailure());
    }   
}

export const updateUser = async (dispatch, userId, updatedUser) => {
    dispatch(updateUserStart());
    try {
        const res = await userRequest.put(`/users/${userId}`, updatedUser);
        console.log("Update API response:", res.data);
        dispatch(updateUserSuccess(res.data));
    } catch (err) {
        console.error("Update API error:", err);
        dispatch(updateUserFailure());
    }
};
