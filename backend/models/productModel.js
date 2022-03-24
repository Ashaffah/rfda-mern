import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;
const Product = db.define(
  "products",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DOUBLE,
    },
    selling_price: {
      type: DataTypes.DOUBLE,
    },
    sales: {
      type: DataTypes.DOUBLE,
    },
    image: {
      type: DataTypes.STRING,
    },
    category_id: {
      type: DataTypes.INTEGER,
    },
    delivery_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);
export default Product;
