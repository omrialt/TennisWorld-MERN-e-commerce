import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Fragment } from "react";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
  listMyOrders,
} from "../store/Orders/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../store/Orders/orderConstants";
import { formatDate, formatTime } from "../utils/formatDate";

const OrderScreen = () => {
  const [paypalClientId, setPaypalClientId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  //get order details
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  //get pay successful
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  //get order delivered
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  //get user info
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //function to add decimals to prices
  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }
  //dispatch payOrder function
  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(id, paymentResult));
  };

  //dispatch deliverOrder function
  const deliverHandler = () => {
    dispatch(deliverOrder(id));
    dispatch(listMyOrders());
  };
  useEffect(() => {
    document.title = "TennisWorld|My Order";
    if (!userInfo) {
      navigate("/login");
    }
    if (!order || order._id !== id || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(id));
      dispatch(listMyOrders());
    }
  }, [dispatch, id, order, successPay, successDeliver, navigate, userInfo]);

  // PayPalScriptProvider loads the SDK itself; it just needs the client id.
  useEffect(() => {
    let cancelled = false;
    axios
      .get("/api/config/paypal")
      .then(({ data }) => {
        if (!cancelled) setPaypalClientId(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Fragment>
      <h1>Order Details</h1>
      <h2>Id: {order._id}</h2>
      {userInfo.isAdmin && <h2>User Id:{order.user._id}</h2>}
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address},{order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered at:{formatDate(order.deliveredAt)}{" "}
                  {formatTime(order.deliveredAt)}
                </Message>
              ) : (
                <Message variant="danger">Not delivered</Message>
              )}
            </ListGroupItem>
            <ListGroupItem>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.paidAt ? (
                <Message variant="success">
                  Paid on: {formatDate(order.paidAt)}{" "}
                  {formatTime(order.paidAt)}
                </Message>
              ) : (
                <Message variant="danger">Not paid</Message>
              )}
            </ListGroupItem>
            <ListGroupItem>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty!</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => {
                    return (
                      <ListGroupItem key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.productId}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x ${item.price} = $
                            {(item.price * item.qty).toFixed(2)}
                          </Col>
                        </Row>
                      </ListGroupItem>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroupItem>
                <h2>Order Summary</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroupItem>
              {!order.paidAt && !userInfo?.isAdmin && (
                <ListGroupItem>
                  {loadingPay && <Loader />}
                  {!paypalClientId ? (
                    <Loader />
                  ) : (
                    !userInfo.isAdmin && (
                      <PayPalScriptProvider
                        options={{ clientId: paypalClientId, currency: "USD" }}
                      >
                        <PayPalButtons
                          style={{ layout: "vertical" }}
                          forceReRender={[order.totalPrice]}
                          createOrder={(data, actions) =>
                            actions.order.create({
                              purchase_units: [
                                {
                                  amount: { value: String(order.totalPrice) },
                                },
                              ],
                            })
                          }
                          onApprove={(data, actions) =>
                            actions.order.capture().then((details) =>
                              successPaymentHandler({
                                id: details.id,
                                status: details.status,
                                update_time: details.update_time,
                                email_address: details.payer?.email_address,
                              })
                            )
                          }
                        />
                      </PayPalScriptProvider>
                    )
                  )}
                  <div style={{ color: "red" }}>
                    <p>*for check please write*</p>
                    <p>email:sb-ytaus17641151@personal.example.com</p>
                    <p>password:PAYTRY1807</p>
                  </div>
                </ListGroupItem>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.paidAt &&
                !order.isDelivered && (
                  <ListGroupItem>
                    <Button
                      style={{ width: "100%" }}
                      type="button"
                      className="btn btn-dark btn-lg btn-block"
                      onClick={deliverHandler}
                    >
                      Mark as delivered
                    </Button>
                  </ListGroupItem>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};
export default OrderScreen;
