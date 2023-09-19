'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RekeningDonasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RekeningDonasi.init({
    atas_nama: DataTypes.STRING,
    nomor_rekening: DataTypes.STRING,
    catatan: DataTypes.TEXT,
    saldo: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'RekeningDonasi',
  });
  return RekeningDonasi;
};