"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class KajianRutin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  KajianRutin.init(
    {
      nama_ustadz: DataTypes.STRING,
      tema: DataTypes.STRING,
      catatan: DataTypes.TEXT,
      status_aktif: DataTypes.BOOLEAN,
      KategoriKajianId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "KajianRutin",
    }
  );
  return KajianRutin;
};
