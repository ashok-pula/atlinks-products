import React, { useEffect, useState } from "react";
import "./product.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/konica.jpg";
import { ArrowBack, FavoriteBorder, Search } from "@mui/icons-material";
import SingleProduct from "../singleproduct/SingleProduct";

const Product = ({ setBottomFlag, subcategoryId }) => {
  const [product, setProduct] = useState(null);
  const [productResult, setProductResult] = useState([]);
  const [productId, setProductId] = useState(null);
  const [singleProductFlag, setsingleProductFlag] = useState(false);
  const useparams = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setBottomFlag(true);

    axios
      .get(
        `https://elredtest.s3.amazonaws.com/reactAssignment/getProduct_${useparams.id}.json`
      )
      .then((response) => {
        setProduct(response.data);
        setProductResult(response.data.result);
      })
      .catch((error) => console.log(error));
  }, [useparams.id]);
  useEffect(() => {
    {
      subcategoryId &&
        axios
          .get(
            `https://elredtest.s3.amazonaws.com/reactAssignment/getProduct_${subcategoryId}.json`
          )
          .then((response) => {
            setProduct(response.data);
            setProductResult(response.data.result);
          })
          .catch((error) => console.log(error));
    }
  }, [useparams.id]);

  return (
    <div className="productContainer">
      <div className="productHeadingContainer">
        <div className="productHeading" onClick={() => navigate("/category")}>
          <ArrowBack /> All Products
        </div>
        <div className="inputContainer">
          <Search className="searchIcon" />
          <input
            type="text"
            placeholder="Search..."
            className="productSearch"
          />
        </div>
        <div className="productBox"></div>
      </div>
      {productResult.length <= 0 ? (
        <div className="noproduct">No product found</div>
      ) : (
        <div className="productList">
          {productResult.map((product) => (
            <div
              key={product.productId}
              className="product"
              onClick={() => {
                setProductId(product);
                setsingleProductFlag(true);
              }}
            >
              <img src={logo} alt="" className="productImage" />
              <div className="productDescription">
                <span className="description">{product.itemDescription}</span>
                <span className="lorem">Lorem ipsum dolor</span>
              </div>
              <FavoriteBorder className="favorite" />
            </div>
          ))}
        </div>
      )}
      {singleProductFlag && (
        <SingleProduct
          product={productId}
          setsingleProductFlag={setsingleProductFlag}
        />
      )}
    </div>
  );
};

export default Product;
