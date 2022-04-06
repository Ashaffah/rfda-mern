import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [product, setProduct] = useState([]);
  const [param, setParam] = useState({
    perPage: 10,
    page: 1,
  });
  const [pagination, setPagination] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async (page = 1, perPage = 10) => {
    const paramPage = page !== 1 ? page : "";

    // console.log("paramPage", paramPage)

    axios
      .get(
        `${process.env.REACT_APP_MY_BASE_URL}/products?page=${paramPage}&perPage=${perPage}`
      )
      .then((res) => {
        setProduct(res.data.data);

        const countData = Math.ceil(res.data.total_data / perPage);
        let dataPagination = [];

        for (let i = 0; i < countData; i++) {
          dataPagination.push(i);
        }
        setPagination(dataPagination);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const deleteProduct = async (id) => {
    await axios.delete(`${process.env.REACT_APP_MY_BASE_URL}/products/${id}`);
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
      {pagination.length > 1 ? (
        <nav class="pagination mb-6" role="navigation" aria-label="pagination">
          {param.page > 1 ? (
            <a
              class="pagination-previous"
              onClick={() => {
                getProduct(param.page - 1, param.perPage);
                setParam((prevState) => ({
                  ...prevState,
                  page: param.page - 1,
                }));
              }}
            >
              Previous
            </a>
          ) : (
            <a class="pagination-previous">Previous</a>
          )}

          {param.page < pagination.length ? (
            <a
              class="pagination-next"
              onClick={() => {
                getProduct(param.page + 1, param.perPage);
                setParam((prevState) => ({
                  ...prevState,
                  page: param.page + 1,
                }));
              }}
            >
              Next page
            </a>
          ) : (
            <a class="pagination-next">Next page</a>
          )}

          <ul class="pagination-list">
            {pagination.map((val, idx) => (
              <li key={idx}>
                <div
                  style={
                    param.page === idx + 1
                      ? {
                          backgroundColor: "#3F6BC5",
                          boerderColor: "#3F6BC5",
                        }
                      : {}
                  }
                  className={
                    param.page === idx + 1
                      ? "pagination-link is-current"
                      : "pagination-link"
                  }
                  onClick={() => {
                    getProduct(idx + 1, param.perPage);
                    setParam((prevState) => ({
                      ...prevState,
                      page: idx + 1,
                    }));
                  }}
                >
                  {idx + 1}
                </div>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
};

export default ProductList;
