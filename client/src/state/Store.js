import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./slice/MovieSlice";
import commonReducer from "./slice/CommonSlice";

export default configureStore({
  reducer: {
    movie: movieReducer,
    common: commonReducer,
  },
});
