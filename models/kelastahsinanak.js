"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class KelasTahsinAnak extends Model {
    static associate(models) {
      KelasTahsinAnak.hasOne(models.Jadwal, {
        foreignKey: "KelasTahsinAnakId",
      });

      KelasTahsinAnak.hasMany(models.PesertaTahsinAnak, {
        foreignKey: "KelasTahsinAnakId",
      });

      KelasTahsinAnak.belongsTo(models.PengajarTahsin, {
        foreignKey: "PengajarTahsinId",
      });
    }
  }
  KelasTahsinAnak.init(
    {
      kelas: DataTypes.STRING,
      catatan: DataTypes.STRING,
      PengajarTahsinId: DataTypes.UUID,
      status_aktif: DataTypes.BOOLEAN,
      kuota: DataTypes.INTEGER,
      jumlah_peserta: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "KelasTahsinAnak",
    }
  );
  return KelasTahsinAnak;
};
