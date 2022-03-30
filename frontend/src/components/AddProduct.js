import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory sudah tidak digunakan di react v6
import { Editor } from "@tinymce/tinymce-react";

const AddProduct = () => {
  const [selectCategory, setSelectCategory] = useState([]);
  const [selectDelivery, setSelectDelivery] = useState([]);

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
    getDeliveryList();

    if (!selectFile) {
      setPreview(undefined);
      return;
    }
    const objectURL = URL.createObjectURL(selectFile);
    setPreview(objectURL);
    return () => URL.revokeObjectURL(objectURL);
  }, [selectFile]);

  const getCategoryList = async (category) => {
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

  const getDeliveryList = async (delivery) => {
    axios
      .get("http://localhost:5000/delivery")
      .then((res) => {
        setSelectDelivery(res.data.data);
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

        <div className="field">
          <label className="label">Pilih Category</label>
          <div class="select">
            <select>
              {selectCategory.map((val, idx) => (
                <option
                  key={idx}
                  value={val.category_id}
                  onClick={() => {
                    getCategoryList(val.name, selectCategory.dataProduct.id);
                    setSelectCategory((prevState) => ({
                      ...prevState,
                      category_id: val,
                    }));
                  }}
                >
                  {val.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="field">
          <label className="label">Pilih Delivery</label>
          <div class="select">
            <select>
              {selectDelivery.map((val, idx) => (
                <option
                  key={idx}
                  value={val.category_id}
                  onClick={() => {
                    getDeliveryList(val.name, selectDelivery.dataProduct.id);
                    setSelectDelivery((prevState) => ({
                      ...prevState,
                      delivery_id: val,
                    }));
                  }}
                >
                  {val.name}
                </option>
              ))}
            </select>
          </div>
        </div>

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
