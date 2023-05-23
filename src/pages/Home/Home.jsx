import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiSearch } from "react-icons/fi";
import axios from "axios";

import { fetchMovies } from "../../features/movies";
import {
   ContentWrapper,
   GridWrapper,
   HomeWrapper,
   OverlayContainer,
   SearchWrapper,
} from "./HomeStyles";

const Home = () => {
   const moviesList = useSelector((state) => state.movies);
   const dispatch = useDispatch();

   const data = moviesList.movies;

   const [searchParam, setSearchParam] = useState("");
   const [queryResponse, setQueryResponse] = useState(data);
   const [overlay, setOverlay] = useState(false);
   const [selectedMovieData, setSelectedMovieData] = useState({});

   useEffect(() => {
      if (moviesList.movies) {
         setQueryResponse(moviesList.movies);
      }
   }, [moviesList.movies]);

   const searchMovie = () => {
      dispatch(fetchMovies(searchParam));
      console.log(queryResponse);
   };

   const openModal = async (id) => {
      const selectedMovieData = await axios.get(
         `https://www.omdbapi.com/?i=${id}&apikey=88841216`
      );
      console.log(selectedMovieData.data);
      setSelectedMovieData(selectedMovieData.data);
      setOverlay(true);
   };

   return (
      <HomeWrapper>
         {overlay && (
            <OverlayContainer
               onClick={() => {
                  setOverlay(false);
               }}
            >
               <ContentWrapper>
                  <FiArrowLeft
                     onClick={() => {
                        setOverlay(false);
                     }}
                  />
                  <img
                     src={selectedMovieData.Poster}
                     alt={selectedMovieData.Title}
                  />
                  <h3>{selectedMovieData.Title}</h3>
                  <p>{selectedMovieData.Plot}</p>
                  <Link to={`movie/${selectedMovieData.imdbID}`}>
                     <button>watch</button>
                  </Link>
               </ContentWrapper>
            </OverlayContainer>
         )}
         <SearchWrapper>
            <h2>Explore</h2>
            <div className="searchArea">
               <input
                  type="text"
                  placeholder="Search"
                  value={searchParam}
                  onChange={(e) => setSearchParam(e.target.value)}
               />
               <button onClick={searchMovie} className="searchbutton">
                  search
               </button>
               <button onClick={searchMovie} className="searchbuttonmobile">
                  <FiSearch />
               </button>
            </div>
            <div>
               {moviesList.loading && <p>loading...</p>}
               {queryResponse.length > 0 && (
                  <>
                     <h4>Search Result for : {searchParam}</h4>
                     <GridWrapper>
                        {queryResponse.map((movie, index) => (
                           <div
                              key={index}
                              className="movieCard"
                              onClick={() => openModal(movie.imdbID)}
                           >
                              <img src={movie.Poster} alt={movie.Title} />
                              <button>view</button>
                           </div>
                        ))}
                     </GridWrapper>
                  </>
               )}
            </div>
         </SearchWrapper>
      </HomeWrapper>
   );
};

export default Home;
