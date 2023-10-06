"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Layanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
