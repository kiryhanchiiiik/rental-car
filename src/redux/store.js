import { configureStore } from "@reduxjs/toolkit";
import carReducer from "./likedCar/carSlice";

const store = configureStore({
  reducer: {
    cars: carReducer,
  },
});

export default store;
