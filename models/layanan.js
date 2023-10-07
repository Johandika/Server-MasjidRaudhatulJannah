"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Layanan extends Model {
    static associate(models) {
      Layanan.belongsTo(models.Divisi, {
        foreignKey: "DivisiId",
      });
    }
  }
  Layanan.init(
    {
      title: DataTypes.STRING,
      sub_title: DataTypes.STRING,
      waktu: DataTypes.DATE,
      lokasi: DataTypes.TEXT,
      informasi: DataTypes.TEXT,
      deskripsi: DataTypes.TEXT,
      gambar_layanan: DataTypes.STRING,
      deskripsi_gambar: DataTypes.STRING,
      DivisiId: DataTypes.UUID,
      status_aktif: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Layanan",
    }
  );
  return Layanan;
};
