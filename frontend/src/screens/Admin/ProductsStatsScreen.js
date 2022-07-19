import { useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { LinkContainer } from "react-router-bootstrap";
import { topOrders, lastOrders } from "../../store/Orders/orderActions";

const ProductsStatsScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //top products sales
  const orderTopSales = useSelector((state) => state.orderTopSales);
  const { loading, error, products } = orderTopSales;

  //user login info
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    document.title = "TennisWorld|Stats";
    if (userInfo && userInfo.isAdmin) {
      dispatch(topOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <Fragment>
      <h1>
        Top Sales Products <i className="fa fa-signal" aria-hidden="true"></i>
      </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : products.length === 0 ? (
        <Message variant="danger">There is no orders yet!</Message>
      ) : (
        <Table striped borders hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Sold(Times)</th>
              <th>Orders Count</th>
              <th>Count In Stock</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.sold}</td>
                  <td>{product.inOrders.length}</td>
                  <td>{product.countInStock}</td>
                  <td>
                    <LinkContainer to={`/product/${product._id}`}>
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
export default ProductsStatsScreen;
