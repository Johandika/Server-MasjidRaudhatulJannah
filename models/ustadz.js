"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ustadz extends Model {
    static associate(models) {
      Ustadz.hasMany(models.Kajian, {
        foreignKey: "UstadzId",
      });
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
