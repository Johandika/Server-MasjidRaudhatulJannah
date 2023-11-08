"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LinkKajianRutin extends Model {
    static associate(models) {
      LinkKajianRutin.belongsTo(models.Kajian, {
        foreignKey: "KajianId",
      });
    }
  }
  LinkKajianRutin.init(
    {
      sub_tema: DataTypes.STRING,
      link_kajian: DataTypes.TEXT,
      waktu: DataTypes.DATE,
      KajianId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "LinkKajianRutin",
    }
  );
  return LinkKajianRutin;
};
