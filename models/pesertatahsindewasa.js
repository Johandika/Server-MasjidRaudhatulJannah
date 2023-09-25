"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PesertaTahsinDewasa extends Model {
    static associate(models) {
      PesertaTahsinDewasa.belongsTo(models.KelasTahsinDewasa, {
        foreignKey: "KelasTahsinDewasaId",
      });
    }
  }
  PesertaTahsinDewasa.init(
    {
      nama: DataTypes.STRING,
      telepon: DataTypes.STRING,
      alamat: DataTypes.STRING,
      pekerjaan: DataTypes.STRING,
      umur: DataTypes.INTEGER,
      status_aktif: DataTypes.BOOLEAN,
      KelasTahsinDewasaId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "PesertaTahsinDewasa",
    }
  );
  return PesertaTahsinDewasa;
};
