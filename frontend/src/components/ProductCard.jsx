import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CurrencyFormat from "react-currency-format";

const ProductCard = () => {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [dataFilter, setDataFilter] = useState({
    category: {},
    delivery: {},
    page: 1,
  });
  const [delivery, setDelivery] = useState([]);
  const [pagination, setPagination] = useState([]);

  useEffect(() => {
    getProduct();
    getCategory();
    getDelivery();
  }, []);

  const getProduct = async (category = null, delivery = null, page = null) => {
    // http://localhost:5000/products?page=1&perPage=10&category=2&delivery=5&search=Kaos

    const paramCategory = category != null ? `&category=${category}` : "";
    const paramDelivery = delivery != null ? `&delivery=${delivery}` : "";
    const paramPage = page != null ? `page=${page}` : "";
    // console.log("category", category);
    // console.log("delivery", delivery);
    axios
      .get(
        `http://localhost:5000/products?${paramPage}&perPage=12${paramCategory}${paramDelivery}`
      )
      .then((res) => {
        setProduct(res.data.data);

        const countData = Math.ceil(res.data.total_data / 12);
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

  const getDelivery = async (delivery) => {
    axios
      .get("http://localhost:5000/delivery")
      .then((res) => {
        setDelivery(res.data.data);
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
            <href>
              {category.map((val, idx) => (
                <div className="has-text-black-bis" key={idx}>
                  <span
                    className={
                      dataFilter.category.name === val.name
                        ? "has-text-weight-bold"
                        : null
                    }
                    onClick={() => {
                      getProduct(val.id, dataFilter.delivery.id);
                      setDataFilter((prevState) => ({
                        ...prevState,
                        category: val,
                      }));
                    }}
                  >
                    {val.name}
                  </span>
                </div>
              ))}
            </href>
            <div className="has-text-weight-bold my-2">Pengiriman</div>
            <href>
              {delivery.map((val, idx) => (
                <div className="has-text-black-bis" key={idx}>
                  <div
                    className={
                      dataFilter.delivery.name === val.name
                        ? "has-text-weight-bold"
                        : null
                    }
                    onClick={() => {
                      getProduct(dataFilter.category.id, val.id);
                      setDataFilter((prevState) => ({
                        ...prevState,
                        delivery: val,
                      }));
                    }}
                  >
                    {val.name}
                  </div>
                </div>
              ))}
            </href>
            <button
              className="button has-text-danger-dark mt-4"
              style={{ width: "100%" }}
              onClick={() => {
                getProduct(null, null);
                setDataFilter((prevState) => ({
                  ...prevState,
                  category: {},
                  delivery: {},
                }));
              }}
            >
              Reset Filter
            </button>
          </div>
        </div>
        <div className="column is-10">
          {product.length < 1 ? (
            <div className="box">
              <div className="has-text-weight-bold is-size-4">
                Oops, produk nggak ditemukan
              </div>
              <div>
                Coba kata kunci lain atau cek produk rekomendasi di bawah.
              </div>
            </div>
          ) : (
            <>
              <div className="columns is-multiline">
                {product.map((val, idx) => (
                  <div className="column is-3" key={idx}>
                    <Link to={`/product/detail/${val.code}`}>
                      <div className="card" style={{ height: "100%" }}>
                        <div className="card-image">
                          <figure className="image is-4by4">
                            <input
                              type="image"
                              // src="https://images.tokopedia.net/img/cache/200-square/hDjmkQ/2021/7/28/16445adf-dfb5-47d9-a43e-d896937d6fc6.jpg.webp?ect=4g"
                              src={"http://localhost:5000/" + val.image}
                              alt="Placeholder image"
                            />
                          </figure>
                        </div>
                        <div className="card-content">
                          <div className="content">
                            <div className="has-text-weight-bold">
                              {val.title}
                            </div>
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
              {pagination.length > 1 ? (
                <nav
                  className="pagination"
                  role="navigation"
                  aria-label="pagination"
                >
                  <href
                    className="pagination-previous"
                    onClick={() => {
                      // console.log("okk");
                      getProduct(
                        dataFilter.category.id,
                        dataFilter.delivery.id,
                        dataFilter.page - 1
                      );
                      setDataFilter((prevState) => ({
                        ...prevState,
                        page: dataFilter.page - 1,
                      }));
                    }}
                  >
                    Previous
                  </href>

                  <href
                    className="pagination-next"
                    onClick={() => {
                      // console.log("okk");
                      getProduct(
                        dataFilter.category.id,
                        dataFilter.delivery.id,
                        dataFilter.page + 1
                      );
                      setDataFilter((prevState) => ({
                        ...prevState,
                        page: dataFilter.page + 1,
                      }));
                    }}
                  >
                    Next
                  </href>

                  <ul className="pagination-list">
                    {/* {console.log("dataFilter", dataFilter)} */}
                    {pagination.map((val, idx) => (
                      <li key={idx}>
                        <href
                          style={
                            dataFilter.page === idx + 1
                              ? {
                                  backgroundColor: "#fa591d",
                                  borderColor: "#fa591d",
                                }
                              : {}
                          }
                          className={
                            dataFilter.page === idx + 1
                              ? "pagination-link is-current"
                              : "pagination-link"
                          }
                          onClick={() => {
                            getProduct(
                              dataFilter.category.id,
                              dataFilter.delivery.id,
                              idx + 1
                            );
                            setDataFilter((prevState) => ({
                              ...prevState,
                              page: idx + 1,
                            }));
                            // console.log("idx", idx + 1);
                          }}
                        >
                          {idx + 1}
                        </href>
                      </li>
                    ))}
                  </ul>
                </nav>
              ) : null}
            </>
          )}
        </div>
      </div>
      {/* </Container> */}
    </div>
  );
};

export default ProductCard;
