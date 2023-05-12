import React, { useState } from "react";
import "./singleProduct.css";
import ReactDOM from "react-dom";
import OrderList from "../orderlist/OrderList";
import { Close, FavoriteBorder } from "@mui/icons-material";
import logo from "../../assets/konica.jpg";
import { uid } from "uid";
const SingleProduct = ({ product, setsingleProductFlag }) => {
  const [flag, setFlag] = useState(-1);
  const [flag1, setFlag1] = useState(-1);
  const [colorPrice, setColorPrice] = useState(null);
  const [taggingPrice, setTaggingPrice] = useState(null);
  const [colorDes, setColorDes] = useState(null);
  const [taggingDes, setTaggingDes] = useState(null);
  const [quantity, setQuantity] = useState(12);
  const [orderProducts, setOrderProducts] = useState([]);

  const colorHandler = (index, p) => {
    setFlag(index);
    setColorPrice((index + 1) * 10);
    setColorDes(p.colorDescription);
  };

  const packingHandler = (index, p) => {
    setFlag1(index);
    setTaggingPrice(parseInt(p.grossPrice) + parseInt(index * 10));
    setTaggingDes(p.packingDescription);
  };

  const clickAddHandler = () => {
    const state = {
      id: uid(),
      name: product.itemDescription,
      quantity: quantity,
      colorDes: colorDes,
      taggingDes: taggingDes,
      price:
        parseInt(colorPrice ? colorPrice : 0) +
        parseInt(taggingPrice ? taggingPrice : 0),
    };
    let flag;
    const lists = orderProducts.map((order) => {
      if (
        order.colorDes == state.colorDes &&
        order.taggingDes == state.taggingDes
      ) {
        flag = true;
        return { ...order, quantity: order.quantity + state.quantity };
      }
      return order;
    });
    if (flag) {
      setOrderProducts(lists);
    } else {
      setOrderProducts((prev) => [...prev, state]);
    }
  };

  return ReactDOM.createPortal(
    <div className="singleproduct">
      <div className="singleProductDetails">
        <h4>{product.itemDescription}</h4>
        <div>
          <img src={logo} alt="" className="singleproductImage" />
          <FavoriteBorder className="socialIcon" />
        </div>
        <div className="singleProductDescription">
          <span>#{product.itemNumber}</span>
          <div className="singleProductPrice">
            <p>{product.itemDescription}</p>
            <p>
              &#36;
              {parseInt(colorPrice ? colorPrice : 0) +
                parseInt(taggingPrice ? taggingPrice : 0)}
            </p>
          </div>
          <span>
            lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
            tenetur beatae amet...
          </span>
        </div>
        <div>
          <p className="colorDescription">Please Select Color Description</p>
          <div className="colorsList">
            {product.variants.slice(0, 5).map((p, index) => (
              <div
                // className="colors"
                className="colors "
                style={{
                  borderColor: index === flag ? "red" : "white",
                  color: index === flag ? "red" : "black",
                }}
                key={index}
                onClick={() => colorHandler(index, p)}
              >
                {p.colorDescription}
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="packageDescription">
            Please Select Packaging Description
          </p>
          <div className="packingList">
            {product.variants.slice(0, 5).map((p, index) => (
              <div
                className="packings"
                key={index}
                onClick={() => packingHandler(index, p)}
                style={{
                  borderColor: index === flag1 ? "red" : "white",
                  color: index === flag1 ? "red" : "black",
                }}
              >
                {p.packingDescription}
              </div>
            ))}
          </div>
        </div>
        <div>
          <p>Enter Quantity</p>
          <input
            type="number"
            min="12"
            onChange={(e) => setQuantity(e.target.value)}
          />
          <br />
          <span style={{ color: "red" }}>minimum orders 12*</span>
        </div>
        <div className="checkboxOrder">
          <input type="checkbox" />
          <p>Need Urgent order</p>
        </div>
        <div className="addbuttonContainer">
          <button className="addorderButton" onClick={clickAddHandler}>
            Add
          </button>
        </div>
      </div>
      <div className="singleOrderList">
        <OrderList
          orderProducts={orderProducts}
          setsingleProductFlag={setsingleProductFlag}
        />
      </div>
      <div className="closebutton" onClick={() => setsingleProductFlag(false)}>
        <Close />
      </div>
    </div>,
    document.getElementById("product-root")
  );
};

export default SingleProduct;
