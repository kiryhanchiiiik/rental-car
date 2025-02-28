import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brands: [],
  selectedBrands: null,
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
  },
});

export const { setBrands, setSelectedBrands } = filterSlice.actions;

export default filterSlice.reducer;
