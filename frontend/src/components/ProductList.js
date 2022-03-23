import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    axios.get("http://localhost:5000/products?page=1&perPage=10").then((res) => {
      setProduct(res.data.data);
    }).catch((error) => {
      alert(error)
    });
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/products/${id}`);
    getProduct();
  };

  return (
    <div>
      <div className="is-size-3 has-text-weight-bold">Manage Product</div>
      <Link to="/manage/product/add" className="button is-primary mt-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {product.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
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
    </div>
  );
};

export default ProductList;
