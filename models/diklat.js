"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Diklat extends Model {
    static associate(models) {
      Diklat.hasMany(models.PesertaDiklat, {
        foreignKey: "DiklatId",
      });
    }
  }
  Diklat.init(
    {
      tema: DataTypes.STRING,
      lokasi: DataTypes.STRING,
      fasilitas: DataTypes.STRING,
      waktu: DataTypes.DATE,
      pemateri: DataTypes.STRING,
      biaya: DataTypes.FLOAT,
      catatan: DataTypes.TEXT,
      kuota: DataTypes.INTEGER,
      jumlah_peserta: DataTypes.INTEGER,
      poster_diklat: DataTypes.STRING,
      status_aktif: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Diklat",
    }
  );
  return Diklat;
};
