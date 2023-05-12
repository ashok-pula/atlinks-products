import React, { useState } from "react";
import "./cart.css";
import {
  ArrowForward,
  KeyboardArrowRight,
  ProductionQuantityLimitsOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/konica.jpg";
import { clearcart } from "../../redux/cart/cartActions";
import OrderSuccess from "../ordersuccess/OrderSuccess";

const Cart = () => {
  const { items } = useSelector((state) => state);
  const [successFlag, setSuccessFlag] = useState(false);
  const dispatch = useDispatch();
  const itemTotal = items.reduce(
    (acc, current) => acc + current.quantity * current.price,
    0
  );
  const sgst = Math.ceil(itemTotal * 0.09);
  const cgst = Math.ceil(itemTotal * 0.09);
  const igst = Math.ceil(itemTotal * 0.09);

  const totaltax = sgst + cgst + igst;

  const ordertotal = itemTotal + totaltax;

  const placeordersuccess = () => {
    setSuccessFlag(true);
    dispatch(clearcart());
  };
  return (
    <div className="cartContainer">
      <div className="cartHeading">
        <div>Products</div>
        <div>Quantity</div>
        <div>Price</div>
        {items.length > 0 && (
          <span className="editarrow">
            Edit <KeyboardArrowRight />
          </span>
        )}
      </div>
      <div className="cartContainer">
        {items.slice(0, 5).map((order, index) => (
          <div className="cartDetailsList" key={index}>
            <div className="cartLogoDetails">
              <img src={logo} alt="" className="cartLogo" />
              <div className="cartNames">
                <span className="cartName">{order.name}</span>
                <span className="cartDescription">
                  {order.colorDes} | {order.taggingDes}
                </span>
              </div>
            </div>
            <p className="cartquantity">{order.quantity}</p>
            <p className="cartprice">{order.quantity * order.price}</p>
          </div>
        ))}
      </div>

      <hr className="dottedline" />

      {items.length > 5 && (
        <p className="seeall">
          See all <KeyboardArrowRight />
        </p>
      )}
      {items.length > 0 && (
        <div>
          <div className="otherInstructions">
            <p>Other Instructions</p>
            <span className="addinstruction">
              Add
              <KeyboardArrowRight />
            </span>
          </div>
          <div className="purchaseorder">
            <p>Purchase Order Number</p>
            <p className="ordernumber">1011564321</p>
          </div>
          <div className="addresses">
            <div className="addressesview">
              <span>Addresses</span>
              <span className="viewarrow">
                View <KeyboardArrowRight />
              </span>
            </div>
            <span className="addressoffice">
              Office:28,Rajashtani udyogi nagar,G.T,karnataka...
            </span>
          </div>
          <hr className="dottedline" />
          <div className="itemspriceContainer">
            <div className="itemsprice">
              <span>Items total</span>
              <span>&#36; {itemTotal}</span>
            </div>
            <div className="itemsprice">
              <span>SGST (9%) </span>
              <span>&#36; {sgst}</span>
            </div>
            <div className="itemsprice">
              <span>CGST (9%)</span>
              <span>&#36; {cgst}</span>
            </div>
            <div className="itemsprice">
              <span>IGST (9%)</span>
              <span>&#36; {igst}</span>
            </div>
            <div className="itemsprice">
              <span>Taxable Amount</span>
              <span>&#36; {totaltax}</span>
            </div>
            <hr className="dottedline" style={{ margin: "5px" }} />
            <div
              className="itemsprice"
              style={{ color: "black", fontWeight: "bold" }}
            >
              <span>Order Total</span>
              <span>&#36; {ordertotal}</span>
            </div>
            <div className="itemsprice clearcart">
              <button
                className="clearbutton"
                onClick={() => dispatch(clearcart())}
              >
                Clear Cart
              </button>
              <button className="orderbutton" onClick={placeordersuccess}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
      {items.length <= 0 && (
        <div className="noitem">
          <ProductionQuantityLimitsOutlined />
          <p>Items not yet added</p>
        </div>
      )}
      {successFlag && <OrderSuccess setSuccessFlag={setSuccessFlag} />}
    </div>
  );
};

export default Cart;
