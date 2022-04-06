import Category from "../models/categoryModel.js";

export const getAllCategory = async (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 5;

  let query = {};
  query.offset = (parseInt(currentPage) - 1) * parseInt(perPage);
  query.limit = parseInt(perPage);

  Category.findAndCountAll(query)
    .then((result) => {
      res.status(200).json({
        message: "Success get Data Category",
        data: result.rows,
        total_data: result.count,
        per_page: parseInt(perPage),
        current_page: parseInt(currentPage),
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

export const getCategoryById = async (req, res) => {
  try {
    const product = await Category.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(product[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createCategory = async (req, res) => {
  const payload = {
    name: req.body.name,
  };
  Category.create(payload)
    .then((result) => {
      res.status(200).json({
        message: "Category Created",
      });
    })
    .catch((error) => {
      res.json({ message: error.message });
    });
};

export const updateCategory = async (req, res) => {
  const payload = {
    name: req.body.name,
  };
  Category.update(payload, {
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      res.status(200).json({
        message: "Category Updated",
      });
    })
    .catch((error) => {
      res.json({ message: error.message });
    });
};

export const deleteCategory = async (req, res) => {
  Category.destroy({ where: { id: req.params.id } })
    .then((result) => {
      res.status(200).json({
        message: "Category Deleted",
      });
    })
    .catch((error) => {
      res.json({ message: error.message });
    });
};
