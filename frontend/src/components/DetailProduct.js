import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const DetailProduct = () => {
  const [data, setData] = useState({});
  const { name } = useParams();

  useEffect(() => {
    getProductByName();
  }, []);

  const getProductByName = async () => {
    const response = await axios.get(`http://localhost:5000/products/detail/${name}`);
    setData(response.data);
  };
  return (
    <div>
      <div>DETAIL PRODUCT</div>
      <img
        src={"http://localhost:5000/" + data.image}
        alt="Placeholder image"
      />
      <div>{data.title}</div>
      <div>{data.price}</div>
      <div>{data.selling_price}</div>
      <div>{data.sales}</div>
      <div>{data.description}</div>
    </div>
  );
};

export default DetailProduct;
