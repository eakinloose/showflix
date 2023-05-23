import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../features/movies";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const Home = () => {
   const moviesList = useSelector((state) => state.movies);
   const dispatch = useDispatch();

   const [searchParam, setSearchParam] = useState("");
   const data = moviesList.movies;

   const [queryResponse, setQueryResponse] = useState(data);

   useEffect(() => {
      if (moviesList.movies) {
         setQueryResponse(moviesList.movies);
      }
   }, [moviesList.movies]);

   const searchMovie = () => {
      dispatch(fetchMovies(searchParam));
   };

   return (
      <HomeWrapper>
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

            <h4>Search Result for: {searchParam}</h4>
            <GridWrapper>
               {queryResponse.map((movie, index) => (
                  <Link to={`movie/${movie.imdbID}`} key={index}>
                     <div className="movieCard">
                        <img src={movie.Poster} alt={movie.Title} />
                        <button>view</button>
                     </div>
                  </Link>
               ))}
            </GridWrapper>
         </div>
      </HomeWrapper>
   );
};

export default Home;

const HomeWrapper = styled.div`
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

      @media screen and (max-width: 600px) {
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

const GridWrapper = styled.div`
   width: 100%;
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   gap: 4rem;

   .movieCard {
      position: relative;
      height: 330px;
      width: 230px;

      img {
         width: 230px;
         height: 100%;
         object-fit: cover;
         border-radius: 15px;
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
