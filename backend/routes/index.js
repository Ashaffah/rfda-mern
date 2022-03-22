import express from "express";
import {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/Products.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const router = express.Router();
router.post(
  "/uploadImage",
  upload.single("avatar"),
  function (req, res, next) {}
);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);
export default router;
