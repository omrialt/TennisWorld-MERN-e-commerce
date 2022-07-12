import { Link, useParams, useNavigate } from "react-router-dom";

import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listArticlesDetails,
  createArticleReview,
} from "../store/Articles/articleActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { ARTICLE_CREATE_REVIEW_RESET } from "../store/Articles/articleConstants";

const ArticleScreen = () => {
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const { id } = useParams();

  const articleDetail = useSelector((state) => state.articleDetail);
  const { loading, error, article } = articleDetail;

  const articleReviewCreate = useSelector((state) => state.articleReviewCreate);
  const { error: errorArticleReview, success: successArticleReview } =
    articleReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log(article);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createArticleReview(id, {
        comment,
      })
    );
  };
  useEffect(() => {
    document.title = `${article.title}`;
    if (successArticleReview) {
      alert("Review submitted");
      setComment("");
      dispatch({ type: ARTICLE_CREATE_REVIEW_RESET });
    }
    dispatch(listArticlesDetails(id));
  }, [dispatch, id, successArticleReview, article.title]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Fragment>
          <Link to="/magazine" className="btn btn-dark my-3">
            Go Back
          </Link>
          <h1>{article.title}</h1>
          <p>
            <strong className="author">{`${article.createdBy},`}</strong>
            {article.updatedAt?.substring(0, 10)}
          </p>
          <hr />
          <div className="article_flex">
            <img
              className="article_img"
              src={article.image}
              alt={article.title}
            />
            <strong>{article.summary}</strong>
          </div>
          <div className="article_text">
            <p>{article.text}</p>
          </div>
          <div className="article_reviews">
            <h3>Reviews</h3>
            {article.reviews.length === 0 && <Message>No Reviews!</Message>}
            {article.reviews.map((review) => {
              return (
                <div key={review._id}>
                  <strong>{review.name}</strong>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </div>
              );
            })}
            {userInfo && !userInfo.isAdmin && <h3>Write your review:</h3>}
            {errorArticleReview && (
              <Message variant="danger">{errorArticleReview}</Message>
            )}
            {userInfo ? (
              !userInfo.isAdmin && (
                <Form onSubmit={submitHandler}>
                  <FormGroup controlId="comment">
                    <FormLabel>Comment</FormLabel>
                    <FormControl
                      as="textarea"
                      row="3"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></FormControl>
                  </FormGroup>
                  <Button
                    className="my-3"
                    type="submit"
                    variant="primary"
                    disabled={comment.trim().length === 0}
                  >
                    Submit
                  </Button>
                </Form>
              )
            ) : (
              <Message>
                Please <Link to="/login">login</Link> to add a review{" "}
              </Message>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default ArticleScreen;
