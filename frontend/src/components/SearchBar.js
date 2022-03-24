import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../style/Styles.css";

const SearchBar = () => {
  const [keySearch, setKeySearch] = useState("");
  const [product, setProduct] = useState([]);

  const getProductName = async (keySearch = null) => {
    // http://localhost:5000/products?page=1&perPage=10&category=2&delivery=5&search=Kaos
    const paramKeySearch = keySearch != null ? `&search=${keySearch}` : null;

    axios
      .get(`http://localhost:5000/products?page=1&perPage=20${paramKeySearch}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="field pt-4" style={{ width: "50%" }}>
      <p className="control">
        <input
          className="input"
          type="text"
          placeholder="Search"
          onChange={(e) => {
            getProductName(e.target.value);
            setKeySearch(e.target.value);
          }}
        />
      </p>
      {keySearch != "" &&
        <div className="box" style={{ position: "absolute", width: "47%" }}>
          {product.map((val, idx) => (
            <a href={`/product/detail/${val.code}`}>
              <div className="has-text-grey search-component" key={idx}>{val.title}</div>
            </a>
          ))}
        </div>
      }
    </div>
  );
};

export default SearchBar;
