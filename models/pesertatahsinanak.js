'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PesertaTahsinAnak extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PesertaTahsinAnak.init({
    nama_ayah: DataTypes.STRING,
    nama_ibu: DataTypes.STRING,
    nama_anak: DataTypes.STRING,
    umur_anak: DataTypes.INTEGER,
    telepon: DataTypes.STRING,
    alamat: DataTypes.STRING,
    baca_quran: DataTypes.BOOLEAN,
    status_aktif: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'PesertaTahsinAnak',
  });
  return PesertaTahsinAnak;
};