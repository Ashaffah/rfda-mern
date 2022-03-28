import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // Use useNavigate instead of useHistory sudah tidak digunakan di react v6

const EditCategory = () => {
  const [dataCategory, setCategory] = useState({ name: "" });
  const history = useNavigate();
  const { id } = useParams();

  const updateCategory = async (e) => {
    e.preventDefault();

    await axios.patch(`http://localhost:5000/category/${id}`);
    history("/"); // history.push("/"); no longer use push
  };

  useEffect(() => {
    getCategoryById();
  }, []);

  const getCategoryById = async () => {
    const response = await axios.get(`http://localhost:5000/category/${id}`);
    setCategory(response.data);
  };
  return (
    <div>
      <form onSubmit={updateCategory}>
        <div className="field">
          <label className="label">Nama</label>
          <input
            className="input"
            type="text"
            placeholder="Title"
            value={dataCategory.name}
            onChange={(e) => {
              setCategory(e.target.value);
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

export default EditCategory;
