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
      .get(`${process.env.REACT_APP_MY_BASE_URL}/category`)
      .then((res) => {
        setCategory(res.data.data);
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
      <Link to="/manage/category/add" className="button is-primary mt-2">
        Add New
      </Link>
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
      <nav
        className="pagination mb-6"
        role="navigation"
        aria-label="pagination"
      >
        <a className="pagination-previous">Previous</a>
        <a className="pagination-next">Next Page</a>
        <ul className="pagination-list">
          <li className="pagination-link">1</li>
          <li className="pagination-link is-current">2</li>
          <li className="pagination-link">3</li>
        </ul>
      </nav>
    </div>
  );
};

export default CategoryList;
