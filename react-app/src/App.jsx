import ProductList from './pages/ProductList';
import Home from './pages/home';
import Product from './pages/Product';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from './pages/Cart';
import Success from './pages/Success';
import PrivateRoute from "./components/PrivateRoute";
import UserProfile from "./pages/UserProfile";
import Wishlist from './pages/WishList';



import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";


const App = () => {
  const user = useSelector(state => state.user.currentUser);
  useEffect(() => {
    console.log("Current user in App:", user); // Debugging log
  }, [user]);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<PrivateRoute element={Cart} />} />
        <Route path="/success" element={<Success />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
      </Routes>
    </Router>
  );
};

export default App;