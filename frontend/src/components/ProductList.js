import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [product, setProduct] = useState([]);
  const [param, setParam] = useState({
    perPage: 10,
    page: 1,
  });

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async (page = 1, perPage = 10) => {

    axios
      .get(`http://localhost:5000/products?page=${page}&perPage=${perPage}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/products/${id}`);
    getProduct();
  };

  return (
    <div>
      <div className="is-size-3 has-text-weight-bold">Manage Product</div>
      <div>
        <Link to="/manage/product/add" className="button is-primary mt-2">
          Add New
        </Link>
      </div>
      <div style={{ textAlign: "right" }}>
        <div class="select">
          <select
            onChange={(e) => {
              setParam((prevState) => ({
                ...prevState,
                perPage: e.target.value,
              }));
              getProduct(1, e.target.value);
            }}
          >
            <option value={"10"}>10</option>
            <option value={"25"}>25</option>
            <option value={"50"}>50</option>
          </select>
        </div>
      </div>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Price</th>
            <th>Selling Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {product.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.selling_price}</td>
              <td>
                <Link
                  to={`/product/detail/${product.code}`}
                  className="button is-small is-warning"
                >
                  View
                </Link>
                <Link
                  to={`/manage/product/edit/${product.id}`}
                  className="button is-small is-info mx-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav class="pagination mb-6" role="navigation" aria-label="pagination">
        <a class="pagination-previous">Previous</a>
        <a class="pagination-next">Next page</a>
        <ul class="pagination-list">
          <li>
            <a class="pagination-link">1</a>
          </li>
          <li>
            <a class="pagination-link">2</a>
          </li>
          <li>
            <a class="pagination-link">3</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProductList;
