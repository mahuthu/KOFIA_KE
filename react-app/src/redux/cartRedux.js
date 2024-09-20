// cartRedux.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    clearCart: (state, action) => {
      const index = state.products.findIndex(product => product._id === action.payload);
      if (index !== -1) {
        const product = state.products[index];
        state.quantity -= 1;
        state.total -= product.price * product.quantity;
        state.products.splice(index, 1);
      }
    },
    updateProductQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.products.find(product => product._id === id);
      if (product) {
        const quantityDiff = quantity - product.quantity;
        state.total += product.price * quantityDiff;
        product.quantity = quantity;
      }
    },
    updateProductColor: (state, action) => {
      const { id, color } = action.payload;
      const product = state.products.find(product => product._id === id);
      if (product) {
        product.color = color;
      }
    },
    updateProductSize: (state, action) => {
      const { id, size } = action.payload;
      const product = state.products.find(product => product._id === id);
      if (product) {
        product.size = size;
      }
    },
  },
});

export const { 
  addProduct, 
  clearCart, 
  updateProductQuantity, 
  updateProductColor, 
  updateProductSize 
} = cartSlice.actions;
export default cartSlice.reducer;
