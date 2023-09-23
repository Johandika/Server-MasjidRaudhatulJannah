"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Kegiatan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Kegiatan.init(
    {
      tema: DataTypes.STRING,
      penanggung_jawab: DataTypes.STRING,
      waktu: DataTypes.DATE,
      lokasi: DataTypes.STRING,
      cover_image: DataTypes.STRING,
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
