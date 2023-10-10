"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Kegiatan extends Model {
    static associate(models) {
      Kegiatan.belongsTo(models.Divisi, {
        foreignKey: "DivisiId",
      });
    }
  }
  Kegiatan.init(
    {
      tema: DataTypes.STRING,
      penanggung_jawab: DataTypes.STRING,
      waktu: DataTypes.DATE,
      lokasi: DataTypes.STRING,
      gambar_kegiatan: DataTypes.STRING,
      deskripsi_gambar: DataTypes.TEXT,
      catatan: DataTypes.TEXT,
      deskripsi: DataTypes.TEXT,
      link: DataTypes.TEXT,
      headline: DataTypes.BOOLEAN,
      status_aktif: DataTypes.BOOLEAN,
      DivisiId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Kegiatan",
    }
  );
  return Kegiatan;
};
