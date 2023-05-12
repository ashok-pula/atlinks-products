import React, { useEffect, useState } from "react";
import "./category.css";
import axios from "axios";
import SubCategory from "../subcategory/SubCategory";
import { Search } from "@mui/icons-material";
import logo from "../../assets/konica.jpg";

const Category = ({ setBottomFlag, setSubcategory }) => {
  const [category, setCategory] = useState(null);
  const [categoryResult, setCategoryResult] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [flag, setFlag] = useState(-1);
  const [subcategoryFlag, setSubcategoryFlag] = useState(false);
  useEffect(() => {
    setBottomFlag(false);
    axios
      .get(
        "https://elredtest.s3.amazonaws.com/reactAssignment/getCategories.json"
      )
      .then((response) => {
        setCategory(response.data);
        setCategoryResult(response.data.result);
      })
      .catch((error) => console.log(error));
  }, []);
  const clickHandler = (category, index) => {
    setFlag(index);
    setCategoryId(category.categoryId);
    setSubcategoryFlag(true);
    setSubcategory(category);
  };
  return (
    <div className="categoryContainer">
      <div className="categoryHeadingContainer">
        <h1 className="categoryHeading">Print Heads</h1>
        <div className="inputContainer">
          <Search className="searchIcon" />
          <input
            type="text"
            placeholder="Search..."
            className="categorySearch"
          />
        </div>
        <div className="categoryBox"></div>
      </div>
      <div className="categoryList">
        {categoryResult?.map((category, index) => (
          <div
            key={category.categoryId}
            className="category "
            onClick={() => clickHandler(category, index)}
            style={{
              background: flag === index ? "red" : "white",
            }}
          >
            <img
              className="categoryImage"
              src={category.categoryImageURL || logo}
              alt=""
            />
            <p className="categoryName">{category.categoryName}</p>
          </div>
        ))}
      </div>
      <hr className="horizantalLine" />
      {subcategoryFlag && <SubCategory categoryId={categoryId} />}
    </div>
  );
};

export default Category;
