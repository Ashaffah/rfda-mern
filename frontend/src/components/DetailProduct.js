import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CurrencyFormat from "react-currency-format";

const DetailProduct = () => {
  const [data, setData] = useState({});
  const { name } = useParams();

  useEffect(() => {
    getProductByName();
  }, []);

  const getProductByName = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_MY_BASE_URL}/products/detail/${name}`
    );
    setData(response.data.data);
    console.log("response", response);
  };
  return (
    <div>
      {/* <div>DETAIL PRODUCT</div> */}
      <div className="columns mt-5">
        <div className="column is-3">
          <img
            src={`${process.env.REACT_APP_MY_BASE_URL}/` + data.image}
            alt={data.name}
            style={{ width: "-webkit-fill-available", borderRadius: "10px" }}
          />
          <div
            style={{
              display: "inline-flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {[1, 2, 3].map((val, idx) => (
              <img
                src={`${process.env.REACT_APP_MY_BASE_URL}/` + data.image}
                alt={data.name + idx}
                style={{ width: "25%", borderRadius: "10px" }}
              />
            ))}
          </div>
        </div>
        <div className="column is-half">
          <div className="has-text-weight-bold is-size-4">{data.title}</div>
          <div className=" mb-3">
            Terjual <span className="has-text-primary">{data.sales}</span>
          </div>
          {data.selling_price > 0 ? (
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
                  {((data.selling_price / data.price) * 100).toFixed(0)}%
                </div>
                <div
                  style={{
                    textDecorationLine: "line-through",
                    textDecorationStyle: "solid",
                  }}
                >
                  <CurrencyFormat
                    value={data.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"Rp. "}
                  />
                </div>
              </div>
              <div
                className="has-text-weight-bold is-size-4 mb-4"
                style={{
                  color: "#fa591d",
                }}
              >
                <CurrencyFormat
                  value={data.selling_price}
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
                  className="has-text-weight-bold is-size-4 mb-4"
                  style={{
                    color: "#fa591d",
                  }}
                >
                  <CurrencyFormat
                    value={data.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"Rp. "}
                  />
                </div>
              </div>
            </>
          )}

          <div className="tabs is-boxed">
            <ul>
              <li className="is-active">
                <a>Description</a>
              </li>
              <li>
                <a>Spesifikasi</a>
              </li>
              <li>
                <a>Panduan</a>
              </li>
              <li>
                <a>Info Penting</a>
              </li>
            </ul>
          </div>
          <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
          <hr className="navbar-divider"></hr>
          {/* <div>
            <div className="columns">
              <div className="column is-3">
                <div>logo</div>
              </div>
              <div className="column is-9">
                <div>Nama Toko</div>
              </div>
            </div>
          </div> */}

          <div>
            <div className="has-text-weight-bold my-2">Pengiriman</div>
            <div>
              Dikirim dari{" "}
              <span className="has-text-weight-bold">Jakarta Utara</span>
            </div>
            <div>Ongkir Reguler 36 rb - 54 rb</div>
            <div className="has-text-primary">Estimasi tiba 27 - 30 Mar</div>
            <div>Kurir lainnya: COD</div>
          </div>

          <hr className="navbar-divider"></hr>
        </div>
        <div className="column is-3 mt-3">
          <div className="box">
            <div className="my-2">Pilih Varian</div>
            <div className="buttons">
              <button
                className="button is-rounded"
                style={{ backgroundColor: "red" }}
              ></button>
              <button
                className="button is-rounded"
                style={{ backgroundColor: "green" }}
              ></button>
              <button
                className="button is-rounded"
                style={{ backgroundColor: "blue" }}
              ></button>
              <button
                className="button is-rounded"
                style={{ backgroundColor: "yellow" }}
              ></button>
            </div>
            <div className="my-2">Pilih Ukuran</div>
            <div className="buttons">
              <button className="button">S</button>
              <button className="button">M</button>
              <button className="button">L</button>
              <button className="button">XL</button>
            </div>
            <button
              className="button is-success has-text-white"
              style={{ width: "100%", color: "white" }}
              onClick={() => {}}
            >
              + Keranjang
            </button>
            <button
              className="button has-text-danger-dark mt-4"
              style={{ width: "100%" }}
              onClick={() => {}}
            >
              Beli Langsung
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
