import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // Use useNavigate instead of useHistory sudah tidak digunakan di react v6

const EditCategory = () => {
  const [dataCategory, setCategory] = useState({ name: "" });
  const history = useNavigate();
  const { id } = useParams();

  const updateData = async (e) => {
    e.preventDefault();
    await axios.patch(`http://localhost:5000/category/${id}`, {
      name: dataCategory.name,
    });
    history("/manage/category"); // history.push("/"); no longer use push
  };

  useEffect(() => {
    const getCategoryById = async () => {
      const response = await axios.get("http://localhost:5000/category/" + id);
      setCategory(response.data);
    };
    getCategoryById();
  }, [id]);

  return (
    <div>
      <form onSubmit={updateData}>
        <div className="field">
          <label className="label">Nama</label>
          <input
            className="input"
            type="text"
            placeholder="Title"
            value={dataCategory.name}
            onChange={(e) => {
              setCategory((prevState) => ({
                ...prevState,
                name: e.target.value,
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

export default EditCategory;
