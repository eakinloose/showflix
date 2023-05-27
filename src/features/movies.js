import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
   loading: false,
   loadingSingleMovie: false,
   movies: [],
   error: "",
   movie: {},
};

export const fetchMovies = createAsyncThunk(
   "movies/fetchMovies",
   async (searchparam) => {
      try {
         const response = await axios.get(
            `https://www.omdbapi.com/?s=${searchparam}&apikey=88841216`
         );
         console.log(response.data.Search);
         return response.data.Search;
      } catch (err) {
         return err.Error;
      }
   }
);

export const fetchMovieById = createAsyncThunk(
   "movie/fetchById",
   async (id) => {
      try {
         const response = await axios.get(
            `https://www.omdbapi.com/?i=${id}&apikey=88841216`
         );
         console.log(response.data);
         return response.data;
      } catch (err) {
         return err.Error;
      }
   }
);

const moviesSlice = createSlice({
   name: "movies",
   initialState: initialState,
   reducers: {
      clearMovie: (state) => {
         state.movie = {};
         state.error = "";
      },
   },
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
      builder.addCase(fetchMovieById.pending, (state) => {
         state.loadingSingleMovie = true;
      });
      builder.addCase(fetchMovieById.fulfilled, (state, action) => {
         state.loadingSingleMovie = false;
         state.movie = action.payload;
         state.error = "";
      });
      builder.addCase(fetchMovieById.rejected, (state, action) => {
         state.loadingSingleMovie = false;
         state.movie = {};
         state.error = action.payload;
      });
   },
});

export const { clearMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
