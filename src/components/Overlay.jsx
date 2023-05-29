/* eslint-disable react/prop-types */
import { FiArrowLeft } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { keyframes, styled } from "styled-components";

const MovieOverlay = ({ closeModal }) => {
   const moviesState = useSelector((state) => state.movies);
   const singleMovie = moviesState.movie;
   const navigate = useNavigate();
   let currentUrl = window.location.href;

   const navigateToMovie = () => {
      if (currentUrl.includes(singleMovie.imdbID)) {
         closeModal();
         return;
      } else {
         navigate(`/movie/${singleMovie.imdbID}`);
      }
   };

   return (
      <OverlayContainer onClick={closeModal}>
         <ContentWrapper>
            <FiArrowLeft onClick={closeModal} />
            <img src={singleMovie.Poster} alt={singleMovie.Title} />
            <h3>{singleMovie.Title}</h3>
            <p>{singleMovie.Plot}</p>
            <button onClick={navigateToMovie}>Watch</button>
         </ContentWrapper>
      </OverlayContainer>
   );
};

export default MovieOverlay;

const slideInAnimation = keyframes`
   from {
      transform: translateX(100%);
   }
   to {
      transform: translateX(0);
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
   overflow-y: auto;

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
