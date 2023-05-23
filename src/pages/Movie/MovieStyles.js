import { styled } from "styled-components";

export const MovieWrapper = styled.div`
   padding: 9.5rem 5rem;
   width: 100%;
   margin-left: 300px;

   @media screen and (max-width: 600px) {
      margin: 0;
      padding: 2rem;
   }
`;

export const FlexWrapper = styled.div`
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

export const ContentWrapper = styled.div`
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

export const RelatedMovies = styled.div`
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   margin-top: 8rem;
`;
