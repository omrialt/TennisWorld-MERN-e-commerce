import { Fragment, useContext } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select, { components } from "react-select";
import ShopContext from "../../store/shop-context";

const SearchBox = () => {
  const shopCtx = useContext(ShopContext);
  const navigate = useNavigate();

  const { seeSearchBar: toggleSearchBar, toggleSearchBar: toggleFunction } =
    shopCtx;

  const productsListAll = useSelector((state) => state.productsListAll);
  const { products } = productsListAll;

  const items = products.map((item) => {
    return {
      label: item.name,
      value: item._id,
      src: item.image,
    };
  });

  const { Option } = components;
  const IconOption = (props) => (
    <Option {...props}>
      <img src={props.data.src} style={{ width: 36 }} alt={props.data.label} />
      {props.data.label}
    </Option>
  );

  const seeSearchBar = () => {
    toggleFunction();
  };

  const handleChange = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <Fragment>
      <i
        style={{ color: "white", marginRight: "8px" }}
        class="fa fa-search"
        aria-hidden="true"
        onClick={seeSearchBar}
      ></i>

      {toggleSearchBar && (
        <div className="select_nav">
          <Select
            value={null}
            options={items}
            onChange={({ value }) => handleChange(value)}
            isSearchable
            components={{ Option: IconOption }}
          />
        </div>
      )}
    </Fragment>
  );
};
export default SearchBox;
