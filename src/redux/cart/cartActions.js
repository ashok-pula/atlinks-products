import { ADD_ITEM, CLEAR_CART, REMOVE_ITEM } from "./cartTypes";

export const addItem = (item) => {
  return {
    type: ADD_ITEM,
    payload: item,
  };
};
export const removeItem = (id) => {
  return {
    type: REMOVE_ITEM,
    payload: id,
  };
};

export const clearcart = () => {
  return {
    type: CLEAR_CART,
  };
};
