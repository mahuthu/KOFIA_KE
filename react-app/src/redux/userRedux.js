import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
        isAuthenticated: false, // Add this property
    },

    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.isAuthenticated = true; // Set to true on successful login
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
            state.isAuthenticated = false; // Ensure this is set to false on failure
        },
        logout: (state) => {
            state.currentUser = null;
            state.isAuthenticated = false; // Set to false on logout
            localStorage.removeItem("persist:root");
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;
