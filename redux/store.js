import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import utilsReducer from "./slices/utilsSlice";

export default configureStore({
    reducer: {
      cart: cartReducer,
      utils: utilsReducer,
    },
    devTools: !process.env.NODE_ENV || process.env.NODE_ENV === "development",
  });
  