import { FormGroup, FormLabel, FormControl } from "react-bootstrap";
const Input = ({
  className,
  controlId,
  label,
  type,
  value,
  onInputFn,
  onBlurFn,
  errorTernary,
  errorText,
  controlType,
}) => {
  return (
    <FormGroup className={className} controlId={controlId}>
      <FormLabel>{label}</FormLabel>
      <FormControl
        placeholder={label}
        as={controlType || "input"}
        type={type}
        value={value}
        onInput={onInputFn}
        onBlur={onBlurFn}
      ></FormControl>
      {errorTernary && (
        <p className="error-text">
          {label} {errorText}
        </p>
      )}
    </FormGroup>
  );
};
export default Input;
