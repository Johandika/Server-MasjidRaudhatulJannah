"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Jadwal extends Model {
    static associate(models) {
      Jadwal.belongsTo(models.KelasTahsinDewasa, {
        foreignKey: "KelasTahsinDewasaId",
      });

      Jadwal.belongsTo(models.KelasTahsinAnak, {
        foreignKey: "KelasTahsinAnakId",
      });

      Jadwal.belongsTo(models.Kajian, {
        foreignKey: "KajianId",
      });
    }
  }
  Jadwal.init(
    {
      id: {
        allowNull: true,
        unique: true,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },
      hari: DataTypes.STRING,
      KelasTahsinDewasaId: DataTypes.UUID,
      KelasTahsinAnakId: DataTypes.UUID,
      KajianId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Jadwal",
    }
  );
  return Jadwal;
};
