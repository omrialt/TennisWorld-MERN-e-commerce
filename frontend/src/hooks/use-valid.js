import { useState } from "react";

const UseValid = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const enteredValueIsValid = validateValue(enteredValue);

  const hasError = !enteredValueIsValid && isTouched;

  const valueChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };
  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    hasError,
    isValid: enteredValueIsValid,
    valueChangeHandler,
    inputBlurHandler,
    reset,
    setEnteredValue,
  };
};

export default UseValid;
