"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UangKeluar extends Model {
    static associate(models) {
      UangKeluar.belongsTo(models.RekeningDonasi, {
        foreignKey: "RekeningDonasiId",
      });
    }
  }
  UangKeluar.init(
    {
      total: DataTypes.FLOAT,
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
