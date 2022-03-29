import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;
const Delivery = db.define(
  "delivery",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);
export default Delivery;
