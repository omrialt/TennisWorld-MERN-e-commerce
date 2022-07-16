import axios from "axios";
import {
  PRODUCTS_LIST_ALL_FAIL,
  PRODUCT_LIST_ALL_REQUEST,
  PRODUCT_LIST_ALL_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCTS_LIST_FAIL,
  PRODUCTS_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_SIMILAR_FAIL,
  PRODUCT_SIMILAR_REQUEST,
  PRODUCT_SIMILAR_SUCCESS,
  PRODUCT_CHOOSE_FAIL,
  PRODUCT_CHOOSE_REQUEST,
  PRODUCT_CHOOSE_SUCCESS,
  PRODUCT_SELECT_FAIL,
  PRODUCT_SELECT_REQUEST,
  PRODUCT_SELECT_SUCCESS,
} from "./productConstants";

export const listProducts =
  (pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const { data } = await axios.get(
        `/api/products?pageNumber=${pageNumber}`
      );
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: PRODUCTS_LIST_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
export const listProductsAll = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_ALL_REQUEST });
    const { data } = await axios.get(`/api/products/all`);
    dispatch({
      type: PRODUCT_LIST_ALL_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCTS_LIST_ALL_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCTS_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        x_auth_token: userInfo.token,
      },
    };

    await axios.delete(`/api/products/${id}`, config);
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        x_auth_token: userInfo.token,
      },
    };

    const { data } = await axios.post(`/api/products`, {}, config);
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        x_auth_token: userInfo.token,
      },
    };

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );
    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          x_auth_token: userInfo.token,
        },
      };

      await axios.post(`/api/products/${productId}/reviews`, review, config);
      dispatch({
        type: PRODUCT_CREATE_REVIEW_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST });
    const { data } = await axios.get(`/api/products/top`);
    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
export const listSimilarProducts =
  (category = "", brand = "", id = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_SIMILAR_REQUEST });
      const { data } = await axios.get(
        `/api/products/similar/?category=${category}&brand=${brand}&id=${id}`
      );
      dispatch({
        type: PRODUCT_SIMILAR_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: PRODUCT_SIMILAR_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
export const listBrandCategoryProducts =
  (brand = "", category = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_CHOOSE_REQUEST });
      const { data } = await axios.get(
        `/api/products/choose/?category=${category}&brand=${brand}`
      );
      dispatch({
        type: PRODUCT_CHOOSE_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: PRODUCT_CHOOSE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
export const listBrandOrCategoryProducts =
  (select, name) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_SELECT_REQUEST });
      const { data } = await axios.get(
        `/api/products/select/?${select}=${name}`
      );
      dispatch({
        type: PRODUCT_SELECT_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: PRODUCT_SELECT_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
