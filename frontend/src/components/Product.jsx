import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import Rating from "./Rating";
import { addToCart, addToWishList } from "../store/Cart/CartActions";
import { Fragment } from "react";
import "../styles/productCard.css";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  //product list
  const productsList = useSelector((state) => state.productsList);
  const { products } = productsList;

  //user info
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const showButtonHandler = (id) => {
    document.querySelector(`.button_${id}`).classList.remove("hidden");
    document.querySelector(`.button_${id}`).classList.add("div_animation");
  };

  const hideButtonHandler = (id) => {
    document.querySelector(`.button_${id}`).classList.add("hidden");
    document.querySelector(`.button_${id}`).classList.remove("div_animation");
  };

  const productSimilar = useSelector((state) => state.productsSimilar);

  const { productsList: listSimilar } = productSimilar;

  const productsBrandCategory = useSelector(
    (state) => state.productsBrandCategory
  );

  const { products: productsBrandCategoryList } = productsBrandCategory;

  const productsBrandOrCategory = useSelector(
    (state) => state.productsBrandOrCategory
  );

  const { products: productsBrandOrCategoryList } = productsBrandOrCategory;

  const addToCartHandler = (id) => {
    let list = products.concat(
      productsBrandCategoryList,
      productsBrandOrCategoryList,
      listSimilar.categoryList,
      listSimilar.brandList
    );
    const product = list.find((product) => product._id === id);
    Swal.fire({
      icon: "success",
      title: `${product.name} add to cart secussefuly`,
      showConfirmButton: false,
      timer: 1500,
    });
    dispatch(addToCart(product._id, 1));
  };
  const addToWishListHandler = (id) => {
    let list = products.concat(
      productsBrandCategoryList,
      productsBrandOrCategoryList,
      listSimilar.categoryList,
      listSimilar.brandList
    );
    const product = list.find((product) => product._id === id);

    Swal.fire({
      icon: "success",
      title: `${product.name} add to wishlist secussefuly`,
      showConfirmButton: false,
      timer: 1500,
    });
    dispatch(addToWishList(product._id));
  };

  return (
    <Card
      onMouseEnter={() => showButtonHandler(product._id)}
      onMouseLeave={() => hideButtonHandler(product._id)}
      className="my-3 p-3 rounded product_card"
    >
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
        <div className="center_div_btn">
          <div className={`button_${product._id} hidden div_btn`}>
            {!userInfo?.isAdmin ? (
              <Fragment>
                <Button
                  className="mx-1"
                  disabled={!product.countInStock}
                  onClick={() => addToCartHandler(product._id)}
                  id="button_home"
                  variant="primary"
                >
                  {product.countInStock ? "Add to cart" : "Out of stock"}
                </Button>
                <Button
                  className="mx-1"
                  onClick={() => addToWishListHandler(product._id)}
                  id="button_home"
                  variant="dark"
                >
                  Add To Wishlist
                </Button>
              </Fragment>
            ) : (
              <Link
                to={`/admin/product/${product._id}/edit`}
                className="btn btn-primary my-3"
              >
                Edit Product
              </Link>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;
