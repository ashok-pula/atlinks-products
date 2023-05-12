import React, { useEffect, useState } from "react";
import "./subcategory.css";
import axios from "axios";
import logo from "../../assets/konica.jpg";

import { useNavigate } from "react-router-dom";
const SubCategory = ({ categoryId }) => {
  const [subcategory, setSubcategory] = useState(null);
  const [subcategoryResults, setSubcategoryResults] = useState([]);

  useEffect(() => {
    categoryId &&
      axios
        .get(
          `https://elredtest.s3.amazonaws.com/reactAssignment/getSubCategory_${categoryId}.json`
        )
        .then((response) => {
          setSubcategory(response.data);
          setSubcategoryResults(response.data.result);
        })
        .catch((error) => console.log(error));
  }, [categoryId]);
  const navigate = useNavigate();

  const clickHandler = (id) => {
    navigate(`/product/${id}`, { state: subcategoryResults });
  };
  return (
    <div className="subcategoryContainer">
      {subcategoryResults?.length <= 0 ? (
        <div className="nosubcategory">No sub category found</div>
      ) : (
        <div className="subcategoryList">
          {subcategoryResults?.map((subcategory) => (
            <div
              key={subcategory.subCategoryId}
              className="subcategory"
              onClick={() => clickHandler(subcategory.subCategoryId)}
            >
              <img
                className="subcategoryImage"
                src={logo || subcategory.subCategoryImageURL}
                alt=""
              />
              <p className="subcategoryName">{subcategory.subCategoryName}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubCategory;
