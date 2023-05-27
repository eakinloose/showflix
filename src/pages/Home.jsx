import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";
import { styled } from "styled-components";
import { clearMovie, fetchMovieById, fetchMovies } from "../features/movies";
import Overlay from "../components/overlay";
import { GridWrapper } from "../globalstyles";

const Home = () => {
   const moviesState = useSelector((state) => state.movies);
   const dispatch = useDispatch();

   const [searchParam, setSearchParam] = useState("");
   const [overlay, setOverlay] = useState(false);

   const moviesList = moviesState.movies;

   const searchMovie = () => {
      dispatch(fetchMovies(searchParam));
   };

   const openModal = (id) => {
      dispatch(fetchMovieById(id));
      setOverlay(true);
   };

   const closeModal = () => {
      setOverlay(false);
      dispatch(clearMovie());
   };

   return (
      <HomeWrapper>
         {overlay && <Overlay closeModal={closeModal} />}
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
               {moviesState.loading && <p>loading...</p>}
               {moviesList.length > 0 && (
                  <>
                     <h4>Search Result for : {searchParam}</h4>
                     <GridWrapper>
                        {moviesList.map((movie, index) => (
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

//style
const HomeWrapper = styled.div`
   width: 100%;
`;

const SearchWrapper = styled.div`
   padding: 9.5rem 5rem;
   margin-left: 300px;

   h4 {
      margin-bottom: 2rem;
   }

   .searchArea {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 1rem 0 2rem;

      input {
         width: 80%;
         padding: 1.3rem 3rem;
         border: none;
         background-color: #eee;
         border-radius: 8px;
         outline: none;
      }

      button {
         background: ${({ theme }) => theme.colors?.primary};
         color: ${({ theme }) => theme.colors?.white};
         border-radius: 50px;
      }

      .searchbuttonmobile {
         display: none;
         padding: 1.3rem;
         border-radius: 10px;
      }
   }

   @media screen and (max-width: 600px) {
      padding: 2rem;
      margin-left: 0;
      .searchArea {
         input {
            width: 83%;
         }

         .searchbutton {
            display: none;
         }

         .searchbuttonmobile {
            display: block;
         }
      }
   }
`;
