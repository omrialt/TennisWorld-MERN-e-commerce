import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import Layout from "./components/Layout";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import MagazineScreen from "./screens/MagazineScreen";
import NotFound from "./screens/NotFoundScreen";
import ArticleScreen from "./screens/ArticleScreen";
import ArticleListScreen from "./screens/ArticleListScreen";
import ArticleEditScreen from "./screens/ArticleEditScreen";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="order/:id" element={<OrderScreen />} />
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/login" element={<LoginScreen />}></Route>
        <Route path="/register" element={<RegisterScreen />}></Route>
        <Route path="/profile" element={<ProfileScreen />}></Route>
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route path="/cart/:id" element={<CartScreen />} />
        <Route path="/cart/" element={<CartScreen />} />
        <Route path="/admin/userlist" element={<UserListScreen />} />
        <Route path="/admin/articlelist" element={<ArticleListScreen />} />
        <Route path="/admin/productlist" element={<ProductListScreen />} />
        <Route
          path="/admin/productlist/:pageNumber"
          element={<ProductListScreen />}
        />
        <Route path="/admin/orderlist" element={<OrderListScreen />} />

        <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
        <Route path="/admin/article/:id/edit" element={<ArticleEditScreen />} />
        <Route path="/search/:keyword" element={<HomeScreen />} />
        <Route path="/page/:pageNumber" element={<HomeScreen />} />
        <Route path="/magazine/:id" element={<ArticleScreen />} />
        <Route path="/magazine" element={<MagazineScreen />} />
        <Route path="/" element={<HomeScreen />} />
      </Routes>
    </Layout>
  );
}

export default App;
