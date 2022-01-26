"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Categorie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Categorie.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      deleteAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Categorie",
      createdAt: "createAt",
      updateAt: "updateAt",
      deleteAt: "deleteAt",
      paranoid: "true",
      timestamps: "true",
    }
  );
  return Categorie;
};
