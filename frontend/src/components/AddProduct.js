import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory sudah tidak digunakan di react v6
import { Editor } from "@tinymce/tinymce-react";

const AddProduct = () => {
  const [listCategory, setDataCategory] = useState([]);
  const [listDelivery, setDataDelivery] = useState([]);
  const [selectFile, setFile] = useState();
  const [previewImage, setPreview] = useState();
  const [dataProduct, setProduct] = useState({
    title: "",
    code: "",
    price: 0,
    selling_price: 0,
    image: null,
    category_id: 0,
    delivery_id: 0,
  });

  const history = useNavigate();

  useEffect(() => {
    getCategoryList();
    getDeliveryList();

    console.log("render")

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
        setDataCategory(res.data.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const getDeliveryList = async () => {
    axios
      .get("http://localhost:5000/delivery")
      .then((res) => {
        setDataDelivery(res.data.data);
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

  const editorRef = useRef(null);

  const saveProduct = async (e) => {
    e.preventDefault();
    if (
      dataProduct.title !== "" &&
      dataProduct.price !== 0 &&
      dataProduct.selling_price !== 0 &&
      dataProduct.description !== "" &&
      dataProduct.category_id !== 0 &&
      dataProduct.delivery_id !== 0 &&
      dataProduct.image !== null
    ) {
      console.log("full field", true);

      var str = dataProduct.title;
      var code = str.replace(/\s+/g, "-");

      const data = new FormData();
      data.append("title", dataProduct.title);
      data.append("code", code);
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
    }
  };
  return (
    <div>
      {console.log(dataProduct)}
      <form onSubmit={saveProduct}>
        <div className="field">
          <label className="label">Title</label>
          <input
            className="input"
            type="text"
            placeholder="Title"
            onChange={(e) => {
              setProduct((prevState) => ({
                ...prevState,
                title: e.target.value,
              }));
            }
            }
          />
        </div>

        <div className="field">
          <label className="label">Price</label>
          <input
            className="input"
            type="text"
            placeholder="Price"
            onChange={(e) => {
              setProduct((prevState) => ({
                ...prevState,
                price: e.target.value,
              }));
            }
            }
          />
        </div>

        <div className="field">
          <label className="label">Selling Price</label>
          <input
            className="input"
            type="text"
            placeholder="Price"
            onChange={(e) => {
              setProduct((prevState) => ({
                ...prevState,
                selling_price: e.target.value,
              }));
            }
            }
          />
        </div>

        <div className="columns">
          <div className="column is-6">
            <div className="field">
              <label className="label">Pilih Category</label>
              <div style={{ display: "block" }} className="select">
                <select
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setProduct((prevState) => ({
                      ...prevState,
                      category_id: e.target.value,
                    }));
                  }}
                >
                  <option value={0}>-- Pilih --</option>
                  {listCategory.map((val, idx) => (
                    <option key={idx} value={val.id}>
                      {val.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="column is-6">
            <div className="field">
              <label className="label">Pilih Delivery</label>
              <div style={{ display: "block" }} className="select">
                <select
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setProduct((prevState) => ({
                      ...prevState,
                      delivery_id: e.target.value,
                    }));
                  }}
                >
                  <option value={0}>-- Pilih --</option>
                  {listDelivery.map((val, idx) => (
                    <option key={idx} value={val.id}>
                      {val.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="label">Description</label>
          <Editor
            apiKey="mbl79zu3ed3clcjqygltjkrjj5hm3kep580x4hrx7e50e1b8"
            onInit={(evt, editor) => (editorRef.current = editor)}
            init={{
              height: 400,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ',
            }}
            onEditorChange={() => {
              (editorRef.current) &&
                setProduct((prevState) => ({
                  ...prevState,
                  description: editorRef.current.getContent(),
                }));
            }}
          />
        </div>

        <div className="file has-name is-boxed my-5">
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
                <span className="file-label">Choose a file</span>
              )}
            </span>
            <span className="file-name" style={{ textAlign: "center" }}>
              {
                dataProduct.image != null ? dataProduct.image.name : "..."
              }
            </span>
          </label>
        </div>



        <div className="mb-6" style={{ textAlign: "right" }}>
          <button className="button is-danger mr-3" onClick={() => history("/manage/product")}>
            Back
          </button>
          <button className="button is-success">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
