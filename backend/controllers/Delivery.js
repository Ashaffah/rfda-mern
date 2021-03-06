import Delivery from "../models/deliveryModel.js";

export const getAllKurir = async (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 5;

  let query = {}
  query.offset = (parseInt(currentPage) - 1) * parseInt(perPage);
  query.limit = parseInt(perPage);

  Delivery.findAndCountAll(query)
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

export const createKurir = async (req, res) => {
  const payload = {
    name: req.body.name
  };
  Delivery.create(payload)
    .then((result) => {
      res.status(200).json({
        message: "Delivery Created",
      });
    })
    .catch((error) => {
      res.json({ message: error.message });
    });
};

export const updateKurir = async (req, res) => {
  const payload = {
    name: req.body.name
  };
  Delivery.update(payload, {
    where: {
      id: req.params.id,
    }
  })
    .then((result) => {
      res.status(200).json({
        message: "Delivery Updated",
      });
    })
    .catch((error) => {
      res.json({ message: error.message });
    });
};

export const deleteKurir = async (req, res) => {
  Delivery.destroy({ where: { id: req.params.id } })
    .then((result) => {
      res.status(200).json({
        message: "Delivery Deleted",
      });
    })
    .catch((error) => {
      res.json({ message: error.message });
    });
};
