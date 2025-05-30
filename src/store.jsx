import { configureStore } from "@reduxjs/toolkit";
import customReducer from "./redux/DataSlice";

const store = configureStore({
  reducer: {
    custom: customReducer,
  },
});

export default store;
