"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class KelasTahsinDewasa extends Model {
    static associate(models) {
      KelasTahsinDewasa.hasOne(models.Jadwal, {
        foreignKey: "KelasTahsinDewasaId",
      });

      KelasTahsinDewasa.hasMany(models.PesertaTahsinDewasa, {
        foreignKey: "KelasTahsinDewasaId",
      });

      KelasTahsinDewasa.belongsTo(models.PengajarTahsin, {
        foreignKey: "PengajarTahsinId",
      });
    }
  }
  KelasTahsinDewasa.init(
    {
      kelas: DataTypes.STRING,
      tipe_kelas: DataTypes.STRING,
      catatan: DataTypes.STRING,
      PengajarTahsinId: DataTypes.UUID,
      status_aktif: DataTypes.BOOLEAN,
      kuota: DataTypes.INTEGER,
      jumlah_peserta: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "KelasTahsinDewasa",
    }
  );
  return KelasTahsinDewasa;
};
