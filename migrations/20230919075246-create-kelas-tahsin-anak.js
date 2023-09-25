"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    );
    await queryInterface.createTable("KelasTahsinAnaks", {
      id: {
        allowNull: true,
        unique: true,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },
      kelas: {
        type: Sequelize.STRING,
      },
      catatan: {
        type: Sequelize.STRING,
      },
      PengajarTahsinId: {
        type: Sequelize.UUID,
        references: {
          model: "PengajarTahsins",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      status_aktif: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      kuota: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("KelasTahsinAnaks");
  },
};
