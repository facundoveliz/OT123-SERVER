'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Slider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Slider.belongsTo(models.Organization, {
        foreignKey: 'id',
        targetKey: 'organizationId'
      })
    }
  };
  Slider.init({
    organizationId: DataTypes.INTEGER,
    image_url: DataTypes.STRING,
    order: DataTypes.INTEGER,
    text: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Slider',
  });
  return Slider;
};