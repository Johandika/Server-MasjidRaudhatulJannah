"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RekeningDonasi extends Model {
    static associate(models) {
      RekeningDonasi.hasMany(models.UangKeluar, {
        foreignKey: "RekeningDonasiId",
      });
      RekeningDonasi.hasMany(models.UangMasuk, {
        foreignKey: "RekeningDonasiId",
      });
    }
  }
  RekeningDonasi.init(
    {
      atas_nama: DataTypes.STRING,
      nomor_rekening: DataTypes.STRING,
      catatan: DataTypes.TEXT,
      nama_bank: DataTypes.STRING,
      saldo: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "RekeningDonasi",
    }
  );
  return RekeningDonasi;
};
