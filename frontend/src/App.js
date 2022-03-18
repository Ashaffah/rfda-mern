import {
  BrowserRouter as Router,
  Route,
  Routes /*Switch no longer use*/,
} from "react-router-dom";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import EditProduct from "./components/EditProduct";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <div className="container">
        <div className="columns">
          <div className="column">
            {/* <Switch> //Use Routes instead of Switch || Switch tidak lagi digunakan oleh react dom v6 keatas
              <Route exact path="/">
              <ProductList />
              </Route>
              <Route path="/add">
              <AddProduct />
              </Route>
            </Switch> */}
            <Routes>
              <Route exact path="/" element={<Login />}></Route>
            </Routes>
            {/* <Routes>
              <Route path="/register" element={<Register />}></Route>
            </Routes> */}
            <Routes>
              <Route path="/products" element={<ProductList />}></Route>
            </Routes>
            <Routes>
              <Route path="/add" element={<AddProduct />}></Route>
            </Routes>
            <Routes>
              <Route path="/edit/:id" element={<EditProduct />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
