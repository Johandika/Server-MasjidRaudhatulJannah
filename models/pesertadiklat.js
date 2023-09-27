"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PesertaDiklat extends Model {
    static associate(models) {
      PesertaDiklat.belongsTo(models.Diklat, {
        foreignKey: "DiklatId",
      });
    }
  }
  PesertaDiklat.init(
    {
      nama: DataTypes.STRING,
      telepon: DataTypes.STRING,
      alamat: DataTypes.TEXT,
      pekerjaan: DataTypes.STRING,
      umur: DataTypes.INTEGER,
      file_bukti_pembayaran: DataTypes.STRING,
      status_pembayaran: DataTypes.STRING,
      status_aktif: DataTypes.BOOLEAN,
      DiklatId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "PesertaDiklat",
    }
  );
  return PesertaDiklat;
};
