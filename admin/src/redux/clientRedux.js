import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getUsersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
      console.log("Updated Redux State Users:", state.users); // Log updated state
      // Corrected from state.products to state.users
    },
    getUsersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteUsersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.users.splice( // Corrected from state.products to state.users
        state.users.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteUsersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateUsersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.users[ // Corrected from state.products to state.users
        state.users.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.user;  // Corrected from action.payload.product to action.payload.user
    },
    updateUsersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addUsersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.users.push(action.payload);  // Corrected from state.products to state.users
    },
    addUsersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  deleteUsersStart,
  deleteUsersSuccess,
  deleteUsersFailure,
  updateUsersStart,
  updateUsersSuccess,
  updateUsersFailure,
  addUsersStart,
  addUsersSuccess,
  addUsersFailure,
} = usersSlice.actions;

export default usersSlice.reducer;
