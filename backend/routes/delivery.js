import express from "express";
import {
  getAllKurir,
  getKurirById,
  createKurir,
  updateKurir,
  deleteKurir
} from "../controllers/Delivery.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.get("/", getAllKurir);
router.get("/:id", getKurirById);
router.post("/", createKurir);
router.patch("/:id", updateKurir);
router.delete("/:id", deleteKurir);
export default router;
