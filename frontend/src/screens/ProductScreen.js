import { Link, useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  FormControl,
  ListGroupItem,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import Rating from "../components/Rating";
import Product from "../components/Product";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
  createProductReview,
  listSimilarProducts,
} from "../store/Products/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { PRODUCT_CREATE_REVIEW_RESET } from "../store/Products/productConstants";
import { addToWishList, addToCart } from "../store/Cart/CartActions";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  //get product detail
  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;

  //create product review
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { error: errorProductReview, success: successProductReview } =
    productReviewCreate;

  //get similar products
  const productSimilar = useSelector((state) => state.productSimilar);

  const {
    loading: loadingSimilar,
    error: errorSimilar,
    products: productsSimilarList,
  } = productSimilar;

  //get user login info
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const addToCartHandler = () => {
    Swal.fire({
      icon: "success",
      title: `${product.name} add to cart secussefuly`,
      showConfirmButton: false,
      timer: 2000,
    });
    dispatch(addToCart(id, qty));
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
  const addToWishListHandler = () => {
    Swal.fire({
      icon: "success",
      title: `${product.name} add to wishlist secussefuly`,
      showConfirmButton: false,
      timer: 2000,
    });
    dispatch(addToWishList(id));
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    );
  };
  console.log(productsSimilarList);
  useEffect(() => {
    document.title = `${product.name}`;
    if (successProductReview) {
      alert("Review submitted");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(id));
    dispatch(listSimilarProducts(product.category, product.brand));
  }, [
    dispatch,
    id,
    successProductReview,
    product.name,
    product.category,
    product.brand,
  ]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Fragment>
          <Link to="/" className="btn btn-dark my-3">
            Go Back
          </Link>
          <Row>
            <Col md={5}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} Reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Price: </strong> ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong> Description: </strong> {product.description}
                </ListGroup.Item>
                {product.category === "Rackets" ? (
                  <Fragment>
                    <ListGroupItem>
                      <strong>Head Size: </strong>
                      {product.headSize}
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>Length: </strong>
                      {product.length}
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>Weight: </strong>
                      {product.weight}
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>Balance: </strong>
                      {product.balance}
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>Composition: </strong>
                      {product.composition}
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>Color: </strong>
                      {product.color}
                    </ListGroupItem>
                  </Fragment>
                ) : product.category === "Strings" ? (
                  <Fragment>
                    <ListGroupItem>
                      <strong>Gauge: </strong>
                      {product.gauge}
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>Length: </strong>
                      {product.length}
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>Composition: </strong>
                      {product.composition}
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>Color: </strong>
                      {product.color}
                    </ListGroupItem>
                  </Fragment>
                ) : product.category === "Grips" ? (
                  <Fragment>
                    <ListGroupItem>
                      <strong>Thickness: </strong>
                      {product.thickness}
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>Color: </strong>
                      {product.color}
                    </ListGroupItem>
                  </Fragment>
                ) : (
                  product.category === "Bags" && (
                    <Fragment>
                      <ListGroupItem>
                        <strong>Dimension: </strong>
                        {product.dimension}
                      </ListGroupItem>
                      <ListGroupItem>
                        <strong>Suitable For: </strong>
                        {product.suitableFor} Rackets
                      </ListGroupItem>
                      <ListGroupItem>
                        <strong>Color: </strong>
                        {product.color}
                      </ListGroupItem>
                    </Fragment>
                  )
                )}
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>${product.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out of stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && !userInfo?.isAdmin && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <FormControl
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </FormControl>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    {!userInfo?.isAdmin && (
                      <Fragment>
                        <Button
                          onClick={addToCartHandler}
                          style={{ width: "100%" }}
                          className="btn btn-primary btn-lg btn-block"
                          type="button"
                          disabled={product.countInStock === 0}
                        >
                          Add To Cart
                        </Button>
                        <Button
                          onClick={addToWishListHandler}
                          style={{ width: "100%" }}
                          className="btn btn-dark btn-lg btn-block my-3"
                          type="button"
                        >
                          Add To WishList
                        </Button>
                      </Fragment>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No reviews!</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => {
                  return (
                    <ListGroupItem key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroupItem>
                  );
                })}

                <ListGroupItem>
                  {userInfo && !userInfo.isAdmin && <h2>Write your review:</h2>}
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    !userInfo.isAdmin && (
                      <Form onSubmit={submitHandler}>
                        <FormGroup controlId="rating">
                          <FormLabel>Rating</FormLabel>
                          <FormControl
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="">Select...</option>
                            <option value="1">1-Poor</option>
                            <option value="2">2-Fair</option>
                            <option value="3">3-Good</option>
                            <option value="4">4-Very Good</option>
                            <option value="5">5-Excellent</option>
                          </FormControl>
                        </FormGroup>
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
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </Fragment>
      )}
    </Fragment>
  );
};
export default ProductScreen;

/*{loadingSimilar ? (
            <Loader />
          ) : errorSimilar ? (
            <Message variant="red">{errorSimilar}</Message>
          ) : (
            <Fragment>
            <h2>Similar Products:</h2>
            <Row>
              {productsSimilarList.categoryList.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={3} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <h2>Similar Products:</h2>
            <Row>
              {productsSimilarList.categoryList.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={3} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            </Fragment>
          )}
*/
