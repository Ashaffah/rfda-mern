import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory sudah tidak digunakan di react v6
import { Editor } from "@tinymce/tinymce-react";

const AddProduct = () => {
  const [selectCategory, setSelectCategory] = useState([]);
  const [selectFile, setFile] = useState();
  const [previewImage, setPreview] = useState();
  const [dataProduct, setProduct] = useState({
    title: "",
    code: "",
    price: 0,
    selling_price: 0,
    image: null,
    category_id: null,
    delivery_id: null,
  });

  const history = useNavigate();
  useEffect(() => {
    getCategoryList();

    if (!selectFile) {
      setPreview(undefined);
      return;
    }
    const objectURL = URL.createObjectURL(selectFile);
    setPreview(objectURL);
    return () => URL.revokeObjectURL(objectURL);
  }, [selectFile]);

  const getCategoryList = async () => {
    axios
      .get("http://localhost:5000/category")
      .then((res) => {
        setSelectCategory(res.data.data);
        console.log("OKKKKKKKKKKK", res.data.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const uploadImage = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(undefined);
      return;
    }

    const image = e.target.files[0];
    setFile(image);
    setProduct((prevState) => ({
      ...prevState,
      image: image,
    }));
  };

  const saveProduct = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", dataProduct.title);
    data.append("code", dataProduct.code);
    data.append("price", dataProduct.price);
    data.append("selling_price", dataProduct.selling_price);
    data.append("description", dataProduct.description);
    data.append("category", dataProduct.category);
    data.append("delivery", dataProduct.delivery);
    data.append("image", dataProduct.image);

    await axios.post("http://localhost:5000/products", data, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    history("/manage/product");
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
            onChange={(e) =>
              setProduct((prevState) => ({
                ...prevState,
                title: e.target.value,
              }))
            }
          />
        </div>

        <div className="field">
          <label className="label">Price</label>
          <input
            className="input"
            type="text"
            placeholder="Price"
            onChange={(e) =>
              setProduct((prevState) => ({
                ...prevState,
                price: e.target.value,
              }))
            }
          />
        </div>

        <div className="field">
          <label className="label">Selling Price</label>
          <input
            className="input"
            type="text"
            placeholder="Price"
            onChange={(e) =>
              setProduct((prevState) => ({
                ...prevState,
                selling_price: e.target.value,
              }))
            }
          />
        </div>

        <div>
          {/* <select>
            Pilih Category
            {selectCategory.map(({ value, label }, index) => (
              <option value={category_id}>{nam}</option>
            ))}
          </select> */}
        </div>
        {/* <div>
          <div className="dropdown is-active">
            <div className="dropdown-trigger">
              <button
                className="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu"
              >
                <span>---Pilih Category---</span>
                <span className="icon is-small">
                  <i className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
              <div className="dropdown-content">
                <a href="#" className="dropdown-item">
                  
                </a>
                 <a class="dropdown-item">Other dropdown item</a>
                <a href="#" class="dropdown-item is-active">
                  Active dropdown item
                </a>
                <a href="#" class="dropdown-item">
                  Other dropdown item
                </a>
                <hr class="dropdown-divider" />
                <a href="#" class="dropdown-item">
                  With a divider
                </a> *
              </div>
            </div>
          </div>
        </div> */}

        <div>
          <label className="label">Description</label>
          <Editor
            apiKey="mbl79zu3ed3clcjqygltjkrjj5hm3kep580x4hrx7e50e1b8"
            init={{}}
            onChange={(e) =>
              setProduct((prevState) => ({
                ...prevState,
                description: e.target.value,
              }))
            }
          ></Editor>
        </div>

        <div className="file has-name is-boxed">
          <label className="file-label">
            <input
              className="file-input"
              type="file"
              name="resume"
              onChange={(e) => uploadImage(e)}
            />
            <span className="file-cta">
              <span className="file-icon">
                <i className="fas fa-upload"></i>
              </span>
              {selectFile ? (
                <img src={previewImage} alt="" />
              ) : (
                <span className="file-label">Choose a file…</span>
              )}
            </span>
            {dataProduct.image?.name && (
              <span className="file-name" style={{ textAlign: "center" }}>
                {dataProduct.image?.name}
              </span>
            )}
          </label>
        </div>
        <div className="field"></div>
        <button className="button is-primary">Save</button>
      </form>
    </div>
  );
};

export default AddProduct;
