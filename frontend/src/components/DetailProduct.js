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
      `http://localhost:5000/products/detail/${name}`
    );
    setData(response.data);
  };
  return (
    <div>
      <div>DETAIL PRODUCT</div>
      <div className="columns box">
        <div className="column is-3 box">
          <img
            src={"http://localhost:5000/" + data.image}
            alt="Placeholder image"
            style={{ width: "-webkit-fill-available" }}
          />
        </div>
        <div className="column is-half box">
          <div className="has-text-weight-bold">{data.title}</div>
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
                className="has-text-weight-bold"
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
                  className="has-text-weight-bold"
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
          <div>Terjual {data.sales}</div>
          <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
        </div>
        <div className="column is-3 box">Pilih Varian</div>
      </div>
    </div>
  );
};

export default DetailProduct;
