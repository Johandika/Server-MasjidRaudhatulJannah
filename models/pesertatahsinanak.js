"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PesertaTahsinAnak extends Model {
    static associate(models) {
      PesertaTahsinAnak.belongsTo(models.KelasTahsinAnak, {
        foreignKey: "KelasTahsinAnakId",
      });
    }
  }
  PesertaTahsinAnak.init(
    {
      nama_ayah: DataTypes.STRING,
      nama_ibu: DataTypes.STRING,
      nama_anak: DataTypes.STRING,
      umur_anak: DataTypes.INTEGER,
      telepon: DataTypes.STRING,
      alamat: DataTypes.STRING,
      baca_quran: DataTypes.BOOLEAN,
      status_aktif: DataTypes.BOOLEAN,
      KelasTahsinAnakId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "PesertaTahsinAnak",
    }
  );
  return PesertaTahsinAnak;
};
