import { Route, Routes } from "react-router-dom";

import AppLayout from "./containers/layout/Layout";
import Home from "./pages/Home/Home";
import WishList from "./pages/Wishlist/Wishlist";
import Movie from "./pages/Movie/Movie";

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
