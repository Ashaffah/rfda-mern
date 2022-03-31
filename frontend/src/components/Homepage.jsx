import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    axios
      .get("http://localhost:5000/products?page=1&perPage=18")
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="mb-6">
      <div className="has-text-centered is-size-3 has-text-weight-bold my-3">
        Product List
      </div>
      <div className="columns">
        <div className="column is-12">
          <div className="columns is-multiline">
            {product.map((val, idx) => (
              <div className="column is-2" key={idx}>
                <Link to={`/product/detail/${val.code}`}>
                  <div className="card">
                    <div className="card-image">
                      <figure className="image is-4by4">
                        <img
                          // src="https://images.tokopedia.net/img/cache/200-square/hDjmkQ/2021/7/28/16445adf-dfb5-47d9-a43e-d896937d6fc6.jpg.webp?ect=4g"
                          src={"http://localhost:5000/" + val.image}
                          alt="Placeholder image"
                        />
                      </figure>
                    </div>
                    <div className="card-content">
                      <div className="content">
                        <div className="has-text-weight-bold">{val.title}</div>
                        <div>Rp. {val.price}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="has-text-centered is-size-3 has-text-weight-bold my-3">
        Category
      </div>
      {/* </Container> */}
    </div>
  );
};

export default Homepage;
