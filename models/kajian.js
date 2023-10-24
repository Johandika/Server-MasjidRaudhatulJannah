"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Kajian extends Model {
    static associate(models) {
      Kajian.belongsTo(models.KategoriKajian, {
        foreignKey: "KategoriKajianId",
      });

      Kajian.belongsTo(models.Ustadz, {
        foreignKey: "UstadzId",
      });

      Kajian.hasOne(models.Jadwal, {
        foreignKey: "KajianId",
      });

      Kajian.hasOne(models.LinkKajianRutin, {
        foreignKey: "KajianId",
      });
    }
  }
  Kajian.init(
    {
      tipe: DataTypes.STRING,
      nama_ustadz: DataTypes.STRING,
      nama_penerjemah: DataTypes.STRING,
      waktu: DataTypes.DATE,
      tema: DataTypes.STRING,
      catatan: DataTypes.STRING,
      waktu_kajian_rutin: DataTypes.STRING,
      status_aktif: DataTypes.BOOLEAN,
      link: DataTypes.TEXT,
      poster_kajian: DataTypes.STRING,
      KategoriKajianId: DataTypes.UUID,
      UstadzId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Kajian",
    }
  );
  return Kajian;
};
