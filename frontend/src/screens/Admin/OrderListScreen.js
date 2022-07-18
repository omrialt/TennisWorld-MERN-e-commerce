import { useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { LinkContainer } from "react-router-bootstrap";
import { listOrders, topOrders } from "../../store/Orders/orderActions";

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //all orders list
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  //user login info
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    document.title = "TennisWorld|Order List";
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
      dispatch(topOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <Fragment>
      <h1>
        Orders <i className="fa fa-exchange" aria-hidden="true"></i>
      </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : orders.length === 0 ? (
        <Message variant="danger">No orders found</Message>
      ) : (
        <Table striped borders hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Id</th>
              <th>User(Id)</th>
              <th>Total Price</th>
              <th>Created At</th>
              <th>Is Paid</th>
              <th>Is Delivered</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>
                    {order.user.name}({order.user._id})
                  </td>
                  <td>${order.totalPrice}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>
                    {order.isPaid ? (
                      <i
                        style={{ color: "green" }}
                        className="fas fa-check"
                      ></i>
                    ) : (
                      <i style={{ color: "red" }} className="fas fa-times"></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <i
                        style={{ color: "green" }}
                        className="fas fa-check"
                      ></i>
                    ) : (
                      <i style={{ color: "red" }} className="fas fa-times"></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
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
      )}
    </Fragment>
  );
};
export default OrderListScreen;
