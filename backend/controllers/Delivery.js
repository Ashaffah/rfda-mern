import Delivery from "../models/deliveryModel.js";

export const getAllKurir = async (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 5;

  console.log("currentPage", currentPage)
  console.log("perPage", perPage)
  Delivery.findAndCountAll({
    // offset: (parseInt(currentPage) - 1) * parseInt(perPage),
    // limit: parseInt(perPage)
  })
    .then(result => {
      res.status(200).json({
        message: 'Success get Data Delivery',
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

export const getKurirById = async (req, res) => {
  try {
    const product = await Delivery.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(product[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};
