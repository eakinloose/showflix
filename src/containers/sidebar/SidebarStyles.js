import { styled } from "styled-components";

export const SidemenuWrapper = styled.div`
   width: 300px;
   background: ${({ theme }) => theme.colors?.white};
   height: 100vh;
   box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
   position: fixed;
   z-index: 1;

   h1 {
      display: inline-block;
      margin: 3rem 5rem;

      .primary {
         color: ${({ theme }) => theme.colors?.primary};
      }
   }

   @media screen and (max-width: 600px) {
      width: 100%;
      text-align: center;
      position: relative;
      height: auto;
      box-shadow: none;

      h1 {
         margin: 3rem 0 1rem;
      }
   }
`;

export const NavRoutes = styled.div`
   display: flex;
   align-items: center;
   margin-bottom: 3rem;

   h3 {
      font-size: inherit;
      cursor: pointer;
   }

   @media screen and (max-width: 600px) {
      display: none;
   }
`;

export const Icon = styled.div`
   background: ${(props) => (props.active === "true" ? "#ffffff" : "#5f2eea")};
   color: ${(props) => (props.active === "true" ? "#5f2eea" : "#ffffff")};
   padding: ${(props) =>
      props.active === "true" ? "undefined" : "0.5rem 0.7rem"};
   margin: 0 1.2rem 0 5rem;
   display: flex;
   align-items: center;
   flex-direction: column;
   justify-content: center;
   font-size: ${(props) => (props.active === "true" ? "1.7rem" : "undefined")};
   border-radius: 5px;
`;
