"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class KelasTahsinDewasa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  KelasTahsinDewasa.init(
    {
      kelas: DataTypes.STRING,
      catatan: DataTypes.STRING,
      PengajarTahsinId: DataTypes.UUID,
      PesertaTahsinDewasaId: DataTypes.UUID,
      status_aktif: DataTypes.BOOLEAN,
      kuota: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "KelasTahsinDewasa",
    }
  );
  return KelasTahsinDewasa;
};
