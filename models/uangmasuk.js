"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UangMasuk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UangMasuk.init(
    {
      total: DataTypes.FLOAT,
      waktu: DataTypes.DATE,
      keterangan: DataTypes.TEXT,
      informasi: DataTypes.TEXT,
      RekeningDonasiId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "UangMasuk",
    }
  );
  return UangMasuk;
};
