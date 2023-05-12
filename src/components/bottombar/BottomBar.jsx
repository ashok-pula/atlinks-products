import React, { useState } from "react";
import "./bottomBar.css";
import { Home } from "@mui/icons-material";
import logo from "../../assets/konica.jpg";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BottomBar = ({ subcategoryId, clickHandler }) => {
  const [subcategory, setSubcategory] = useState(null);
  const [subcategoryResults, setSubcategoryResults] = useState([]);
  useEffect(() => {
    subcategoryId &&
      axios
        .get(
          `https://elredtest.s3.amazonaws.com/reactAssignment/getSubCategory_${subcategoryId}.json`
        )
        .then((response) => {
          setSubcategory(response.data);
          setSubcategoryResults(response.data.result);
        })
        .catch((error) => console.log(error));
  }, [subcategoryId]);
  const navigate = useNavigate();
  return (
    <div className="bottomBarContainer">
      <div className="bottomHome" onClick={() => navigate("/")}>
        <Home />
      </div>
      {subcategoryResults?.length <= 0 ? (
        "No sub category found"
      ) : (
        <div className="bottomsubcategoryList">
          {subcategoryResults?.map((subcategory1) => (
            <div
              key={subcategory1.subCategoryId}
              className="bottomsubcategory"
              onClick={() => clickHandler(subcategory1.subCategoryId)}
            >
              <img
                className="bottomsubcategoryImage"
                src={logo || subcategory1.subCategoryImageURL}
                alt=""
              />
              <p className="bottomsubcategoryName">
                {subcategory1.subCategoryName}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BottomBar;
