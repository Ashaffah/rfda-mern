import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory sudah tidak digunakan di react v6
import { Editor } from '@tinymce/tinymce-react';

const AddProduct = () => {
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

  const uploadImage = (e) => {
    const image = e.target.files[0];
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
      {console.log("data", dataProduct)}
      <form onSubmit={saveProduct}>
        <div className="field">
          <label className="label">Title</label>
          <input
            className="input"
            type="text"
            placeholder="Title"
            onChange={(e) => setProduct((prevState) => ({
              ...prevState,
              title: e.target.value,
            }))}
          />
        </div>

        <div className="field">
          <label className="label">Price</label>
          <input
            className="input"
            type="text"
            placeholder="Price"
            onChange={(e) => setProduct((prevState) => ({
              ...prevState,
              price: e.target.value,
            }))}
          />
        </div>

        <div className="field">
          <label className="label">Selling Price</label>
          <input
            className="input"
            type="text"
            placeholder="Price"
            onChange={(e) => setProduct((prevState) => ({
              ...prevState,
              selling_price: e.target.value,
            }))}
          />
        </div>

        {/* <Editor
          onInit={(evt, editor) => editorRef.current = editor}
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar: 'undo redo | formatselect | ' +
              'bold italic backcolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
        /> */}

        {console.log("dataProduct", dataProduct.image)}

        <div class="file has-name is-boxed">
          <label class="file-label">
            <input class="file-input" type="file" name="resume" onChange={(e) => uploadImage(e)} />
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label">
                Choose a file…
              </span>
            </span>
            {
              dataProduct.image?.name &&
              <span class="file-name" style={{ textAlign: "center" }}>
                {dataProduct.image?.name}
              </span>
            }
          </label>
        </div>

        <div className="field"></div>
        <button className="button is-primary">Save</button>
      </form>
    </div>
  );
};

export default AddProduct;
