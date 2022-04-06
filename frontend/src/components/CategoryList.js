import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [category, setCategory] = useState([]);
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
    console.log("OKE", process.env);
    axios
      .get(
        `${process.env.REACT_APP_MY_BASE_URL}/category?page=${paramPage}&perPage=${perPage}`
      )
      .then((res) => {
        setCategory(res.data.data);
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
    await axios.delete(`${process.env.REACT_APP_MY_BASE_URL}/category/${id}`);
    getProduct();
  };

  return (
    <div>
      <div className="is-size-3 has-text-weight-bold">Manage Category</div>
      {console.log("PAGE", param.page)}
      <div>
        <Link to="/manage/category/add" className="button is-primary mt-2">
          Add New
        </Link>
      </div>
      <div style={{ textAlign: "right" }}>
        <div className="select">
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
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {category.map((category, index) => (
            <tr key={category.id}>
              <td>{index + 1}</td>
              <td>{category.name}</td>
              <td>
                <Link
                  to={`/manage/category/edit/${category.id}`}
                  className="button is-small is-info mx-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProduct(category.id)}
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
        <nav
          className="pagination mb-6"
          role="navigation"
          aria-label="pagination"
        >
          {param.page > 1 ? (
            <a
              className="pagination-previous"
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
            <a className="pagination-previous">Previous</a>
          )}
          {param.page < pagination.length ? (
            <a
              className="pagination-next"
              onClick={() => {
                getProduct(param.page + 1, param.perPage);
                setParam((prevState) => ({
                  ...prevState,
                  page: param.page + 1,
                }));
              }}
            >
              Next Page
            </a>
          ) : (
            <a className="pagination-next">Next page</a>
          )}
          <ul className="pagination-list">
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

export default CategoryList;
