import { Fragment } from "react";
import { Row, Col, FormGroup, FormLabel, FormSelect } from "react-bootstrap";
import Product from "../components/Product";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listBrandOrCategoryProducts } from "../store/Products/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import brandsArray from "../utils/brands";

const BrandOrCategoryScreen = () => {
  const [productList, setProductList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const { brand, category } = useParams();

  const brandUpper = brand[0].toUpperCase() + brand.slice(1);
  const categoryUpper = category[0].toUpperCase() + category.slice(1);

  const brandBanner = brandsArray.filter(
    (brand) => brand.brand === brandUpper
  )[0];

  const productsBrandOrCategory = useSelector(
    (state) => state.productsBrandOrCategory
  );

  const { loading, error, products } = productsBrandOrCategory;

  const sortHandler = (value) => {
    let sortedList;

    if (value === "plh") {
      sortedList = products.sort((a, b) => a.price - b.price);
    }
    if (value === "phl") {
      sortedList = products.sort((a, b) => b.price - a.price);
    }
    if (value === "tpr") {
      sortedList = products.sort((a, b) => b.rating - a.rating);
    }
    if (value === "rev") {
      sortedList = products.sort((a, b) => b.numReviews - a.numReviews);
    }
    if (value === "default") {
      sortedList = products.sort(
        (a, b) =>
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
      );
    }
    setProductList(sortedList);
    setProductList([]);
  };

  useEffect(() => {
    if (brandUpper.length === 1) {
      document.title = `TennisWorld|${categoryUpper}`;
      dispatch(listBrandOrCategoryProducts("category", categoryUpper));
    }
    if (categoryUpper.length === 1) {
      document.title = `TennisWorld|${brandUpper}`;
      dispatch(listBrandOrCategoryProducts("brand", brandUpper));
    }
    if (brandUpper.length === 1 && categoryUpper.length === 1) {
      setErrorMessage("Invalid request,please try again");
    }
  }, [brand.length, brandUpper, category.length, categoryUpper, dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : errorMessage ? (
    <Message variant="danger">{errorMessage}</Message>
  ) : (
    <Fragment>
      <Row>
        <Col>
          <h1>
            {brandUpper.length === 1 ? categoryUpper : brandUpper} Products
          </h1>
        </Col>
        {brandUpper.length > 1 && (
          <Col>
            <img
              className="brand_img_big"
              alt={brandBanner.brand}
              src={brandBanner.banner}
            />
          </Col>
        )}
      </Row>
      <Row>
        <Col md={4}>
          <FormGroup controlId="select">
            <FormLabel>Sort By</FormLabel>
            <FormSelect
              style={{ width: "20rem" }}
              aria-label="Default select example"
              onChange={(e) => sortHandler(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="plh">Price Low To High</option>
              <option value="phl">Price High To Low</option>
              <option value="tpr">Top Rated</option>
              <option value="rev">Most Reviewed</option>
            </FormSelect>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        {products.length > 0 &&
          products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
      </Row>
    </Fragment>
  );
};
export default BrandOrCategoryScreen;
