import { createGlobalStyle, styled } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *,*::after,*::before{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html{
    font-family: 'poppins', sans-serif;
    overflow-x: hidden;
    font-size: 63.5%;
  }
  
  body{
    letter-spacing: 0.02rem;
    font-size: 1.4rem;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
  }

   h1,
   h2,
   h3,
   p,
   a,
   li,
   span{
     line-height: 1.6;
     text-decoration: none;
     list-style: none;
     color: ${({ theme }) => theme.colors?.black};
    }

    a{
      cursor: pointer;
    }

   button{
    border: none;
    border-radius: 5px;
    padding: 1.1rem 4rem;
    color: ${({ theme }) => theme.colors?.primary};
    border-radius: 50px;
    cursor: pointer;
    font-size: 1.4rem;
  }

  #no_movie{
   margin-top: 4rem;
   font-size: 1.6rem;
  }
`;

export const GridWrapper = styled.div`
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

export default GlobalStyles;
