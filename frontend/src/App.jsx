import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import Layout from "./components/Layouts/Layout";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/Admin/UserListScreen";
import ProductListScreen from "./screens/Admin/ProductListScreen";
import ProductEditScreen from "./screens/Admin/ProductEditScreen";
import OrderListScreen from "./screens/Admin/OrderListScreen";
import NotFound from "./screens/NotFoundScreen";
import BrandCategoryScreen from "./screens/BrandCaregoryScreen";
import BrandOrCategoryScreen from "./screens/BrandOrCategoryScreen";
import ProductsStatsScreen from "./screens/Admin/ProductsStatsScreen";
import AboutScreen from "./screens/AboutScreen";
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
        <Route path="/about" element={<AboutScreen />}></Route>
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route path="/cart/:id" element={<CartScreen />} />
        <Route path="/cart/" element={<CartScreen />} />
        <Route path="/admin/userlist" element={<UserListScreen />} />
        <Route path="/admin/productlist" element={<ProductListScreen />} />
        <Route
          path="/admin/productlist/:pageNumber"
          element={<ProductListScreen />}
        />
        <Route path="/admin/orderlist" element={<OrderListScreen />} />
        <Route path="/admin/topsales" element={<ProductsStatsScreen />} />
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
        <Route path="/search/:keyword" element={<HomeScreen />} />
        <Route path="/page/:pageNumber" element={<HomeScreen />} />
        <Route
          path="/choose/:brand/:category"
          element={<BrandCategoryScreen />}
        />
        <Route
          path="/select/:brand/:category"
          element={<BrandOrCategoryScreen />}
        />
        <Route path="/" element={<HomeScreen />} />
      </Routes>
    </Layout>
  );
}

export default App;
