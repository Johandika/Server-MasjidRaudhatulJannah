"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    );
    await queryInterface.createTable("Diklats", {
      id: {
        allowNull: true,
        unique: true,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },
      tema: {
        type: Sequelize.STRING,
      },
      lokasi: {
        type: Sequelize.STRING,
      },
      fasilitas: {
        type: Sequelize.STRING,
      },
      waktu: {
        type: Sequelize.DATE,
      },
      pemateri: {
        type: Sequelize.STRING,
      },
      biaya: {
        type: Sequelize.FLOAT,
      },
      catatan: {
        type: Sequelize.TEXT,
      },
      kuota: {
        type: Sequelize.INTEGER,
      },
      jumlah_peserta: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      poster_diklat: {
        type: Sequelize.STRING,
      },
      status_aktif: {
        type: Sequelize.BOOLEAN,
        dialectTypes: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Diklats");
  },
};
