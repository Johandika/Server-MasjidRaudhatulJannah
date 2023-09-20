"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Jadwal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
      KelasTahsinAnak: DataTypes.UUID,
      KajianId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Jadwal",
    }
  );
  return Jadwal;
};
