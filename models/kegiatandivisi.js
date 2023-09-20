"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class KegiatanDivisi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  KegiatanDivisi.init(
    {
      tema: DataTypes.STRING,
      waktu: DataTypes.DATE,
      deskripsi: DataTypes.TEXT,
      catatan: DataTypes.TEXT,
      cover_image: DataTypes.STRING,
      DivisiId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "KegiatanDivisi",
    }
  );
  return KegiatanDivisi;
};
