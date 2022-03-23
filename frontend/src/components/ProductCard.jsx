import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductCard = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    // const dummyData = [
    //   {
    //     id: 1,
    //     title: "aasdfga",
    //     image: "sdfgsdfg",
    //     price: "555",
    //   },
    //   {
    //     id: 2,
    //     title: "bbxcfdgb",
    //     image: "sdfgsdfg",
    //     price: "555",
    //   },
    //   {
    //     id: 3,
    //     title: "cccxvbc",
    //     image: "sdfgsdfg",
    //     price: "555",
    //   },
    //   {
    //     id: 4,
    //     title: "ddsdfgdsfd",
    //     image: "sdfgsdfg",
    //     price: "555",
    //   },
    //   {
    //     id: 5,
    //     title: "eexcvbxcve",
    //     image: "sdfgsdfg",
    //     price: "555",
    //   },
    //   {
    //     id: 6,
    //     title: "fdsfgsdff",
    //     image: "sdfgsdfg",
    //     price: "555",
    //   },
    //   {
    //     id: 7,
    //     title: "gxcvbxcgg",
    //     image: "sdfgsdfg",
    //     price: "555",
    //   },
    //   {
    //     id: 8,
    //     title: "dfgsfd",
    //     image: "sdfgsdfg",
    //     price: "555",
    //   },
    //   {
    //     id: 9,
    //     title: "isdfgsdii",
    //     image: "sdfgsdfg",
    //     price: "555",
    //   },
    //   {
    //     id: 10,
    //     title: "dfgdfg",
    //     image: "sdfgsdfg",
    //     price: "555",
    //   },
    //   {
    //     id: 11,
    //     title: "ixcvbxcii",
    //     image: "sdfgsdfg",
    //     price: "555",
    //   }
    // ]
    // setProduct(dummyData);

    axios.get("http://localhost:5000/products?page=1&perPage=10").then((res) => {
      setProduct(res.data.data);
    }).catch((error) => {
      alert(error)
    });
  };

  return (
    <div className="my-6">
      <div className="columns">
        <div className="column is-2">
          <div className="has-text-weight-bold is-size-4 has-text-centered mb-3">Filter</div>
          <div className="card p-4">
            <div className="has-text-weight-bold mb-2">Kategori</div>
            <div className="">Filter</div>
            <div className="">Filter</div>
            <div className="">Filter</div>
            <div className="">Filter</div>
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
                <Link
                  to={`/product/detail/${val.code}`}
                >
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
      {/* </Container> */}
    </div>
  );
};

export default ProductCard;
