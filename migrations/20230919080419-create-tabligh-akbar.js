"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    );
    await queryInterface.createTable("TablighAkbars", {
      id: {
        allowNull: true,
        unique: true,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },
      nama_ustadz: {
        type: Sequelize.STRING,
      },
      nama_penerjemah: {
        type: Sequelize.STRING,
      },
      waktu: {
        type: Sequelize.DATE,
      },
      tema: {
        type: Sequelize.STRING,
      },
      catatan: {
        type: Sequelize.TEXT,
      },
      status_aktif: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      KategoriKajianId: {
        type: Sequelize.UUID,
        references: {
          model: "KategoriKajians",
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
    await queryInterface.dropTable("TablighAkbars");
  },
};
