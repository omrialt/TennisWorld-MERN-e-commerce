import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../store/Cart/CartActions";
import UseValid from "../hooks/use-valid";
import Input from "../utils/Input";

const ShippingScreen = () => {
  document.title = "TennisWorld|Shipping";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //get cart
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const {
    value: enteredAddress,
    hasError: addressInputHasError,
    valueChangeHandler: addressChangeHandler,
    isValid: enteredAddressIsValid,
    inputBlurHandler: addressInputBlurHandler,
    setEnteredValue: setAddressValueHandler,
  } = UseValid((value) => value.length >= 3);
  const {
    value: enteredCity,
    hasError: cityInputHasError,
    valueChangeHandler: cityChangeHandler,
    isValid: enteredCityIsValid,
    inputBlurHandler: cityInputBlurHandler,
    setEnteredValue: setCityValueHandler,
  } = UseValid((value) => value.length >= 3);
  const {
    value: enteredPostalCode,
    hasError: postalCodeInputHasError,
    valueChangeHandler: postalCodeChangeHandler,
    isValid: enteredPostalCodeIsValid,
    inputBlurHandler: postalCodeInputBlurHandler,
    setEnteredValue: setPostalCodeValueHandler,
  } = UseValid((value) => value.length >= 3);
  const {
    value: enteredCountry,
    hasError: countryInputHasError,
    valueChangeHandler: countryChangeHandler,
    isValid: enteredCountryIsValid,
    inputBlurHandler: countryInputBlurHandler,
    setEnteredValue: setCountryValueHandler,
  } = UseValid((value) => value.length >= 3);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address: enteredAddress,
        city: enteredCity,
        postalCode: enteredPostalCode,
        country: enteredCountry,
      })
    );
    navigate("/payment");
  };

  const addressInputClasses = addressInputHasError ? "invalid" : "";
  const cityInputClasses = cityInputHasError ? "invalid" : "";
  const postalCodeInputClasses = postalCodeInputHasError ? "invalid" : "";
  const countryInputClasses = countryInputHasError ? "invalid" : "";

  let isValid = false;

  if (
    enteredAddressIsValid &&
    enteredCityIsValid &&
    enteredPostalCodeIsValid &&
    enteredCountryIsValid
  ) {
    isValid = true;
  }

  useEffect(() => {
    if (Object.keys(shippingAddress).length !== 0) {
      setAddressValueHandler(shippingAddress.address);
      setCityValueHandler(shippingAddress.city);
      setPostalCodeValueHandler(shippingAddress.postalCode);
      setCountryValueHandler(shippingAddress.country);
    }
  }, [
    setAddressValueHandler,
    setCityValueHandler,
    setCountryValueHandler,
    setPostalCodeValueHandler,
    shippingAddress,
  ]);

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Input
          className={addressInputClasses}
          controlId="address"
          label="Address"
          type="text"
          value={enteredAddress}
          onInputFn={addressChangeHandler}
          onBlurFn={addressInputBlurHandler}
          errorTernary={addressInputHasError}
          errorText="must be at least 3 characters"
        />
        <Input
          className={cityInputClasses}
          controlId="city"
          label="City"
          type="text"
          value={enteredCity}
          onInputFn={cityChangeHandler}
          onBlurFn={cityInputBlurHandler}
          errorTernary={cityInputHasError}
          errorText="must be at least 3 characters"
        />
        <Input
          className={postalCodeInputClasses}
          controlId="postalCode"
          label="Postal Code"
          type="text"
          value={enteredPostalCode}
          onInputFn={postalCodeChangeHandler}
          onBlurFn={postalCodeInputBlurHandler}
          errorTernary={postalCodeInputHasError}
          errorText="must be at least 3 characters"
        />
        <Input
          className={countryInputClasses}
          controlId="country"
          label="Country"
          type="text"
          value={enteredCountry}
          onInputFn={countryChangeHandler}
          onBlurFn={countryInputBlurHandler}
          errorTernary={countryInputHasError}
          errorText="must be at least 3 characters"
        />
        <Button
          disabled={!isValid}
          className="my-3"
          type="submit"
          variant="primary"
        >
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};
export default ShippingScreen;
