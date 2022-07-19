import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../store/Users/userActions";
import UseValid from "../hooks/use-valid";
import { validateEmail, validatePassword } from "../utils/validateFunctions";
import Input from "../utils/Input";
const RegisterScreen = () => {
  const [message, setMessage] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  const {
    value: enteredPasswordConfirm,
    hasError: passwordConfirmInputHasError,
    valueChangeHandler: passwordConfirmChangeHandler,
    isValid: enteredPasswordConfirmIsValid,
    inputBlurHandler: passwordConfirmInputBlurHandler,
  } = UseValid((value) => validatePassword(value));
  const {
    value: enteredName,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    isValid: enteredNameIsValid,
    inputBlurHandler: nameInputBlurHandler,
  } = UseValid((value) => value.trim().length > 2);

  const redirect = location.search ? location.search.split("=")[1] : "/";

  //set user register
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error } = userRegister;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: userInfoLogin } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    if (enteredPassword !== enteredPasswordConfirm) {
      setMessage("Passwords does not match!");
    } else {
      dispatch(register(enteredName, enteredEmail, enteredPassword));
    }
  };

  let isValid = false;
  const nameInputClasses = nameInputHasError ? "invalid" : "";
  const emailInputClasses = emailInputHasError ? "invalid" : "";
  const passwordInputClasses = passwordInputHasError ? "invalid" : "";
  const passwordConfirmInputClasses = passwordConfirmInputHasError
    ? "invalid"
    : "";
  if (
    enteredEmailIsValid &&
    enteredNameIsValid &&
    enteredPasswordIsValid &&
    enteredPasswordConfirmIsValid
  ) {
    isValid = true;
  }
  useEffect(() => {
    document.title = "TennisWorld|Register";
    if (userInfoLogin) {
      navigate(redirect);
    }
  }, [navigate, userInfoLogin, redirect]);
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="danger">{message}</Message>}
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
          errorText="must be at least 8 characters with at least 1 capital letter, 1 symbol and 1 number"
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
          errorText="must be at least 8 characters with at least 1 capital letter, 1 symbol and 1 number"
        />

        <Button
          disabled={!isValid}
          className="my-3"
          type="submit"
          variant="primary"
        >
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have an account?{" "}
          <Link to={redirect ? `/login/?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
export default RegisterScreen;
