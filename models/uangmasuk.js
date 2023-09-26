"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UangMasuk extends Model {
    static associate(models) {
      UangMasuk.belongsTo(models.RekeningDonasi, {
        foreignKey: "RekeningDonasiId",
      });
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
