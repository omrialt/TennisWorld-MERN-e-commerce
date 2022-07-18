import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import Message from "../components/Message";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
  ListGroupItem,
  FormControl,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../store/Cart/CartActions";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  //cart
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  //user info
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //get id from url params
  const { id } = useParams();

  //get qty from location url
  const qty = location.search ? +location.search.split("=")[1] : 1;

  const checkOutHandler = () => {
    if (userInfo) {
      navigate("/shipping");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    document.title = "TennisWorld|Cart";
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => {
              return (
                <ListGroupItem key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        style={{ width: "60px", height: "60px" }}
                        fluid
                        rounded
                      ></Image>
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.productId}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col xs={6} md={2}>
                      <div className="qty_input">
                        <FormControl
                          as="select"
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(addToCart(item.productId, +e.target.value))
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </FormControl>
                      </div>
                    </Col>
                    <Col xs={3} md={2}>
                      <Button
                        type="button"
                        variant="danger"
                        onClick={() => removeFromCartHandler(item.productId)}
                      >
                        <i className="fas fa-trash" />
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => +acc + +item.qty, 0)}
                )Items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroupItem>
            <ListGroupItem>
              <Button
                type="button"
                className="btn btn-dark btn-lg btn-block"
                disabled={!cartItems.length}
                onClick={checkOutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};
export default CartScreen;
