import Category from "../models/categoryModel.js";

export const getAllCategory = async (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 5;

  let query = {}

  Category.findAndCountAll(query)
    .then(result => {
      res.status(200).json({
        message: 'Success get Data Category',
        data: result.rows,
        total_data: result.count,
        per_page: parseInt(perPage),
        current_page: parseInt(currentPage),
      })
    })
    .catch(err => {
      console.log(err);
      next(err);
    })
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
