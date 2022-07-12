import { Fragment, useContext } from "react";
import ShopContext from "../store/shop-context";
import Header from "./Header";
import Footer from "./Footer";
import { Container } from "react-bootstrap";
import SideBarMenu from "react-bootstrap-sidebar-menu";

const Layout = (props) => {
  const shopCtx = useContext(ShopContext);
  const { seeSearchBar: toggleSearchBar, toggleSearchBar: toggleSearchBarFn } =
    shopCtx;

  const toggle = () => {
    if (toggleSearchBar) {
      toggleSearchBarFn();
    }
  };
  return (
    <div>
      <Header />
      <Container className="my-5" onClick={toggle}>
        <main className="py-3">{props.children}</main>
      </Container>
      <Footer />
    </div>
  );
};
export default Layout;
