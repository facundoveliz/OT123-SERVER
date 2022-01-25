const db = require("../models");

const { Categorie } = db;

exports.findAll = (req, res) => {
  Categorie.findAll({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Categories.",
      });
    });
};
