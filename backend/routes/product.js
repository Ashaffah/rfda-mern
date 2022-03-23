import express from "express";
import {
  getAllProducts,
  createProduct,
  getProductById,
  getProductByName,
  updateProduct,
  deleteProduct,
} from "../controllers/Products.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.get("/detail/:name", getProductByName);
router.post("/", createProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);
export default router;
