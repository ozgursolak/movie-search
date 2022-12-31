import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movieList: [],
  },
  reducers: {
    updateMovieList: (state, action) => {
      state.movieList = action.payload;
    },
    clearMovieList: (state) => {
      state.movieList = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { clearMovieList, updateMovieList } = movieSlice.actions;

export default movieSlice.reducer;
