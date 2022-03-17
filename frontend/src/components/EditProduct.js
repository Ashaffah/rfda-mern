import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // Use useNavigate instead of useHistory sudah tidak digunakan di react v6

const EditProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const history = useNavigate();
  const { id } = useParams();

  const saveProduct = async (e) => {
    e.preventDefault();

    console.log(`http://localhost:5000/products/${id}`);
    console.log({
      title: title,
      price: price,
    });
    await axios.patch(`http://localhost:5000/products/${id}`, {
      title: title,
      price: price,
    });
    history("/"); // history.push("/"); no longer use push
  };

  useEffect(() => {
    getProductById();
    // console.log("OKE");
  }, []);

  const getProductById = async () => {
    // console.log("START");
    const response = await axios.get(`http://localhost:5000/products/${id}`);
    setTitle(response.data.title);
    setPrice(response.data.price);
  };
  return (
    <div>
      <form onSubmit={saveProduct}>
        <div className="field">
          <label className="label">Title</label>
          <input
            className="input"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              // console.log(e.target.value);
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
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
