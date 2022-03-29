import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // Use useNavigate instead of useHistory sudah tidak digunakan di react v6

const EditProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  // const [image, setImage] = useState("");
  const [dataProduct, setProduct] = useState({
    title: "",
    code: "",
    price: 0,
    selling_price: 0,
    image: "",
    category_id: 0,
    delivery_id: 0,
  });
  const history = useNavigate();
  const { id } = useParams();

  const updateProduct = async (e) => {
    e.preventDefault();
    await axios.patch(`http://localhost:5000/products/${id}`, {
      title: title,
      price: price,
    });
    history("/"); // history.push("/"); no longer use push
  };

  useEffect(() => {
    const getProductById = async () => {
      const response = await axios.get("http://localhost:5000/products/" + id);
      setTitle(response.data.data);
      setPrice(response.data.data);
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
              setTitle(e.target.value);
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
            onChange={(e) => setPrice(e.target.value)}
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
              setTitle(e.target.value);
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
