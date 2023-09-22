"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PesertaDiklat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PesertaDiklat.init(
    {
      nama: DataTypes.STRING,
      telepon: DataTypes.STRING,
      alamat: DataTypes.TEXT,
      pekerjaan: DataTypes.STRING,
      umur: DataTypes.INTEGER,
      file_bukti_pembayaran: DataTypes.STRING,
      status_pembayaran: DataTypes.STRING,
      status_aktif: DataTypes.BOOLEAN,
      DiklatId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "PesertaDiklat",
    }
  );
  return PesertaDiklat;
};
