import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import Delivery from "../models/deliveryModel.js";
import { Op } from "sequelize";

export const getAllProducts = async (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 5;
  const category = req.query.category;
  const delivery = req.query.delivery;
  const search = req.query.search;

  let query = {};
  if (category == undefined && delivery == undefined && search == undefined) {
    query.where = {};
  } else {
    query.where = [
      category != undefined && { category_id: JSON.parse(category) },
      delivery != undefined && { delivery_id: delivery },
      search != undefined && { title: { [Op.like]: `%${search}%` } },
    ];
  }
  query.include = [{ model: Category }, { model: Delivery }];
  query.attributes = { exclude: ["description"] };
  query.offset = (parseInt(currentPage) - 1) * parseInt(perPage);
  query.limit = parseInt(perPage);

  Product.findAndCountAll(query)
    .then((result) => {
      res.status(200).json({
        message: "Success get Data Product",
        data: result.rows,
        total_data: result.count,
        per_page: parseInt(perPage),
        current_page: parseInt(currentPage),
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getProductById = async (req, res) => {
  let query = {};
  query.where = { id: req.params.id }

  Product.findAll(query)
    .then((result) => {
      res.status(200).json({
        message: "Success get Detail Product",
        data: result[0]
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getProductByName = async (req, res) => {
  let query = {};
  query.where = { code: req.params.name }
  query.include = [{ model: Category }, { model: Delivery }];

  Product.findAll(query)
    .then((result) => {
      res.status(200).json({
        message: "Success get Detail Product",
        data: result[0]
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createProduct = async (req, res) => {
  try {
    const payload = {
      title: req.body.title,
      code: req.body.code,
      price: req.body.price,
      selling_price: req.body.selling_price,
      description: req.body.description,
      category_id: req.body.category,
      delivery_id: req.body.delivery,
      image: req.file.path
    };
    await Product.create(payload);
    res.json({
      message: "Product Created",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const payload = {
      title: req.body.title,
      code: req.body.code,
      price: req.body.price,
      selling_price: req.body.selling_price,
      description: req.body.description,
      category_id: req.body.category,
      delivery_id: req.body.delivery,
      image: req.file.path
    };
    await Product.update(payload, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Product Updated",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  Product.destroy({ where: { id: req.params.id } })
    .then((result) => {
      res.status(200).json({
        message: "Product Deleted",
      });
    })
    .catch((error) => {
      res.json({ message: error.message });
    });
};
