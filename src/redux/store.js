import { configureStore } from "@reduxjs/toolkit";
import carReducer from "./likedCar/carSlice";
import filterReducer from "./filterCars/filterSlice";

const store = configureStore({
  reducer: {
    cars: carReducer,
    filter: filterReducer,
  },
});

export default store;
