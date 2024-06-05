import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";

function App() {
  const admin = useSelector((state) => state.user.currentUser?.isAdmin);

  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        {admin && (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/users" component={UserList} />
                <Route path="/user/:userId" component={User} />
                <Route path="/newUser" component={NewUser} />
                <Route path="/products" component={ProductList} />
                <Route path="/product/:productId" component={Product} />
                <Route path="/newproduct" component={NewProduct} />
                <Redirect from="*" to="/" />
              </Switch>
            </div>
          </>
        )}
        {!admin && <Redirect to="/login" />}
      </Switch>
    </Router>
  );
}

export default App;