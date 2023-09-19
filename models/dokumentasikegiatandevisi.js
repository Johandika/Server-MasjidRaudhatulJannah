'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DokumentasiKegiatanDevisi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DokumentasiKegiatanDevisi.init({
    dokumentasi_kegiatan_devisi: DataTypes.STRING,
    KegiatanDevisiId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'DokumentasiKegiatanDevisi',
  });
  return DokumentasiKegiatanDevisi;
};