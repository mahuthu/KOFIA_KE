import ProductList from './pages/ProductList';
import Home from './pages/home';
import Product from './pages/Product';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from './pages/Cart';
import Success from './pages/Success';

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
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
      </Routes>
    </Router>
  );
};
export default App;
