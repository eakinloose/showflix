import { createGlobalStyle } from "styled-components";

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
`;

export default GlobalStyles;
