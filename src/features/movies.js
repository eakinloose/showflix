import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
   loading: false,
   movies: [],
   error: "",
};

export const fetchMovies = createAsyncThunk(
   "movies/fetchMovies",
   async (searchparam) => {
      try {
         const response = await axios.get(
            `https://www.omdbapi.com/?s=${searchparam}&apikey=88841216`
         );
         console.log(response.data);
         return response.data.Search;
      } catch (err) {
         return err.Error;
      }
   }
);

const moviesSlice = createSlice({
   name: "movies",
   initialState: initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchMovies.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(fetchMovies.fulfilled, (state, action) => {
         state.loading = false;
         state.movies = action.payload;
         state.error = "";
      });
      builder.addCase(fetchMovies.rejected, (state, action) => {
         state.loading = false;
         state.movies = [];
         state.error = action.payload;
      });
   },
});

export default moviesSlice.reducer;
