'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DokumentasiKegiatan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DokumentasiKegiatan.init({
    dokumentasi_kegiatan: DataTypes.STRING,
    KegiatanId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'DokumentasiKegiatan',
  });
  return DokumentasiKegiatan;
};