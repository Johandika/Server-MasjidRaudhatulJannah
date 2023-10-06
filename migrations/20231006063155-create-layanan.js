"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    );
    await queryInterface.createTable("Layanans", {
      id: {
        allowNull: true,
        unique: true,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },
      title: {
        type: Sequelize.STRING,
      },
      sub_title: {
        type: Sequelize.STRING,
      },
      waktu: {
        type: Sequelize.DATE,
      },
      lokasi: {
        type: Sequelize.TEXT,
      },
      informasi: {
        type: Sequelize.TEXT,
      },
      deskripsi: {
        type: Sequelize.TEXT,
      },
      gambar_layanan: {
        type: Sequelize.STRING,
      },
      deskripsi_gambar: {
        type: Sequelize.STRING,
      },
      DivisiId: {
        type: Sequelize.UUID,
      },
      status_aktif: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
    await queryInterface.dropTable("Layanans");
  },
};
