import axios from "axios";
import {
  ARTICLES_DETAILS_FAIL,
  ARTICLES_LIST_FAIL,
  ARTICLE_CREATE_FAIL,
  ARTICLE_CREATE_REQUEST,
  ARTICLE_CREATE_REVIEW_FAIL,
  ARTICLE_CREATE_REVIEW_REQUEST,
  ARTICLE_CREATE_REVIEW_SUCCESS,
  ARTICLE_CREATE_SUCCESS,
  ARTICLE_DELETE_FAIL,
  ARTICLE_DELETE_REQUEST,
  ARTICLE_DELETE_SUCCESS,
  ARTICLE_DETAILS_REQUEST,
  ARTICLE_DETAILS_SUCCESS,
  ARTICLE_LIST_REQUEST,
  ARTICLE_LIST_SUCCESS,
  ARTICLE_UPDATE_FAIL,
  ARTICLE_UPDATE_REQUEST,
  ARTICLE_UPDATE_SUCCESS,
} from "./articleConstants";

export const listArticles = () => async (dispatch) => {
  try {
    dispatch({ type: ARTICLE_LIST_REQUEST });
    const { data } = await axios.get(`/api/magazine`);
    dispatch({
      type: ARTICLE_LIST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ARTICLES_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const listArticlesDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ARTICLE_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/magazine/${id}`);
    dispatch({
      type: ARTICLE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ARTICLES_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deleteArticle = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ARTICLE_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        x_auth_token: userInfo.token,
      },
    };

    await axios.delete(`/api/magazine/${id}`, config);
    dispatch({
      type: ARTICLE_DELETE_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: ARTICLE_DELETE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createArticle = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ARTICLE_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        x_auth_token: userInfo.token,
      },
    };

    const { data } = await axios.post(`/api/magazine`, {}, config);
    dispatch({
      type: ARTICLE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ARTICLE_CREATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateArticle = (article) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ARTICLE_UPDATE_REQUEST,
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
      `/api/magazine/${article._id}`,
      article,
      config
    );
    dispatch({
      type: ARTICLE_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ARTICLE_UPDATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createArticleReview =
  (articleId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ARTICLE_CREATE_REVIEW_REQUEST,
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

      await axios.post(`/api/magazine/${articleId}/reviews`, review, config);
      dispatch({
        type: ARTICLE_CREATE_REVIEW_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: ARTICLE_CREATE_REVIEW_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
