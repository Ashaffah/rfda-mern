import express from "express";
import { getAllProducts, createProduct, getProductById, getProductByName, updateProduct, deleteProduct, } from "../controllers/Products.js";
import { getAllKurir, getKurirById, createKurir, updateKurir, deleteKurir } from "../controllers/Delivery.js";
import { getAllCategory, getCategoryById, createCategory, updateCategory, deleteCategory } from "../controllers/Category.js";

import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get("/products/", verifyToken, getAllProducts);
router.get("/product/:id", verifyToken, getProductById);
router.get("/product/detail/:name", verifyToken, getProductByName);
router.post("/product/", verifyToken, createProduct);
router.patch("/product/:id", verifyToken, updateProduct);
router.delete("/product/:id", verifyToken, deleteProduct);

router.get("/delivery/", verifyToken, getAllKurir);
router.get("/delivery/:id", verifyToken, getKurirById);
router.post("/delivery/", verifyToken, createKurir);
router.patch("/delivery/:id", verifyToken, updateKurir);
router.delete("/delivery/:id", verifyToken, deleteKurir);

router.get("/category/", verifyToken, getAllCategory);
router.get("/category/:id", verifyToken, getCategoryById);
router.post("/category/", verifyToken, createCategory);
router.patch("/category/:id", verifyToken, updateCategory);
router.delete("/category/:id", verifyToken, deleteCategory);
export default router;
