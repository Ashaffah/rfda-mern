import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory sudah tidak digunakan di react v6

const AddCategory = () => {
  const [name, setName] = useState("");
  const history = useNavigate();

  const saveCategory = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", name);
    await axios.post(`${process.env.REACT_APP_MY_BASE_URL}/category`, data, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    history("/manage/category"); // history.push("/"); no longer use push
  };
  return (
    <div>
      <form onSubmit={saveCategory}>
        <div className="field">
          <label className="label">Name</label>
          <input
            className="input"
            type="text"
            placeholder="Title"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="field"></div>
        <button className="button is-primary">Save</button>
      </form>
      {/* {title} - {price}  */}
    </div>
  );
};

export default AddCategory;
