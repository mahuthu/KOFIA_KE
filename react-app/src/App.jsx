import ProductList from './pages/ProductList';
import Home from './pages/home';
import Product from './pages/Product';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from './pages/Cart';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";


const App = () => {
  const user = true;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
      </Routes>
    </Router>
  );
};
export default App;
