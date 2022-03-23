import express from "express";
import {
  getAllCategory,
  getCategoryById,
} from "../controllers/Category.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.get("/", getAllCategory);
router.get("/:id", getCategoryById);
export default router;
