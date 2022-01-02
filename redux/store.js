import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";

export default configureStore({
    reducer: {
      cart: cartReducer,
    },
    devTools: !process.env.NODE_ENV || process.env.NODE_ENV === "development",
  });
  