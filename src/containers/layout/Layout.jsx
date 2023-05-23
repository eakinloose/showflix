import { ThemeProvider, styled } from "styled-components";
import GlobalStyles from "../../globalstyles";
import Sidebar from "../sidebar/sideBar";

// eslint-disable-next-line react/prop-types
const AppLayout = ({ children }) => {
   const theme = {
      colors: {
         primary: "#5f2eea",
         secondary: "#a0a3bd",
         accent: "#d9dbe9",
         white: "#ffffff",
         black: "#14142b",
         transparent: "transparent",
      },
   };
   return (
      <ThemeProvider theme={theme}>
         <GlobalStyles />
         <ContentWrapper>
            <Sidebar />
            <MainContent>{children}</MainContent>
         </ContentWrapper>
      </ThemeProvider>
   );
};

export default AppLayout;

const ContentWrapper = styled.div`
   display: flex;
   height: 100vh;

   @media screen and (max-width: 600px) {
      display: block;
      height: auto;
   }
`;

const MainContent = styled.div`
   width: 100%;
   height: 100%;
   padding: 9.5rem 7rem;
   overflow-y: auto;

   @media screen and (max-width: 600px) {
      padding: 2rem;
   }
`;
