import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/Users/userActions";
import { useNavigate } from "react-router-dom";
import SearchBox from "./SearchBar";
import "../../styles/header.css";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header>
      <Navbar className="navbar" fixed="top" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="brand">TennisWorld</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="ms-auto">
              <LinkContainer to="/about">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
              <NavDropdown title={"Brands"} id="brands">
                <LinkContainer to={`/select/babolat/"`}>
                  <NavDropdown.Item>Babolat</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to={`/select/wilson/"`}>
                  <NavDropdown.Item>Wilson</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to={`/select/head/"`}>
                  <NavDropdown.Item>Head</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to={`/select/prince/"`}>
                  <NavDropdown.Item>Prince</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to={`/select/luxilon/"`}>
                  <NavDropdown.Item>Luxilon</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to={`/select/penn/"`}>
                  <NavDropdown.Item>Penn</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              <NavDropdown title={"Categories"} id="brands">
                <LinkContainer to={`/select/"/rackets`}>
                  <NavDropdown.Item>Rackets</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to={`/select/"/strings`}>
                  <NavDropdown.Item>Strings</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to={`/select/"/bags`}>
                  <NavDropdown.Item>Bags</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to={`/select/"/grips`}>
                  <NavDropdown.Item>Grips</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to={`/select/"/balls`}>
                  <NavDropdown.Item>Balls</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              {!userInfo?.isAdmin && (
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <div className="cart">
                      {cartItems.length > 0 && (
                        <span className="cart-items">{cartItems.length}</span>
                      )}
                      <i
                        className="fas fa-shopping-cart"
                        style={{ fontSize: "1.3em " }}
                      ></i>
                      Cart
                    </div>
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                      <i className="fa fa-user" aria-hidden="true"></i>
                      <span className="dropdown_span">Profile</span>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                    <span className="dropdown_span">Logout</span>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user "></i>
                    <span className="dropdown_span">Signin</span>
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>
                      <i className="fa fa-users" aria-hidden="true"></i>
                      <span className="dropdown_span">Users</span>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>
                      <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                      <span className="dropdown_span">Products</span>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/topsales">
                    <NavDropdown.Item>
                      <i className="fa fa-signal" aria-hidden="true"></i>
                      <span className="dropdown_span">Stats</span>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>
                      <i className="fa fa-exchange" aria-hidden="true"></i>
                      <span className="dropdown_span">Orders</span>
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
export default Header;
