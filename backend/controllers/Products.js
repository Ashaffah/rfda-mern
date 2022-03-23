import Product from "../models/productModel.js";

export const getAllProducts = async (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 5;
  const category = req.query.category;
  const delivery = req.query.delivery;

  Product.findAndCountAll({
    where: category ? {
      category: category
    } : null,
    attributes: { exclude: ['description'] },
    offset: (parseInt(currentPage) - 1) * parseInt(perPage),
    limit: parseInt(perPage)
  })
    .then(result => {
      res.status(200).json({
        message: 'Success get Data Product',
        data: result.rows,
        total_data: result.count,
        per_page: parseInt(perPage),
        current_page: parseInt(currentPage),
      })
    })
    .catch(err => {
      next(err);
    })
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(product[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getProductByName = async (req, res) => {
  try {
    const product = await Product.findAll({
      where: {
        code: req.params.name,
      },
    });
    console.log("return", product)
    res.json(product[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const payload = {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      delivery: req.body.delivery,
      image: req.file.path,
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
    await Product.update(req.body, {
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
  try {
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Product Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
