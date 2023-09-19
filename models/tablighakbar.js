'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TablighAkbar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TablighAkbar.init({
    nama_ustadz: DataTypes.STRING,
    nama_penerjemah: DataTypes.STRING,
    waktu: DataTypes.DATE,
    tema: DataTypes.STRING,
    catatan: DataTypes.TEXT,
    status_aktif: DataTypes.BOOLEAN,
    KategoriKajianId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'TablighAkbar',
  });
  return TablighAkbar;
};