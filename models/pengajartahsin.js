"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PengajarTahsin extends Model {
    static associate(models) {
      PengajarTahsin.hasMany(models.KelasTahsinDewasa, {
        foreignKey: "PengajarTahsinId",
      });

      PengajarTahsin.hasMany(models.KelasTahsinAnak, {
        foreignKey: "PengajarTahsinId",
      });
    }
  }
  PengajarTahsin.init(
    {
      nama: DataTypes.STRING,
      telepon: DataTypes.STRING,
      alamat: DataTypes.TEXT,
      pekerjaan: DataTypes.STRING,
      umur: DataTypes.INTEGER,
      status_aktif: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "PengajarTahsin",
    }
  );
  return PengajarTahsin;
};
