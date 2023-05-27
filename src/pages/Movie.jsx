import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiClock, FiHeart, FiPlay, FiStar } from "react-icons/fi";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { clearMovie, fetchMovieById } from "../features/movies";

import { GridWrapper } from "../globalstyles";
import MovieOverlay from "../components/Overlay";

const Movie = () => {
   const moviesState = useSelector((state) => state.movies);
   const dispatch = useDispatch();
   const { id } = useParams();

   const singleMovie = moviesState.movie;
   const moviesList = moviesState.movies;
   const relatedMovies = moviesList.filter(
      (movie) =>
         movie.Year === singleMovie.Year && movie.Title !== singleMovie.Title
   );

   const [movieData, setMovieData] = useState(singleMovie);
   const [overlay, setOverlay] = useState(false);

   useEffect(() => {
      if (Object.keys(movieData).length === 0) {
         dispatch(fetchMovieById(id)).then((data) => {
            setMovieData(data.payload);
         });
      }
   }, [dispatch, id, movieData]);

   const openModal = (id) => {
      dispatch(fetchMovieById(id));
      setOverlay(true);
   };

   const closeModal = () => {
      setOverlay(false);
      dispatch(clearMovie());
   };

   const { Title, Plot, Released, imdbRating, Runtime } = movieData;

   return (
      <MovieWrapper>
         {overlay && <MovieOverlay closeModal={closeModal} />}
         <FlexWrapper>
            <img src={movieData.Poster} alt={movieData.Title} />
            <ContentWrapper>
               <h1>{Title}</h1>
               <p>{Plot}</p>
               <div className="flex">
                  <div>
                     <FiClock />
                     <span>{Released}</span>
                  </div>
                  <div>
                     <FiStar />
                     <span>{imdbRating}</span>
                  </div>
                  <div>
                     <FiPlay />
                     <span>{Runtime}</span>
                  </div>
               </div>
               <div>
                  <button className="secondary">Watch Now</button>
                  <button className="primary">
                     <FiHeart />
                  </button>
               </div>
            </ContentWrapper>
         </FlexWrapper>
         <RelatedMovies>
            <h3>Similar Movies</h3>
            {relatedMovies.length ? (
               <GridWrapper>
                  {relatedMovies.map((movie, index) => (
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
            ) : (
               <h5 id="no_movie">No movie relates to this movie by year</h5>
            )}
         </RelatedMovies>
      </MovieWrapper>
   );
};

export default Movie;

//style

const MovieWrapper = styled.div`
   padding: 9.5rem 5rem;
   width: 100%;
   margin-left: 300px;

   @media screen and (max-width: 600px) {
      margin: 0;
      padding: 2rem;
   }
`;

const FlexWrapper = styled.div`
   display: flex;

   img {
      height: 399px;
      width: 300px;
      margin-right: 4rem;
      object-fit: cover;
      border-radius: 10px;
   }

   @media screen and (max-width: 600px) {
      flex-direction: column;
      img {
         margin: 2rem 0;
         width: 100%;
      }
   }
`;

const ContentWrapper = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   align-items: start;
   width: 100%;
   max-width: 650px;

   p {
      font-size: 1.6rem;
      letter-spacing: 1.3;
   }

   .flex {
      display: flex;
      flex-wrap: wrap;

      div {
         display: flex;
         align-items: center;
         margin-right: 3rem;

         span {
            margin-left: 0.6rem;
            line-height: 2.5;
         }
      }
   }

   .secondary {
      background: ${({ theme }) => theme.colors?.primary};
      color: ${({ theme }) => theme.colors?.white};
      margin-right: 2rem;
      padding: 1.4rem 5rem;
   }

   .primary {
      padding: 1.4rem;
      border-radius: 15px;
      color: ${({ theme }) => theme.colors?.primary};
   }

   @media screen and (max-width: 600px) {
      margin-top: 3rem;
      min-height: 370px;
   }
`;

const RelatedMovies = styled.div`
   margin: 8rem 0 4rem;
`;
