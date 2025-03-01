import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brands: [],
  selectedBrands: null,
  prices: [],
  selectedPrices: null,
  mileage: { from: "", to: "" },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setBrands: (state, action) => {
      state.brands = action.payload;
    },
    setSelectedBrands: (state, action) => {
      state.selectedBrands = action.payload;
    },
    setPrices: (state, action) => {
      state.prices = action.payload;
    },
    setSelectedPrices: (state, action) => {
      state.selectedPrices = action.payload;
    },
    setMileage: (state, action) => {
      state.mileage = action.payload;
    },
  },
});

export const {
  setBrands,
  setPrices,
  setMileage,
  setSelectedBrands,
  setSelectedPrices,
} = filterSlice.actions;

export default filterSlice.reducer;
