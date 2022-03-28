import express from "express";
import {
  getAllCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from "../controllers/Category.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.get("/", getAllCategory);
router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);
export default router;
