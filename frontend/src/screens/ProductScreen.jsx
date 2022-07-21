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
  Table,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import Rating from "../components/Rating";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
  createProductReview,
  listSimilarProducts,
} from "../store/Products/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";
import { PRODUCT_CREATE_REVIEW_RESET } from "../store/Products/productConstants";
import { addToWishList, addToCart } from "../store/Cart/CartActions";
import { LinkContainer } from "react-router-bootstrap";

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
  const productSimilar = useSelector((state) => state.productsSimilar);

  const {
    loading: loadingSimilar,
    error: errorSimilar,
    productsList,
  } = productSimilar;

  const {
    name: productName,
    category: productCategory,
    brand: productBrand,
  } = product;
  //get user login info
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const addToCartHandler = () => {
    Swal.fire({
      icon: "success",
      title: `${productName} add to cart secussefuly`,
      showConfirmButton: false,
      timer: 1500,
    });
    dispatch(addToCart(id, qty));
  };
  const addToWishListHandler = () => {
    Swal.fire({
      icon: "success",
      title: `${productName} add to wishlist secussefuly`,
      showConfirmButton: false,
      timer: 1500,
    });
    dispatch(addToWishList(id));
  };
  const navigateToEditProduct = (id) => {
    navigate(`/admin/product/${id}/edit`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(id, {
        rating: +rating,
        comment,
      })
    );
  };

  useEffect(() => {
    document.title = `${productName}`;
    window.scrollTo(0, 0);
    if (successProductReview) {
      Swal.fire({
        icon: "success",
        title: `Review Submitted!`,
        showConfirmButton: false,
        timer: 1500,
      });
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(id));
    dispatch(listSimilarProducts(productCategory, productBrand, id));
  }, [
    dispatch,
    id,
    successProductReview,
    productCategory,
    productBrand,
    productName,
  ]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Fragment>
          <Link to="/" className="btn btn-success my-3">
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
                    {!userInfo?.isAdmin ? (
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
                    ) : (
                      <Button
                        style={{ width: "100%" }}
                        className="btn btn-dark btn-lg btn-block my-3"
                        type="button"
                        onClick={() => navigateToEditProduct(product._id)}
                      >
                        Edit Product
                      </Button>
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
      <Fragment>
        {userInfo?.isAdmin && product.inOrders.length > 0 && (
          <Row>
            <hr />
            <Col md={12}>
              <h2>
                Stats <i className="fa fa-signal" aria-hidden="true"></i>{" "}
              </h2>
              <Table striped borders hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>Order Id</th>
                    <th>User(Id)</th>
                    <th>Created At</th>
                    <th>Count</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {product.inOrders.map((order) => {
                    return (
                      <tr key={order.orderId}>
                        <td>{order.orderId}</td>
                        <td>
                          {order.user.name}({order.user._id})
                        </td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>{order.count}</td>
                        <td>
                          <LinkContainer to={`/order/${order.orderId}`}>
                            <Button className="btn-sm" variant="light">
                              Details
                            </Button>
                          </LinkContainer>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
        )}
        <hr />
      </Fragment>

      {loadingSimilar ? (
        <Loader />
      ) : errorSimilar ? (
        <Message variant="red">{errorSimilar}</Message>
      ) : (
        <Fragment>
          <h2>Similar Products:</h2>
          <Row>
            {productsList.categoryList.map((prod) => (
              <Col key={prod._id} sm={12} md={6} lg={3} xl={3}>
                <Product product={prod} />
              </Col>
            ))}
          </Row>
          <hr />
          <h2>Other From {product.brand}:</h2>
          <Row>
            {productsList.brandList.length > 0 ? (
              productsList.brandList.map((prod) => (
                <Col key={prod._id} sm={12} md={6} lg={3} xl={3}>
                  <Product product={prod} />
                </Col>
              ))
            ) : (
              <Message variant="danger">No Products Found!</Message>
            )}
          </Row>
        </Fragment>
      )}
    </Fragment>
  );
};
export default ProductScreen;
