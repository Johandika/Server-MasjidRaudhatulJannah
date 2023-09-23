"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    );
    await queryInterface.createTable("Kajians", {
      id: {
        allowNull: true,
        unique: true,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },
      tipe: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
      },
      informasi: {
        type: Sequelize.TEXT,
      },
      status_aktif: {
        type: Sequelize.BOOLEAN,
      },
      link: {
        type: Sequelize.TEXT,
      },
      poster_kajian: {
        type: Sequelize.STRING,
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
      UstadzId: {
        type: Sequelize.UUID,
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
    await queryInterface.dropTable("Kajians");
  },
};
