import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Actions/user";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
