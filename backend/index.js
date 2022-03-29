import express from "express";
import db from "./config/database.js";
import productRoute from "./routes/product.js";
import categoryRoute from "./routes/category.js";
import deliveryRoute from "./routes/delivery.js";
import cors from "cors";
import multer from "multer";
import jwt from "jsonwebtoken";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// const upload = multer({ storage: storage });
const app = express();
app.use(multer({ storage: storage, fileFilter: fileFilter }).single("image"));
app.use("/uploads", express.static(process.cwd() + "/uploads"));

try {
  await db.authenticate();
  console.log("Database connected");
} catch (error) {
  console.error("Connection error", error);
}

app.use(cors());
app.use(express.json());
app.use("/products", productRoute);
app.use("/category", categoryRoute);
app.use("/delivery", deliveryRoute);

app.get("/getData", verifyUser, (req, res) => {
  res.json({
    message: "okkkkkkkk",
    data: req.body
  })
})

app.post("/login", (req, res) => {
  const user = {
    id: 1,
    username: "danang",
    email: "danang@gmail.com",
  }
  jwt.sign(user, 'secret', { expiresIn: '10000' }, (err, token) => {
    if (err) {
      console.log(err);
      res.sendStatus(304);
      return
    }
    const Token = token;
    res.json({
      user: user,
      token: token
    })
  })
});

function verifyUser(req, res, next) {
  const bearer = req.headers.bearer;
  jwt.verify(bearer, 'secret', (err, data) => {
    if (err) {
      console.log(err.message);
      res.json(err);
      return
    }
    req.body = data;
    next()
  })
}

app.listen(5000, () => console.log("server running at port 5000"));
