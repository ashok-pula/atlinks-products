import { ADD_ITEM, CLEAR_CART, REMOVE_ITEM } from "./cartTypes";

const initialState = {
  items: [],
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      let flag = false;
      let quantity1;
      let flag1 = false;

      const lists = state.items?.map((order, index) => {
        action.payload.map((item) => {
          if (
            item.colorDes === order.colorDes &&
            item.taggingDes === order.taggingDes
          ) {
            flag = true;
            flag1 = true;
            quantity1 = item.quantity;
          }
        });
        console.log("Ashok", order);

        if (flag1) {
          flag1 = false;
          return {
            ...order,
            quantity: order.quantity + quantity1,
          };
        }

        return order;
      });
      if (flag) {
        return { ...state, items: [...lists] };
      } else {
        return { ...state, items: [...state.items, ...action.payload] };
      }
    case CLEAR_CART:
      return initialState;
    default:
      return state;
  }
};
export default cartReducer;

// import { ADD_ITEM, CLEAR_CART, REMOVE_ITEM } from "./cartTypes";

// const initialState = {
//   items: [],
// };
// const cartReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_ITEM:
//       return { ...state, items: [...state.items, ...action.payload] };
//     case CLEAR_CART:
//       return initialState;
//     default:
//       return state;
//   }
// };
// export default cartReducer;
