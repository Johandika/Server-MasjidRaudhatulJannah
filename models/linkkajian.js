"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LinkKajian extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LinkKajian.init(
    {
      tema: DataTypes.STRING,
      link: DataTypes.TEXT,
      catatan: DataTypes.TEXT,
      status_aktif: DataTypes.BOOLEAN,
      KategoriKajianId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "LinkKajian",
    }
  );
  return LinkKajian;
};
