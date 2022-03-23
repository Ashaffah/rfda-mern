import {
  BrowserRouter as Router,
  Route,
  Routes /*Switch no longer use*/,
} from "react-router-dom";
import Homepage from "./components/Homepage";
import ProductCard from "./components/ProductCard";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import DetailProduct from "./components/DetailProduct";
import { Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link
              to={`/`}
              className="navbar-item"
            >
              <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
            </Link>

            <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <Link
                to={`/`}
                className="navbar-item"
              >
                Home
              </Link>
              <Link
                to={`/product`}
                className="navbar-item"
              >
                Product
              </Link>
              <Link
                to={`/category`}
                className="navbar-item"
              >
                Caregory
              </Link>

              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                  Manage
                </a>

                <div className="navbar-dropdown">
                  <Link
                    to={`/manage/product`}
                    className="navbar-item"
                  >
                    Product
                  </Link>
                  <Link
                    to={`/manage/category`}
                    className="navbar-item"
                  >
                    Category
                  </Link>
                  <Link
                    to={`/manage/delivery`}
                    className="navbar-item"
                  >
                    Delivery
                  </Link>
                </div>
              </div>
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <a className="button is-primary">
                    <strong>Sign up</strong>
                  </a>
                  <a className="button is-light">
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <hr class="navbar-divider"></hr>
        <Routes>
          <Route exact path="/" element={<Homepage />}></Route>
        </Routes>
        <Routes>
          <Route path="/product" element={<ProductCard />}></Route>
        </Routes>
        <Routes>
          <Route path="product/detail/:name" element={<DetailProduct />}></Route>
        </Routes>
        <Routes>
          <Route path="/manage/product" element={<ProductList />}></Route>
        </Routes>
        <Routes>
          <Route path="/manage/product/add" element={<AddProduct />}></Route>
        </Routes>
        <Routes>
          <Route path="/manage/product/edit/:id" element={<EditProduct />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
