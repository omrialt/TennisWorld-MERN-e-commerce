import { Navbar, Container, Nav, NavDropdown, NavLink } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/Users/userActions";
import { useNavigate } from "react-router-dom";
import SearchBox from "./SearchBar";

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
      <Navbar
        className="navbar"
        fixed="top"
        bg="dark"
        variant="dark"
        expand="lg"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="brand">Proshop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="ms-auto">
              <LinkContainer to="/magazine">
                <NavLink>
                  <i class="fa-solid fa-newspaper"></i>Magazine
                </NavLink>
              </LinkContainer>
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
                      <i class="fa fa-user" aria-hidden="true"></i>Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    <i class="fa fa-sign-out" aria-hidden="true"></i> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user "></i>Sign in
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>
                      <i class="fa fa-users" aria-hidden="true"></i>Users
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>
                      <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                      Products
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>
                      <i class="fa fa-exchange" aria-hidden="true"></i>Orders
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/articlelist">
                    <NavDropdown.Item>
                      <i class="fa fa-newspaper" aria-hidden="true"></i>Articles
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
