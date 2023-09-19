"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UangKeluar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UangKeluar.init(
    {
      total: DataTypes.INTEGER,
      waktu: DataTypes.DATE,
      keterangan: DataTypes.TEXT,
      informasi: DataTypes.TEXT,
      RekeningDonasiId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "UangKeluar",
    }
  );
  return UangKeluar;
};
