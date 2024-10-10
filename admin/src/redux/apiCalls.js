import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";
import{
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  deleteUsersFailure,
  deleteUsersStart,
  deleteUsersSuccess,
  updateUsersFailure,
  updateUsersStart,
  updateUsersSuccess,
  addUsersFailure,
  addUsersStart,
  addUsersSuccess

} from "./clientRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    localStorage.setItem("persist:root", JSON.stringify({
      user: JSON.stringify({ currentUser: res.data })
    }));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    await userRequest.delete(`/products/${id}`);  // No res assignment
    dispatch(deleteProductSuccess(id));  // Proceed if delete was successful
  } catch (err) {
    console.error("Delete Product Error:", err.response ? err.response.data : err.message);
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // update product
    const res = await userRequest.put(`/products/${id}`, product);
    dispatch(updateProductSuccess({ id, product: res.data }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};


export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
    console.log("Product added successfully:", res.data);

  } catch (err) {
    dispatch(addProductFailure());
    console.error("Failed to add product:", err);
    throw err;


  }
};

export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await userRequest.get("/users");
    console.log("Get Users Response:", res.data); // Log response data
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    console.error("Get Users Error:", err.response ? err.response.data : err.message); // Log error details
    dispatch(getUsersFailure());
  }
};


export const deleteUsers = async (id, dispatch) => {
  dispatch(deleteUsersStart());
  try {
    await userRequest.delete(`/users/${id}`);  // No res assignment
    dispatch(deleteUsersSuccess(id));  // Proceed if delete was successful
  } catch (err) {
    console.error("Delete User Error:", err.response ? err.response.data : err.message);
    dispatch(deleteUsersFailure());
  }
};


export const updateUsers = async (id, user, dispatch) => {
  dispatch(updateUsersStart());
  try {
    // update
    dispatch(updateUsersSuccess({ id, user }));
  } catch (err) {
    dispatch(updateUsersFailure());
  }
};
export const addUsers = async (user, dispatch) => {
  dispatch(addUsersStart());
  try {
    const res = await userRequest.post(`/users`, user);
    dispatch(addUsersSuccess(res.data));
  } catch (err) {
    dispatch(addUsersFailure());
  }
};