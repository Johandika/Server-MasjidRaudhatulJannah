"use strict";
const { Model } = require("sequelize");
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
      HariId: DataTypes.UUID,
      KelasTahsinDewasaId: DataTypes.UUID,
      KelasTahsinAnak: DataTypes.UUID,
      KajianRutinId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Jadwal",
    }
  );
  return Jadwal;
};
