import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    itemsInCart: [],
    totalAmount: 0,
}
const calculateTotalAmount = (itemsInCart) => {
    return itemsInCart.reduce((total, item) => total + item.offerPrice * item.quantity, 0);
}
const CartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        addtocart: (state, action) => {
            // console.log("cart item", action.payload);
            const existingItemIndex = state.itemsInCart.findIndex(item => item.id === action.payload.id);
            if (existingItemIndex !== -1) {
                state.itemsInCart[existingItemIndex].quantity += 1;
            }
            else {
                state.itemsInCart.push({ ...action.payload, quantity: 1 });
                alert("Item: " + action.payload.courseName + " added successfully!");
            }
            state.totalAmount = calculateTotalAmount(state.itemsInCart);
            console.log(Array.from(state.itemsInCart));
            console.log(state.totalAmount);
        },
        increment: (state, action) => {
            const existingItemIndex = state.itemsInCart.findIndex(item => item.id === action.payload.id);
            if (existingItemIndex !== -1) {
                state.itemsInCart[existingItemIndex].quantity += 1;
                state.totalAmount = calculateTotalAmount(state.itemsInCart);
            }
        },
        decrement: (state, action) => {
            const existingItemIndex = state.itemsInCart.findIndex(item => item.id === action.payload.id);
            if (existingItemIndex !== -1) {
                state.itemsInCart[existingItemIndex].quantity -= 1;
                if (state.itemsInCart[existingItemIndex].quantity < 1) {
                    state.itemsInCart.splice(existingItemIndex, 1);
                }
                state.totalAmount = calculateTotalAmount(state.itemsInCart);
            }
        },
        deleteItem: (state, action) => {
            const existingItemIndex = state.itemsInCart.findIndex(item => item.id === action.payload.id);
            if (existingItemIndex !== -1) {
                state.itemsInCart.splice(existingItemIndex, 1);
                state.totalAmount = calculateTotalAmount(state.itemsInCart);
            }
        },
        resetCart: (state) => {
            state.itemsInCart = [];
            state.totalAmount = 0;
        },
    }
})

export const { addtocart, increment, decrement, deleteItem, resetCart } = CartSlice.actions;
export default CartSlice.reducer;