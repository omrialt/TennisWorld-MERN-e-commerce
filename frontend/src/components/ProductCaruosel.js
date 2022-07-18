import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import NumberFormat from "react-number-format";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../store/Products/productActions";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productsTopRated = useSelector((state) => state.productsTopRated);
  const { loading, error, products } = productsTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark mt-2 mx-5">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid rounded />
            <Carousel.Caption className="carousel-caption-sm">
              <Fragment>
                <h2>{product.name}</h2>
                <h5>
                  <span className="carousel_price">${product.price}</span>
                </h5>
              </Fragment>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
