import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: JSON.parse(localStorage.getItem("user")) || null,
        isFetching: false,
        error: false,
        isAuthenticated: !!localStorage.getItem("user"),
    },

    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
            state.isAuthenticated = false;
        },
        logout: (state) => {
            state.currentUser = null;
            state.isAuthenticated = false;
            // localStorage.removeItem("persist:root");
        },
        updateUserStart: (state) => {
            state.isFetching = true;
        },
        updateUserSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        updateUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const { 
    loginStart, 
    loginSuccess, 
    loginFailure, 
    logout,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure 
} = userSlice.actions;
export default userSlice.reducer;