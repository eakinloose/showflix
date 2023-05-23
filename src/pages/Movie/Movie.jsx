import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FiClock, FiHeart, FiPlay, FiStar } from "react-icons/fi";
import {
   ContentWrapper,
   FlexWrapper,
   MovieWrapper,
   RelatedMovies,
} from "./MovieStyles";

const Movie = () => {
   const { id } = useParams();

   const [movieData, setMovieData] = useState({});

   useEffect(() => {
      const cancelToken = axios.CancelToken.source();

      const getData = () => {
         axios
            .get(`https://www.omdbapi.com/?i=${id}&apikey=88841216`, {
               cancelToken: cancelToken.token,
            })
            .then((response) => {
               setMovieData(response.data);
               console.log(response.data);
            })
            .catch((error) => {
               if (axios.isCancel(error)) {
                  return;
               } else {
                  console.log(error.message);
               }
            });
      };

      getData();

      return () => {
         cancelToken.cancel();
      };
   }, [id]);

   const { Title, Plot, Released, imdbRating, Runtime } = movieData;

   return (
      <MovieWrapper>
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
         </RelatedMovies>
      </MovieWrapper>
   );
};

export default Movie;
