"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    );
    await queryInterface.createTable("Kegiatans", {
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
      penanggung_jawab: {
        type: Sequelize.STRING,
      },
      waktu: {
        type: Sequelize.DATE,
      },
      lokasi: {
        type: Sequelize.STRING,
      },
      cover_image: {
        type: Sequelize.STRING,
      },
      catatan: {
        type: Sequelize.TEXT,
      },
      deskripsi: {
        type: Sequelize.TEXT,
      },
      link: {
        type: Sequelize.TEXT,
      },
      DivisiId: {
        type: Sequelize.UUID,
        references: {
          model: "Divisis",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
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
    await queryInterface.dropTable("Kegiatans");
  },
};
