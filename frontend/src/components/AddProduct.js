import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory sudah tidak digunakan di react v6

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const history = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/products", {
      title: title,
      price: price,
    });
    history("/"); // history.push("/"); no longer use push
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
            onChange={(e) => setTitle(e.target.value)}
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
        <button className="button is-primary">Save</button>
      </form>
      {/* {title} - {price}  */}
    </div>
  );
};

export default AddProduct;
