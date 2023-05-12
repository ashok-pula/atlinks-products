import { Dashboard, Favorite, Folder, NewReleases } from "@mui/icons-material";
import React, { useState } from "react";
import "./sidebar.css";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const clickHandler = () => {
    setIsClicked(true);
    navigate("/category");
  };
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarImgContainer">
          <img
            src="https://cdn.shopify.com/shopifycloud/hatchful_web_two/bundles/aff2c7c41798a9e8d510293d676b1308.png"
            alt=""
            className="sidebarImg"
          />
          <span className="sidebarText">A.T. lnks</span>
        </div>
        <div className="sidebarLinks">
          <div className="sidebarLink">
            <Dashboard className="sidebar-icon" />
            Dashboard
          </div>
          <div
            className={isClicked ? "sidebarLink activeLink" : "sidebarLink"}
            onClick={clickHandler}
          >
            <Folder className="sidebar-icon" />
            All Products
          </div>
          <div className="sidebarLink">
            <Dashboard className="sidebar-icon" />
            Orders
          </div>

          <div className="sidebarLink">
            <Favorite className="sidebar-icon" />
            Favorites
          </div>
          <div className="sidebarLink">
            <NewReleases className="sidebar-icon" />
            New Arrival
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
