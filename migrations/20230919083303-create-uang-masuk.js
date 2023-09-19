"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    );
    await queryInterface.createTable("UangMasuks", {
      id: {
        allowNull: true,
        unique: true,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },
      total: {
        type: Sequelize.INTEGER,
      },
      waktu: {
        type: Sequelize.DATE,
      },
      keterangan: {
        type: Sequelize.TEXT,
      },
      informasi: {
        type: Sequelize.TEXT,
      },
      RekeningDonasiId: {
        type: Sequelize.UUID,
        references: {
          model: "RekeningDonasis",
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
    await queryInterface.dropTable("UangMasuks");
  },
};
