'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PengajarTahsin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PengajarTahsin.init({
    nama: DataTypes.STRING,
    telepon: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    status_aktif: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'PengajarTahsin',
  });
  return PengajarTahsin;
};