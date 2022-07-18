import { Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  listProducts,
  listProductsAll,
} from "../store/Products/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "./Paginate";
import ProductCarousel from "../components/ProductCaruosel";
import { Link } from "react-router-dom";
import brandsArray from "../utils/brands";

const HomeScreen = () => {
  const dispatch = useDispatch();

  let { pageNumber } = useParams();
  if (+pageNumber === 0) {
    pageNumber = 1;
  }
  const productsList = useSelector((state) => state.productsList);
  let { loading, error, products, page, pages } = productsList;

  useEffect(() => {
    document.title = "TennisWorld|Home";
    window.scrollTo(0, 0);
    dispatch(listProductsAll());
    dispatch(listProducts(pageNumber));
  }, [dispatch, pageNumber]);

  return (
    <Fragment>
      <ProductCarousel />
      <h1>Our Brands</h1>
      <div className="flex_brand">
        {brandsArray.map((brand) => (
          <div className="div_brand">
            <Link to={brand.link}>
              <img className="brand_img" alt={brand.brand} src={brand.banner} />
            </Link>
          </div>
        ))}
      </div>
      <hr />
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Fragment>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} />
        </Fragment>
      )}
    </Fragment>
  );
};
export default HomeScreen;
