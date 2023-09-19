'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DokumentasiKegiatanKhusus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DokumentasiKegiatanKhusus.init({
    dokumentasi_kegiatan_khusus: DataTypes.STRING,
    KegiatanKhususId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'DokumentasiKegiatanKhusus',
  });
  return DokumentasiKegiatanKhusus;
};