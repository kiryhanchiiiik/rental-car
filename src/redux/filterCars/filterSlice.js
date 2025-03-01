import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brands: [],
  prices: [],
  mileage: { from: "", to: "" },
  selectedBrands: null,
  selectedPrices: null,
  error: null,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setBrands: (state, action) => {
      state.brands = action.payload;
    },
    setPrices: (state, action) => {
      state.prices = action.payload;
    },
    setMileage: (state, action) => {
      state.mileage = action.payload;
    },
    setSelectedBrands: (state, action) => {
      state.selectedBrands = action.payload;
    },
    setSelectedPrices: (state, action) => {
      state.selectedPrices = action.payload;
    },
    resetFilters: (state) => {
      state.selectedBrands = null;
      state.selectedPrices = null;
      state.mileage = { from: null, to: null };
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setBrands,
  setPrices,
  setMileage,
  setSelectedBrands,
  setSelectedPrices,
  resetFilters,
  setError,
} = filterSlice.actions;

export default filterSlice.reducer;
