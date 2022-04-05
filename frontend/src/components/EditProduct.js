import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // Use useNavigate instead of useHistory sudah tidak digunakan di react v6

const EditProduct = () => {
  const [dataProduct, setProduct] = useState({
    title: "",
    code: "",
    price: 0,
    selling_price: 0,
    image: "",
    category_id: 0,
    delivery_id: 0,
  });
  console.log("dataProduct", dataProduct);
  const history = useNavigate();
  const { id } = useParams();

  const updateProduct = async (e) => {
    e.preventDefault();
    await axios.patch(`https://backend-express-rfda.herokuapp.com/products/${id}`, {
      title: dataProduct.title,
      price: dataProduct.price,
      selling_price: dataProduct.selling_price,
      image: dataProduct.image,
    });
    history("/manage/product"); // history.push("/"); no longer use push
  };

  useEffect(() => {
    const getProductById = async () => {
      const response = await axios.get("https://backend-express-rfda.herokuapp.com/products/" + id);
      setProduct(response.data.data);
    };
    getProductById();
  }, [id]);

  return (
    <div>
      <form onSubmit={updateProduct}>
        <div className="field">
          <label className="label">Title</label>
          <input
            className="input"
            type="text"
            placeholder="Title"
            value={dataProduct.title}
            onChange={(e) => {
              setProduct((prevState) => ({
                ...prevState,
                title: e.target.value,
              }));
            }}
          />
        </div>

        <div className="field">
          <label className="label">Price</label>
          <input
            className="input"
            type="text"
            placeholder="Price"
            value={dataProduct.price}
            onChange={(e) => {
              setProduct((prevState) => ({
                ...prevState,
                price: e.target.value,
              }));
            }}
          />
        </div>

        <div className="field">
          <label className="label">Selling Price</label>
          <input
            className="input"
            type="text"
            placeholder="Title"
            value={dataProduct.selling_price}
            onChange={(e) => {
              setProduct((prevState) => ({
                ...prevState,
                selling_price: e.target.value,
              }));
            }}
          />
        </div>

        <div className="field"></div>
        <button className="button is-primary">Update</button>
      </form>
      {/* {title} - {price}  */}
    </div>
  );
};

export default EditProduct;
