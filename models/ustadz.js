"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ustadz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ustadz.init(
    {
      nama: DataTypes.STRING,
      telepon: DataTypes.STRING,
      alamat: DataTypes.STRING,
      pekerjaan: DataTypes.STRING,
      umur: DataTypes.INTEGER,
      status_aktif: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Ustadz",
    }
  );
  return Ustadz;
};
