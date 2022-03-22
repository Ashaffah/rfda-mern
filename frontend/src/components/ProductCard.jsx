import { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ProductCard = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const response = await axios.get("http://localhost:5000/products");
    // console.log(response.data); Checking data
    setProduct(response.data);
  };

  console.log("product", product);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", margin: "0px-8px" }}>
      {console.log("product", product)}
      <div
        style={{
          background: "var(--N0,#FFFFFF)",
          display: "inline-flex",
          webkitBoxAlign: "stretch",
          alignItems: "stretch",
          width: "20%",
          padding: "0px 8px 16px",
          boxSizing: "border-box",
        }}
      >
        {product.map((val, idx) => (
          <Col>
            <Card>
              <Card.Img
                variant="top"
                src={"http://localhost:5000/" + val.image}
              />
              <Card.Body>
                <Card.Title>{val.title}</Card.Title>
                <Card.Text>{val.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
