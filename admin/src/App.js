import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
// import { useSelector } from "react-redux";

const AdminLayout = () => (
  <>
    <Topbar />
    <div className="container">
      <Sidebar />
      <Outlet />
    </div>
  </>
);

const App = () => {
  const persistRoot = localStorage.getItem("persist:root");
  let admin = false;

  if (persistRoot) {
    try {
      const userState = JSON.parse(persistRoot).user;
      if (userState) {
        const currentUser = JSON.parse(userState).currentUser;
        if (currentUser) {
          admin = currentUser.isAdmin;
        }
      }
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
    }
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {admin ? (
          <Route element={<AdminLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/user/:userId" element={<User />} />
            <Route path="/newUser" element={<NewUser />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/newproduct" element={<NewProduct />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
