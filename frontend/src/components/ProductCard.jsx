import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CurrencyFormat from "react-currency-format";

const ProductCard = () => {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [dataFilter, setDataFilter] = useState({ category: {} });

  useEffect(() => {
    getProduct();
    getCategory();
  }, []);

  const getProduct = async (category = null) => {

    // http://localhost:5000/products?page=1&perPage=10&category=2&delivery=5&search=Kaos

    const paramCategory = category != null ? `&category=${category}` : null;

    axios
      .get(`http://localhost:5000/products?page=1&perPage=10${paramCategory}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const getCategory = async () => {
    axios
      .get("http://localhost:5000/category")
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="my-6">
      <div className="columns">
        <div className="column is-2">
          <div className="has-text-weight-bold is-size-4 has-text-centered mb-3">
            Filter
          </div>
          <div className="card p-4">
            <div className="has-text-weight-bold mb-2">Kategori</div>
            {category.map((val, idx) => (
              <div className={dataFilter.category.name == val.name ? 'has-text-weight-bold' : null} key={idx} onClick={() => {
                getProduct(val.id);
                setDataFilter(prevState => ({
                  ...prevState,
                  category: val
                }));
              }}>
                {val.name}
              </div>
            ))}
            <div className="has-text-weight-bold my-2">Pengiriman</div>
            <div className="">Filter</div>
            <div className="">Filter</div>
            <div className="">Filter</div>
            <div className="">Filter</div>
          </div>
        </div>
        <div className="column is-10">
          <div className="columns is-multiline">
            {product.map((val, idx) => (
              <div className="column is-3" key={idx}>
                <Link to={`/product/detail/${val.code}`}>
                  <div className="card" style={{ height: "100%" }}>
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
                        {val.selling_price > 0 ? (
                          <>
                            <div
                              style={{
                                display: "flex",
                              }}
                            >
                              <div
                                className="has-background-success px-2 mr-2 is-size-7 has-text-white"
                                style={{
                                  borderRadius: "20%",
                                  textAlign: "center",
                                }}
                              >
                                {(
                                  (val.selling_price / val.price) *
                                  100
                                ).toFixed(0)}
                                %
                              </div>
                              <div
                                style={{
                                  textDecorationLine: "line-through",
                                  textDecorationStyle: "solid",
                                }}
                              >
                                <CurrencyFormat
                                  value={val.price}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"Rp. "}
                                />
                              </div>
                            </div>
                            <div
                              className="has-text-weight-bold"
                              style={{
                                color: "#fa591d",
                              }}
                            >
                              <CurrencyFormat
                                value={val.selling_price}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"Rp. "}
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <div
                              style={{
                                display: "flex",
                              }}
                            >
                              <div
                                className="has-text-weight-bold"
                                style={{
                                  color: "#fa591d",
                                }}
                              >
                                <CurrencyFormat
                                  value={val.price}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"Rp. "}
                                />
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* </Container> */}
    </div>
  );
};

export default ProductCard;
