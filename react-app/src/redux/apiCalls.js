import { loginFailure, loginStart, loginSuccess } from "./userRedux"
import {publicRequest} from "../requestmethods"




export const login = async(dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        console.log("API response:", res.data); // Debugging log

        dispatch(loginSuccess(res.data));
    } catch (err) {
        console.error("API error:", err); // Debugging log

        dispatch(loginFailure());
    }   

    
}