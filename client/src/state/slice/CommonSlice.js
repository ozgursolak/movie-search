import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
  name: "movie",
  initialState: {
    isLoading: false,
    isError: false,
  },
  reducers: {
    updateLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateLoading } = commonSlice.actions;

export default commonSlice.reducer;
