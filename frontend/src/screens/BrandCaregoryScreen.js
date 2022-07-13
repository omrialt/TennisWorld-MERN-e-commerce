import { Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listBrandCategoryProducts } from "../store/Products/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

const BrandCategoryScreen = () => {
  const dispatch = useDispatch();

  const { brand, category } = useParams();
  const brandUpper = brand[0].toUpperCase() + brand.slice(1);
  const categoryUpper = category[0].toUpperCase() + category.slice(1);

  const productsBrandCategory = useSelector(
    (state) => state.productsBrandCategory
  );

  const { loading, error, products } = productsBrandCategory;

  useEffect(() => {
    document.title = `${brandUpper} ${categoryUpper}`;
    dispatch(listBrandCategoryProducts(brandUpper, categoryUpper));
  }, [brand.length, brandUpper, category.length, categoryUpper, dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Fragment>
      <h1>
        {brandUpper} {categoryUpper} Products
      </h1>
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
export default BrandCategoryScreen;
