import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likedCars: JSON.parse(localStorage.getItem("likedCars")) || [],
  carList: [],
  loading: false,
  error: null,
  totalPages: 1,
};

const carSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setCarList: (state, action) => {
      state.carList = action.payload.cars;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    resetCarList: (state) => {
      state.carList = [];
      state.totalPages = 1;
    },
    toggleLike: (state, action) => {
      const carId = action.payload;
      const index = state.likedCars.indexOf(carId);

      if (index !== -1) {
        state.likedCars = state.likedCars.filter((id) => id !== carId);
      } else {
        state.likedCars = [...state.likedCars, carId];
      }

      localStorage.setItem("likedCars", JSON.stringify(state.likedCars));
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCarList,
  setTotalPages,
  resetCarList,
  toggleLike,
  setLoading,
  setError,
} = carSlice.actions;
export default carSlice.reducer;
