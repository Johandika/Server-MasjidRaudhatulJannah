"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Divisi extends Model {
    static associate(models) {
      Divisi.hasMany(models.Layanan, {
        foreignKey: "DivisiId",
      });
    }
  }
  Divisi.init(
    {
      nama: DataTypes.STRING,
      penanggung_jawab: DataTypes.STRING,
      telepon: DataTypes.STRING,
      deskripsi: DataTypes.TEXT,
      catatan: DataTypes.TEXT,
      status_aktif: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Divisi",
    }
  );
  return Divisi;
};
