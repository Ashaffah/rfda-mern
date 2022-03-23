import express from "express";
import {
  getAllKurir,
  getKurirById,
} from "../controllers/Delivery.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.get("/", getAllKurir);
router.get("/:id", getKurirById);
export default router;
