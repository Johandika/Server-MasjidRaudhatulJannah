"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class KategoriKajian extends Model {
    static associate(models) {
      KategoriKajian.hasMany(models.Kajian, {
        foreignKey: "KategoriKajianId",
      });

      KategoriKajian.hasMany(models.Kajian, {
        foreignKey: "KategoriKajianId",
      });
    }
  }
  KategoriKajian.init(
    {
      nama: DataTypes.STRING,
      catatan: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "KategoriKajian",
    }
  );
  return KategoriKajian;
};
