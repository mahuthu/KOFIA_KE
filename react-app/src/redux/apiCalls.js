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
        dispatch(loginFailure());
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