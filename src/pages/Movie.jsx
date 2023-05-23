import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { styled } from "styled-components";
import { FiClock, FiHeart, FiPlay, FiStar } from "react-icons/fi";

const Movie = () => {
   const { id } = useParams();

   const [movieData, setMovieData] = useState({});

   useEffect(() => {
      const cancelToken = axios.CancelToken.source();

      const getData = () => {
         axios
            .get(`http://www.omdbapi.com/?i=${id}&apikey=88841216`, {
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
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   margin-top: 8rem;
`;
