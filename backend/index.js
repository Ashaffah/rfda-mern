import express from "express";
import db from "./config/database.js";
import productRoute from "./routes/index.js";
import cors from "cors";

const multer = require('multer');
const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date.getTime() + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

try {
  await db.authenticate();
  console.log("Database connected");
} catch (error) {
  console.error("Connection error", error);
}

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));

app.use(cors());
app.use(express.json());
app.use("/products", productRoute);

app.listen(5000, () => console.log("server running at port 5000"));
