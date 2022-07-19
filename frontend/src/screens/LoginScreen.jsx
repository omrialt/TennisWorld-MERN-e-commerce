import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../store/Users/userActions";
import UseValid from "../hooks/use-valid";
import { validateEmail, validatePassword } from "../utils/validateFunctions";
import Input from "../utils/Input";

const LoginScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //user login
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    isValid: enteredEmailIsValid,
    inputBlurHandler: emailInputBlurHandler,
  } = UseValid((value) => validateEmail(value));
  const {
    value: enteredPassword,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    isValid: enteredPasswordIsValid,
    inputBlurHandler: passwordInputBlurHandler,
  } = UseValid((value) => validatePassword(value));

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(enteredEmail, enteredPassword));
  };

  const emailInputClasses = emailInputHasError ? "invalid" : "";
  const passwordInputClasses = passwordInputHasError ? "invalid" : "";

  let isValid = false;

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    isValid = true;
  }

  useEffect(() => {
    document.title = "TennisWorld|Login";
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
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
          errorText="must be at least 8 characters with at least 1 capital letter, 1 symbol and 1 number"
        />
        <Button
          disabled={!isValid}
          className="my-3"
          type="submit"
          variant="primary"
        >
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer? <Link to={"/register"}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
export default LoginScreen;
