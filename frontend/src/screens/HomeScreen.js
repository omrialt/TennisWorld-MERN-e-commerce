import { Fragment } from "react";
import { Row, Col, Form, FormGroup, FormLabel } from "react-bootstrap";
import Product from "../components/Product";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../store/Products/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "./Paginate";
import ProductCarousel from "../components/ProductCaruosel";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [productList, setProductList] = useState([]);

  let { keyword, pageNumber } = useParams();
  if (+pageNumber === 0) {
    pageNumber = 1;
  }

  const productsList = useSelector((state) => state.productsList);
  let { loading, error, products, page, pages } = productsList;

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
    document.title = "Proshop|Home";
    dispatch(listProducts(pageNumber));
  }, [dispatch, pageNumber]);

  return (
    <Fragment>
      <ProductCarousel />
      <h1>Latest products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Fragment>
          <Row>
            <Col md={4}>
              <FormGroup controlId="select">
                <FormLabel>Sort By</FormLabel>
                <Form.Select
                  style={{ width: "20rem" }}
                  aria-label="Default select example"
                  onChange={(e) => sortHandler(e.target.value)}
                >
                  <option value="default">Default</option>
                  <option value="plh">Price Low To High</option>
                  <option value="phl">Price High To Low</option>
                  <option value="tpr">Top Rated</option>
                  <option value="rev">Most Reviewed</option>
                </Form.Select>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </Fragment>
      )}
    </Fragment>
  );
};
export default HomeScreen;
