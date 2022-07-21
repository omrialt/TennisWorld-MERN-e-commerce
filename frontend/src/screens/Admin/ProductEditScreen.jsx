import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
  Row,
  Col,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import {
  listProductDetails,
  updateProduct,
} from "../../store/Products/productActions";
import { PRODUCT_UPDATE_RESET } from "../../store/Products/productConstants";
import UseValid from "../../hooks/use-valid";
import Input from "../../utils/Input";

const ProductEditScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState("");
  const [productCategory, setProductCategory] = useState("Balls");

  const { id } = useParams();

  const {
    value: enteredName,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    setEnteredValue: setNameValueHandler,
  } = UseValid((value) => value.length >= 3);
  const {
    value: enteredPrice,
    hasError: priceInputHasError,
    valueChangeHandler: priceChangeHandler,
    inputBlurHandler: priceInputBlurHandler,
    setEnteredValue: setPriceValueHandler,
  } = UseValid((value) => isFinite(value) && +value >= 0 && value.length > 0);
  const {
    value: enteredBrand,
    hasError: brandInputHasError,
    valueChangeHandler: brandChangeHandler,
    inputBlurHandler: brandInputBlurHandler,
    setEnteredValue: setBrandValueHandler,
  } = UseValid((value) => value.length >= 3);
  const {
    value: enteredCountInStock,
    hasError: countInStockInputHasError,
    valueChangeHandler: countInStockChangeHandler,
    inputBlurHandler: countInStockInputBlurHandler,
    setEnteredValue: setCountInStockValueHandler,
  } = UseValid((value) => isFinite(value) && +value >= 0 && value.length > 0);
  const {
    value: enteredCategory,
    hasError: categoryInputHasError,
    valueChangeHandler: categoryChangeHandler,
    inputBlurHandler: categoryInputBlurHandler,
    setEnteredValue: setCategoryValueHandler,
  } = UseValid((value) => value.length >= 3);

  const {
    value: enteredDescription,
    hasError: descriptionInputHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionInputBlurHandler,
    setEnteredValue: setDescriptionValueHandler,
  } = UseValid((value) => value.length >= 3);
  const {
    value: enteredColor,
    hasError: colorInputHasError,
    valueChangeHandler: colorChangeHandler,
    inputBlurHandler: colorInputBlurHandler,
    setEnteredValue: setColorValueHandler,
  } = UseValid((value) => value.length >= 3);
  const {
    value: enteredGauge,
    hasError: gaugeInputHasError,
    valueChangeHandler: gaugeChangeHandler,
    inputBlurHandler: gaugeInputBlurHandler,
    setEnteredValue: setGaugeValueHandler,
  } = UseValid((value) => value.length >= 3);
  const {
    value: enteredComposition,
    hasError: compositionInputHasError,
    valueChangeHandler: compositionChangeHandler,
    inputBlurHandler: compositionInputBlurHandler,
    setEnteredValue: setCompositionValueHandler,
  } = UseValid((value) => value.length >= 3);
  const {
    value: enteredLength,
    hasError: lengthInputHasError,
    valueChangeHandler: lengthChangeHandler,
    inputBlurHandler: lengthInputBlurHandler,
    setEnteredValue: setLengthValueHandler,
  } = UseValid((value) => value.length >= 3);
  const {
    value: enteredHeadSize,
    hasError: headSizeInputHasError,
    valueChangeHandler: headSizeChangeHandler,
    inputBlurHandler: headSizeInputBlurHandler,
    setEnteredValue: setHeadSizeValueHandler,
  } = UseValid((value) => value.length >= 3);
  const {
    value: enteredBalance,
    hasError: balanceInputHasError,
    valueChangeHandler: balanceChangeHandler,
    inputBlurHandler: balanceInputBlurHandler,
    setEnteredValue: setBalanceValueHandler,
  } = UseValid((value) => value.length >= 3);
  const {
    value: enteredWeight,
    hasError: weightInputHasError,
    valueChangeHandler: weightChangeHandler,
    inputBlurHandler: weightInputBlurHandler,
    setEnteredValue: setWeightValueHandler,
  } = UseValid((value) => value.length >= 3);
  const {
    value: enteredSuitableFor,
    hasError: suitableForInputHasError,
    valueChangeHandler: suitableForChangeHandler,
    inputBlurHandler: suitableForInputBlurHandler,
    setEnteredValue: setSuitableForValueHandler,
  } = UseValid((value) => isFinite(value) && +value >= 0 && value.length > 0);
  const {
    value: enteredDimension,
    hasError: dimensionInputHasError,
    valueChangeHandler: dimensionChangeHandler,
    inputBlurHandler: dimensionInputBlurHandler,
    setEnteredValue: setDimensionValueHandler,
  } = UseValid((value) => value.length >= 3);
  const {
    value: enteredThickness,
    hasError: thicknessInputHasError,
    valueChangeHandler: thicknessChangeHandler,
    inputBlurHandler: thicknessInputBlurHandler,
    setEnteredValue: setThicknessValueHandler,
  } = UseValid((value) => value.length >= 3);

  const nameInputClasses = nameInputHasError ? "invalid" : "";
  const priceInputClasses = priceInputHasError ? "invalid" : "";
  const brandInputClasses = brandInputHasError ? "invalid" : "";
  const categoryInputClasses = categoryInputHasError ? "invalid" : "";
  const countInStockInputClasses = countInStockInputHasError ? "invalid" : "";
  const colorInputClasses = colorInputHasError ? "invalid" : "";
  const gaugeInputClasses = gaugeInputHasError ? "invalid" : "";
  const compositionInputClasses = compositionInputHasError ? "invalid" : "";
  const lengthInputClasses = lengthInputHasError ? "invalid" : "";
  const headSizeInputClasses = headSizeInputHasError ? "invalid" : "";
  const balanceInputClasses = balanceInputHasError ? "invalid" : "";
  const weightInputClasses = weightInputHasError ? "invalid" : "";
  const suitableForInputClasses = suitableForInputHasError ? "invalid" : "";
  const dimensionInputClasses = dimensionInputHasError ? "invalid" : "";
  const thicknessInputClasses = thicknessInputHasError ? "invalid" : "";
  const descriptionInputClasses = descriptionInputHasError ? "invalid" : "";

  const categoryHandler = (value) => {
    setProductCategory(value);
  };

  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;

  //update product detail
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (err) {
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (productCategory === "Balls") {
      dispatch(
        updateProduct({
          _id: id,
          name: enteredName,
          price: enteredPrice,
          image,
          brand: enteredBrand,
          category: enteredCategory,
          countInStock: enteredCountInStock,
          description: enteredDescription,
        })
      );
    }
    if (productCategory === "Rackets") {
      dispatch(
        updateProduct({
          _id: id,
          name: enteredName,
          price: enteredPrice,
          image,
          brand: enteredBrand,
          category: enteredCategory,
          countInStock: enteredCountInStock,
          description: enteredDescription,
          headSize: enteredHeadSize,
          length: enteredLength,
          weight: enteredWeight,
          balance: enteredBalance,
          composition: enteredComposition,
          color: enteredColor,
        })
      );
    }
    if (productCategory === "Strings") {
      dispatch(
        updateProduct({
          _id: id,
          name: enteredName,
          price: enteredPrice,
          image,
          brand: enteredBrand,
          category: enteredCategory,
          countInStock: enteredCountInStock,
          description: enteredDescription,
          length: enteredLength,
          composition: enteredComposition,
          color: enteredColor,
          gauge: enteredGauge,
        })
      );
    }
    if (productCategory === "Grips") {
      dispatch(
        updateProduct({
          _id: id,
          name: enteredName,
          price: enteredPrice,
          image,
          brand: enteredBrand,
          category: enteredCategory,
          countInStock: enteredCountInStock,
          description: enteredDescription,
          color: enteredColor,
          thickness: enteredThickness,
        })
      );
    }
    if (productCategory === "Bags") {
      dispatch(
        updateProduct({
          _id: id,
          name: enteredName,
          price: enteredPrice,
          image,
          brand: enteredBrand,
          category: enteredCategory,
          countInStock: enteredCountInStock,
          description: enteredDescription,
          color: enteredColor,
          dimension: enteredDimension,
          suitableFor: enteredSuitableFor,
        })
      );
    }
  };

  useEffect(() => {
    document.title = "TennisWorld|Edit Product";
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/productlist");
    } else {
      if (!product.name || product._id !== id) {
        dispatch(listProductDetails(id));
      } else {
        setProductCategory(product.category);
        setNameValueHandler(product.name);
        setBrandValueHandler(product.brand);
        setPriceValueHandler(product.price);
        setDescriptionValueHandler(product.description);
        setCategoryValueHandler(product.category);
        setCountInStockValueHandler(product.countInStock);
        setImage(product.image);
        if (product.category === "Rackets") {
          setHeadSizeValueHandler(product.headSize);
          setLengthValueHandler(product.length);
          setWeightValueHandler(product.weight);
          setBalanceValueHandler(product.balance);
          setCompositionValueHandler(product.composition);
          setColorValueHandler(product.color);
        }
        if (product.category === "Strings") {
          setCompositionValueHandler(product.composition);
          setColorValueHandler(product.color);
          setLengthValueHandler(product.length);
          setGaugeValueHandler(product.gauge);
        }
        if (product.category === "Grips") {
          setColorValueHandler(product.color);
          setThicknessValueHandler(product.thickness);
        }
        if (product.category === "Bags") {
          setColorValueHandler(product.color);
          setDimensionValueHandler(product.dimension);
          setSuitableForValueHandler(product.suitableFor);
        }
      }
    }
  }, [
    dispatch,
    id,
    product,
    successUpdate,
    navigate,
    setNameValueHandler,
    setBrandValueHandler,
    setPriceValueHandler,
    setDescriptionValueHandler,
    setCategoryValueHandler,
    setCountInStockValueHandler,
    setHeadSizeValueHandler,
    setLengthValueHandler,
    setWeightValueHandler,
    setBalanceValueHandler,
    setCompositionValueHandler,
    setColorValueHandler,
    setGaugeValueHandler,
    setThicknessValueHandler,
    setDimensionValueHandler,
    setSuitableForValueHandler,
  ]);

  let isDisabled = true;

  if (
    !nameInputHasError &&
    !priceInputHasError &&
    !countInStockInputHasError &&
    !brandInputHasError &&
    !categoryInputHasError &&
    !descriptionInputHasError
  ) {
    isDisabled = false;
  }
  return (
    <Fragment>
      <Link to="/admin/productlist" className="btn btn-success my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit {product.name} Details</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Fragment>
            <Row>
              <Col md={4}>
                <FormGroup controlId="select">
                  <FormLabel>Choose Category</FormLabel>
                  <Form.Select
                    style={{ width: "20rem" }}
                    aria-label="Default select example"
                    onChange={(e) => categoryHandler(e.target.value)}
                  >
                    <option value="Balls">Choose..</option>
                    <option value="Balls">Balls</option>
                    <option value="Rackets">Racket</option>
                    <option value="Strings">String</option>
                    <option value="Bags">Bags</option>
                    <option value="Grips">Grips</option>
                  </Form.Select>
                </FormGroup>
              </Col>
            </Row>
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
                className={priceInputClasses}
                controlId="price"
                label="Price"
                type="number"
                value={enteredPrice}
                onInputFn={priceChangeHandler}
                onBlurFn={priceInputBlurHandler}
                errorTernary={priceInputHasError}
                errorText="must be a valid number"
              />
              <Input
                className={countInStockInputClasses}
                controlId="countInStock"
                label="Count In Stock"
                type="number"
                value={enteredCountInStock}
                onInputFn={countInStockChangeHandler}
                onBlurFn={countInStockInputBlurHandler}
                errorTernary={countInStockInputHasError}
                errorText="must be a valid number"
              />
              <FormGroup controlId="image">
                <FormLabel>Image</FormLabel>
                <FormControl
                  type="text"
                  placeholder="Enter image url"
                  value={image}
                  onChange={(e) => {
                    setImage(e.target.value);
                  }}
                ></FormControl>
                <FormControl
                  controlId="image"
                  type="file"
                  label="Choose file"
                  accept=".jpg,.jpeg,.png"
                  onChange={uploadFileHandler}
                ></FormControl>
                {uploading && <Loader />}
              </FormGroup>
              <Input
                className={brandInputClasses}
                controlId="brand"
                label="Brand"
                type="text"
                value={enteredBrand}
                onInputFn={brandChangeHandler}
                onBlurFn={brandInputBlurHandler}
                errorTernary={brandInputHasError}
                errorText="must be at least 3 characters"
              />
              <Input
                className={categoryInputClasses}
                controlId="category"
                label="Category"
                type="text"
                value={enteredCategory}
                onInputFn={categoryChangeHandler}
                onBlurFn={categoryInputBlurHandler}
                errorTernary={categoryInputHasError}
                errorText="must be at least 3 characters"
              />

              <Input
                className={descriptionInputClasses}
                controlId="description"
                label="Description"
                type="text"
                value={enteredDescription}
                onInputFn={descriptionChangeHandler}
                onBlurFn={descriptionInputBlurHandler}
                errorTernary={descriptionInputHasError}
                errorText="must be at least 3 characters"
                controlType="textarea"
              />
              {productCategory !== "Balls" && (
                <Input
                  className={colorInputClasses}
                  controlId="color"
                  label="Color"
                  type="text"
                  value={enteredColor}
                  onInputFn={colorChangeHandler}
                  onBlurFn={colorInputBlurHandler}
                  errorTernary={colorInputHasError}
                  errorText="must be at least 3 characters"
                />
              )}

              {productCategory === "Strings" ? (
                <Fragment>
                  <Input
                    className={gaugeInputClasses}
                    controlId="gauge"
                    label="Gauge"
                    type="text"
                    value={enteredGauge}
                    onInputFn={gaugeChangeHandler}
                    onBlurFn={gaugeInputBlurHandler}
                    errorTernary={gaugeInputHasError}
                    errorText="must be at least 3 characters"
                  />

                  <Input
                    className={compositionInputClasses}
                    controlId="composition"
                    label="Composition"
                    type="text"
                    value={enteredComposition}
                    onInputFn={compositionChangeHandler}
                    onBlurFn={compositionInputBlurHandler}
                    errorTernary={compositionInputHasError}
                    errorText="must be at least 3 characters"
                  />
                  <Input
                    className={lengthInputClasses}
                    controlId="length"
                    label="Length"
                    type="text"
                    value={enteredLength}
                    onInputFn={lengthChangeHandler}
                    onBlurFn={lengthInputBlurHandler}
                    errorTernary={lengthInputHasError}
                    errorText="must be at least 3 characters"
                  />
                </Fragment>
              ) : productCategory === "Rackets" ? (
                <Fragment>
                  <Input
                    className={headSizeInputClasses}
                    controlId="headSize"
                    label="Head Size"
                    type="text"
                    value={enteredHeadSize}
                    onInputFn={headSizeChangeHandler}
                    onBlurFn={headSizeInputBlurHandler}
                    errorTernary={headSizeInputHasError}
                    errorText="must be at least 3 characters"
                  />
                  <Input
                    className={balanceInputClasses}
                    controlId="balance"
                    label="Balance"
                    type="text"
                    value={enteredBalance}
                    onInputFn={balanceChangeHandler}
                    onBlurFn={balanceInputBlurHandler}
                    errorTernary={balanceInputHasError}
                    errorText="must be at least 3 characters"
                  />

                  <Input
                    className={weightInputClasses}
                    controlId="weight"
                    label="Weight"
                    type="text"
                    value={enteredWeight}
                    onInputFn={weightChangeHandler}
                    onBlurFn={weightInputBlurHandler}
                    errorTernary={weightInputHasError}
                    errorText="must be at least 3 characters"
                  />
                  <Input
                    className={compositionInputClasses}
                    controlId="composition"
                    label="Composition"
                    type="text"
                    value={enteredComposition}
                    onInputFn={compositionChangeHandler}
                    onBlurFn={compositionInputBlurHandler}
                    errorTernary={compositionInputHasError}
                    errorText="must be at least 3 characters"
                  />
                  <Input
                    className={lengthInputClasses}
                    controlId="length"
                    label="Length"
                    type="text"
                    value={enteredLength}
                    onInputFn={lengthChangeHandler}
                    onBlurFn={lengthInputBlurHandler}
                    errorTernary={lengthInputHasError}
                    errorText="must be at least 3 characters"
                  />
                </Fragment>
              ) : productCategory === "Bags" ? (
                <Fragment>
                  <Input
                    className={suitableForInputClasses}
                    controlId="suitableFor"
                    label="Suitable For"
                    type="number"
                    value={enteredSuitableFor}
                    onInputFn={suitableForChangeHandler}
                    onBlurFn={suitableForInputBlurHandler}
                    errorTernary={suitableForInputHasError}
                    errorText="must be a valid number"
                  />
                  <Input
                    className={dimensionInputClasses}
                    controlId="dimension"
                    label="Dimension"
                    type="text"
                    value={enteredDimension}
                    onInputFn={dimensionChangeHandler}
                    onBlurFn={dimensionInputBlurHandler}
                    errorTernary={dimensionInputHasError}
                    errorText="must be at least 3 characters"
                  />
                </Fragment>
              ) : productCategory === "Grips" ? (
                <Input
                  className={thicknessInputClasses}
                  controlId="thickness"
                  label="Thickness"
                  type="text"
                  value={enteredThickness}
                  onInputFn={thicknessChangeHandler}
                  onBlurFn={thicknessInputBlurHandler}
                  errorTernary={thicknessInputHasError}
                  errorText="must be at least 3 characters"
                />
              ) : (
                ""
              )}

              <Button
                disabled={isDisabled}
                className="my-3"
                type="submit"
                variant="primary"
              >
                Update
              </Button>
            </Form>
          </Fragment>
        )}
      </FormContainer>
    </Fragment>
  );
};
export default ProductEditScreen;
