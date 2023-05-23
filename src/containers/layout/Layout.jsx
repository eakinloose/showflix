import { ThemeProvider, styled } from "styled-components";
import GlobalStyles from "../../globalstyles";
import Sidebar from "../sidebar/Sidebar";

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
   @media screen and (max-width: 600px) {
      display: block;
      height: auto;
   }
`;

const MainContent = styled.div`
   width: 100%;
   height: 100%;
`;
