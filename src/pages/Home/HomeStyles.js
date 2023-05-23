import { styled, keyframes } from "styled-components";

export const HomeWrapper = styled.div`
   width: 100%;
`;

export const SearchWrapper = styled.div`
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

export const slideInAnimation = keyframes`
   from {
      transform: translateX(100%);
   }
   to {
      transform: translateX(0);
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

export const OverlayContainer = styled.div`
   width: 100%;
   height: 100vh;
   background: rgba(0, 0, 0, 0.9);
   position: fixed;
   z-index: 1;
   top: 0;
`;

export const ContentWrapper = styled.div`
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
