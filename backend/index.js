import express from "express";
import db from "./config/database.js";
import productRoute from "./routes/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log("Database connected");
} catch (error) {
  console.error("Connection error", error);
}

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(router);
app.use(cors());
app.use(express.json());
app.use("/products", productRoute);

app.listen(5000, () => console.log("server running at port 5000"));
