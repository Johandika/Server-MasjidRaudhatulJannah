'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kajian extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Kajian.init({
    tipe: DataTypes.STRING,
    nama_ustadz: DataTypes.STRING,
    nama_penerjemah: DataTypes.STRING,
    waktu: DataTypes.DATE,
    tema: DataTypes.STRING,
    catatan: DataTypes.STRING,
    informasi: DataTypes.TEXT,
    status_aktif: DataTypes.BOOLEAN,
    link: DataTypes.TEXT,
    KategoriKajianId: DataTypes.UUID,
    UstadzId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Kajian',
  });
  return Kajian;
};