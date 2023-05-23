import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiHeart, FiSearch } from "react-icons/fi";

import { Icon, NavRoutes, SidemenuWrapper } from "./SidebarStyles";

const Sidebar = () => {
   const [activeIndex, setActiveIndex] = useState(0);
   const navigate = useNavigate();

   const handleClick = (index, route) => {
      setActiveIndex(index);
      navigate(route);
   };

   return (
      <SidemenuWrapper>
         <h1 onClick={() => handleClick(0, "/")}>
            Show<span className="primary">Flix</span>
         </h1>
         <div>
            <NavRoutes>
               <Icon active={String(activeIndex !== 0)}>
                  <FiSearch />
               </Icon>
               <h3 onClick={() => handleClick(0, "/")}>Search</h3>
            </NavRoutes>
            <NavRoutes>
               <Icon active={(activeIndex !== 1).toString()}>
                  <FiHeart />
               </Icon>
               <h3 onClick={() => handleClick(1, "wishlist")}>Wishlist</h3>
            </NavRoutes>
         </div>
      </SidemenuWrapper>
   );
};

export default Sidebar;
