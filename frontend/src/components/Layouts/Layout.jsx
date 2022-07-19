import { useContext } from "react";
import ShopContext from "../../store/shop-context";
import Header from "./Header";
import Footer from "./Footer";
import SideNav from "./SideNav";
import { Container } from "react-bootstrap";

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
      <div style={{ display: "flex" }}>
        <div className="sidenav_div">
          <SideNav />
        </div>
        <div className="main_container">
          <Container className="my-5" onClick={toggle}>
            <main className="py-3">{props.children}</main>
            <Footer />
          </Container>
        </div>
      </div>
    </div>
  );
};
export default Layout;
