import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiSearch } from "react-icons/fi";
import axios from "axios";
import { styled, keyframes } from "styled-components";

import { fetchMovies } from "../features/movies";

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

const slideInAnimation = keyframes`
   from {
      transform: translateX(100%);
   }
   to {
      transform: translateX(0);
   }
`;

const GridWrapper = styled.div`
   width: 100%;
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   gap: 4rem;

   .movieCard {
      position: relative;
      height: 330px;
      width: 230px;
      cursor: pointer;

      img {
         width: 230px;
         height: 100%;
         object-fit: cover;
         border-radius: 10px;
      }

      button {
         position: absolute;
         left: 50%;
         bottom: 10%;
         transform: translateX(-50%);
      }
   }

   @media screen and (max-width: 600px) {
      grid-template-columns: repeat(1, 1fr);

      .movieCard {
         height: 429px;
         width: 100%;

         img {
            width: 100%;
         }
      }
   }
`;

const OverlayContainer = styled.div`
   width: 100%;
   height: 100vh;
   background: rgba(0, 0, 0, 0.6);
   position: fixed;
   z-index: 1;
   top: 0;
`;

const ContentWrapper = styled.div`
   animation: ${slideInAnimation} 0.3s ease-in-out forwards;
   width: 300px;
   height: 100%;
   padding: 3rem 2rem;
   position: fixed;
   background: white;
   top: 0;
   z-index: 299;
   right: 0;

   img {
      width: 100%;
      margin: 3rem 0;
      border-radius: 10px;
      height: 335px;
      object-fit: cover;
   }

   h3 {
      margin-bottom: 2rem;
   }

   p {
      font-size: 1.5rem;
      line-height: 1.9;
   }

   button {
      width: 100%;
      background: ${({ theme }) => theme.colors?.primary};
      color: ${({ theme }) => theme.colors?.white};
      font-size: 1.5rem;
      margin-top: 4rem;
   }
`;
