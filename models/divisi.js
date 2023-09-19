'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Divisi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Divisi.init({
    nama: DataTypes.STRING,
    penanggung_jawab: DataTypes.STRING,
    telepon: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    catatan: DataTypes.TEXT,
    status_aktif: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Divisi',
  });
  return Divisi;
};