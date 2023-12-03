import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";

const reduxstore = configureStore({
    reducer: {
        cart: CartSlice
    }
})

export default reduxstore;