import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: null,
        isAuthenticated: false,
    },

    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.error = null;
            state.isAuthenticated = true;
        },
        loginFailure: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
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
            state.error = null;
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
