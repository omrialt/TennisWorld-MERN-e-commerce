import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "../components/Rating";

import "../styles/productCard.css";

const ProductInScreen = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded product_card">
      <Link to={`/product/${product._id}`}>
        <div className="center_div">
          <Card.Img
            style={{ height: "200px", width: "200px" }}
            src={product.image}
            variant="top"
          />
        </div>
      </Link>
      <Card.Body>
        <div className="center_div">
          <Link to={`product/${product._id}`}>
            <Card.Title className="title">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
        </div>
        <Card.Text>
          <Rating
            value={product.rating}
            text={`${product.numReviews} Reviews`}
          />
        </Card.Text>
        <Card.Text className="price">
          <h3>${product.price.toFixed(2)}</h3>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductInScreen;
