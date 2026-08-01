import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  productListAllReducer,
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
  productSimilarReducer,
  productsBrandCategoryReducer,
  productsBrandOrCategoryReducer,
} from "./Products/productsReducers";
import { cartReducer, wishListReducer } from "./Cart/cartReducer";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./Users/userReducer";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
  orderListReducer,
  orderDeliverReducer,
  orderTopSalesReducer,
} from "./Orders/orderReducer";

const reducer = combineReducers({
  productsListAll: productListAllReducer,
  productsList: productListReducer,
  productsTopRated: productTopRatedReducer,
  productsSimilar: productSimilarReducer,
  productsBrandCategory: productsBrandCategoryReducer,
  productsBrandOrCategory: productsBrandOrCategoryReducer,
  productDetail: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  cart: cartReducer,
  wishList: wishListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  orderTopSales: orderTopSalesReducer,
});
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const wishListItemsFromStorage = localStorage.getItem("wishListItems")
  ? JSON.parse(localStorage.getItem("wishListItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  wishList: {
    wishListItems: wishListItemsFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

// configureStore bundles redux-thunk and the devtools extension, so the
// separate redux / redux-thunk / @redux-devtools/extension packages are gone.
// The reducers here are hand-written (non-Immer) and store non-serializable
// Error values in their error slices, so RTK's dev-only checks are off.
const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});
export default store;
