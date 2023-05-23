import { Route, Routes } from "react-router-dom";

import AppLayout from "./containers/layout/Layout";
import Home from "./pages/Home";
import WishList from "./pages/Wishlist";
import Movie from "./pages/Movie";

const App = () => {
   return (
      <AppLayout>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/movie/:id" element={<Movie />} />
         </Routes>
      </AppLayout>
   );
};

export default App;
