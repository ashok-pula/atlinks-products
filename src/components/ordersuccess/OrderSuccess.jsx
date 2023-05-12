import React from "react";
import "./ordersuccess.css";
import { Close } from "@mui/icons-material";

const OrderSuccess = ({ setSuccessFlag }) => {
  return (
    <div className="ordersuccess">
      <div className="ordersuccessheading">
        <p>order place successfully</p>
        <span className="ordersuccessclose">
          <Close onClick={() => setSuccessFlag(false)} />
        </span>
      </div>
      <div className="ordersuccesscontent">
        <p>order will deliver within 3 working days</p>
      </div>
    </div>
  );
};

export default OrderSuccess;
