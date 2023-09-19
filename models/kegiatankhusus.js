'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KegiatanKhusus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  KegiatanKhusus.init({
    tema: DataTypes.STRING,
    penanggung_jawab: DataTypes.STRING,
    lokasi: DataTypes.STRING,
    desktipsi: DataTypes.TEXT,
    catatan: DataTypes.TEXT,
    cover_image: DataTypes.STRING,
    status_aktif: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'KegiatanKhusus',
  });
  return KegiatanKhusus;
};