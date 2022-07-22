import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Table, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../store/Users/userActions";
import { listMyOrders } from "../store/Orders/orderActions";
import { removeFromWishList } from "../store/Cart/CartActions";
import { USER_UPDATE_PROFILE_RESET } from "../store/Users/userConstants";
import UseValid from "../hooks/use-valid";
import { validateEmail, validatePassword } from "../utils/validateFunctions";
import Input from "../utils/Input";
const ProfileScreen = () => {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    isValid: enteredEmailIsValid,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmailValue,
    setEnteredValue: setEmailValueHandler,
  } = UseValid((value) => validateEmail(value));
  const {
    value: enteredPassword,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    isValid: enteredPasswordIsValid,
    inputBlurHandler: passwordInputBlurHandler,
    reset: resetPasswordValue,
  } = UseValid((value) => validatePassword(value));
  const {
    value: enteredPasswordConfirm,
    hasError: passwordConfirmInputHasError,
    valueChangeHandler: passwordConfirmChangeHandler,
    isValid: enteredPasswordConfirmIsValid,
    inputBlurHandler: passwordConfirmInputBlurHandler,
    reset: resetPasswordConfirmValue,
  } = UseValid((value) => validatePassword(value));
  const {
    value: enteredName,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    isValid: enteredNameIsValid,
    inputBlurHandler: nameInputBlurHandler,
    reset: resetNameValue,
    setEnteredValue: setNameValueHandler,
  } = UseValid((value) => value.trim().length > 2);

  //get user details
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  //get user login info
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //update user detail
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  //get user order list
  const orderListMy = useSelector((state) => state.orderListMy);

  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  //get user wish list
  const wishList = useSelector((state) => state.wishList);

  const { wishListItems } = wishList;
  const submitHandler = (e) => {
    e.preventDefault();
    if (enteredPassword !== enteredPasswordConfirm) {
      setMessage("Passwords does not match!");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name: enteredName,
          email: enteredEmail,
          password: enteredPassword,
        })
      );
      resetEmailValue();
      resetPasswordValue();
      resetPasswordConfirmValue();
      resetNameValue();
      setMessage(null);
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
    }
  };

  const deleteHandler = (product) => {
    const { name, productId: id } = product;

    Swal.fire({
      icon: "success",
      title: `${name} removed from wish list`,
      showConfirmButton: false,
      timer: 2000,
    });
    dispatch(removeFromWishList(id));
  };

  const nameInputClasses = nameInputHasError ? "invalid" : "";
  const emailInputClasses = emailInputHasError ? "invalid" : "";
  const passwordInputClasses = passwordInputHasError ? "invalid" : "";
  const passwordConfirmInputClasses = passwordConfirmInputHasError
    ? "invalid"
    : "";
  let isValid = false;
  if (
    enteredEmailIsValid &&
    enteredNameIsValid &&
    enteredPasswordIsValid &&
    enteredPasswordConfirmIsValid
  ) {
    isValid = true;
  }

  useEffect(() => {
    document.title = "TennisWorld|My Profile";
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      }
      if (userInfo) {
        setNameValueHandler(userInfo.name);
        setEmailValueHandler(userInfo.email);
      }
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    user,
    success,
    setNameValueHandler,
    setEmailValueHandler,
  ]);

  return (
    <Row>
      <Col md={!userInfo.isAdmin ? 3 : 12}>
        <h2>My Profile</h2>
        {error && <Message variant="danger">{error}</Message>}
        {message && <Message variant="danger">{message}</Message>}
        {success && <Message variant="success">Profile updated!</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Input
            className={nameInputClasses}
            controlId="name"
            label="Name"
            type="text"
            value={enteredName}
            onInputFn={nameChangeHandler}
            onBlurFn={nameInputBlurHandler}
            errorTernary={nameInputHasError}
            errorText="must be at least 3 characters"
          />
          <Input
            className={emailInputClasses}
            controlId="email"
            label="Email"
            type="email"
            value={enteredEmail}
            onInputFn={emailChangeHandler}
            onBlurFn={emailInputBlurHandler}
            errorTernary={emailInputHasError}
            errorText="is not valid"
          />
          <Input
            className={passwordInputClasses}
            controlId="password"
            label="Password"
            type="password"
            value={enteredPassword}
            onInputFn={passwordChangeHandler}
            onBlurFn={passwordInputBlurHandler}
            errorTernary={passwordInputHasError}
            errorText="must be at least 8 characters with at least 1 capital letter, 1 symbol and 4 number"
          />
          <Input
            className={passwordConfirmInputClasses}
            controlId="passwordConfirm"
            label="Confirm Password"
            type="password"
            value={enteredPasswordConfirm}
            onInputFn={passwordConfirmChangeHandler}
            onBlurFn={passwordConfirmInputBlurHandler}
            errorTernary={passwordConfirmInputHasError}
            errorText="must be at least 8 characters with at least 1 capital letter, 1 symbol and 4 number"
          />

          <Button
            disabled={!isValid}
            className="my-3"
            type="submit"
            variant="primary"
          >
            Update
          </Button>
        </Form>
      </Col>
      {!userInfo.isAdmin && (
        <Col md={9}>
          <h2>My Orders</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant="danger">{errorOrders}</Message>
          ) : orders.length === 0 ? (
            <Message variant="danger">No orders found</Message>
          ) : (
            <Table striped border hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  return (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <i
                            style={{ color: "red" }}
                            className="fas fa-times"
                          ></i>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <i
                            style={{ color: "red" }}
                            className="fas fa-times"
                          ></i>
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
          <h2>My Wish List</h2>
          {wishListItems.length === 0 ? (
            <Message variant="danger">No products found</Message>
          ) : (
            <Table striped border hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {wishListItems.map((product) => {
                  return (
                    <tr key={product.productId}>
                      <td>{product.name}</td>
                      <td>
                        <Image
                          style={{ width: "50px", height: "50px" }}
                          alt={product.name}
                          src={product.image}
                        />
                      </td>
                      <td>${product.price}</td>
                      <td>
                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => deleteHandler(product)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                        <LinkContainer to={`/product/${product.productId}`}>
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
        </Col>
      )}
    </Row>
  );
};
export default ProfileScreen;
