import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_RESET,
  CART_WISHLIST_ADD_ITEM,
  CART_WISHLIST_REMOVE_ITEM,
  CART_WISHLIST_RESET,
} from "./cartConstant";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find(
        (x) => x.productId === item.productId
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.productId === existItem.productId ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x) => x.productId !== action.payload
        ),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CART_RESET:
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};
export const wishListReducer = (state = { wishListItems: [] }, action) => {
  switch (action.type) {
    case CART_WISHLIST_ADD_ITEM:
      const item = action.payload;
      const existItem = state.wishListItems.find(
        (x) => x.productId === item.productId
      );
      if (existItem) {
        return {
          ...state,
          wishListItems: state.wishListItems.map((x) =>
            x.productId === existItem.productId ? item : x
          ),
        };
      } else {
        return {
          ...state,
          wishListItems: [...state.wishListItems, item],
        };
      }
    case CART_WISHLIST_REMOVE_ITEM:
      return {
        ...state,
        wishListItems: state.wishListItems.filter(
          (x) => x.productId !== action.payload
        ),
      };
    case CART_WISHLIST_RESET:
      return { ...state, wishListItems: [] };
    default:
      return state;
  }
};
