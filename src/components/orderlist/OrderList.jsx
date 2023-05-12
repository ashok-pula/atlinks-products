import React, { useEffect } from "react";
import "./orderList.css";
import { Close } from "@mui/icons-material";
import logo from "../../assets/konica.jpg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cart/cartActions";
const OrderList = ({ orderProducts, setsingleProductFlag }) => {
  const [orderProduct, setOrderProduct] = useState([]);
  useEffect(() => {
    setOrderProduct(orderProducts);
  }, [orderProducts]);

  const dispatch = useDispatch();
  const closeHandler = (id) => {
    console.log(id);
    const newList = orderProduct.filter((order) => order.id !== id);

    setOrderProduct(newList);
  };
  const cartHandler = () => {
    setsingleProductFlag(false);
    dispatch(addItem(orderProduct));
  };
  return (
    <div className="orderListContainer">
      <span>Order List</span>
      <div className="orderList">
        <div>Products</div>
        <div>Quantity</div>
        <div>Price</div>
      </div>
      {orderProduct?.map((order, index) => (
        <div className="orderDetailsList" key={index}>
          <div className="orderLogoDetails">
            <img src={logo} alt="" className="orderLogo" />
            <div className="orderNames">
              <span className="orderName">{order.name}</span>
              <span className="orderDescription">
                {order.colorDes} | {order.taggingDes}
              </span>
            </div>
          </div>
          <p>{order.quantity}</p>
          <p className="orderprice">
            {order.quantity * order.price}
            <span className="closeorder" onClick={() => closeHandler(order.id)}>
              <Close />
            </span>
          </p>
        </div>
      ))}
      {orderProduct?.length > 0 && (
        <div className="cartButtonContainer">
          <button className="cartButton" onClick={cartHandler}>
            Add to cart
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderList;
