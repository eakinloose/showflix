import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../features/movies";

const store = configureStore({
   reducer: {
      movies: moviesReducer,
   },
});

export default store;
