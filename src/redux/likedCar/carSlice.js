import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likedCars: JSON.parse(localStorage.getItem("likedCars")) || [],
};

const carSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    toggleLike: (state, action) => {
      const carId = action.payload;
      const index = state.likedCars.indexOf(carId);

      if (index !== -1) {
        state.likedCars.splice(index, 1);
      } else {
        state.likedCars.push(carId);
      }

      localStorage.setItem("likedCars", JSON.stringify(state.likedCars));
    },
  },
});

export const { toggleLike } = carSlice.actions;
export default carSlice.reducer;
