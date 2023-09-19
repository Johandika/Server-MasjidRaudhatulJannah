"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    );
    await queryInterface.createTable("Jadwals", {
      id: {
        allowNull: true,
        unique: true,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },
      HariId: {
        type: Sequelize.UUID,
        references: {
          model: "Haris",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      KelasTahsinDewasaId: {
        type: Sequelize.UUID,
        references: {
          model: "KelasTahsinDewasas",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      KelasTahsinAnak: {
        type: Sequelize.UUID,
        references: {
          model: "KelasTahsinAnaks",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      KajianRutinId: {
        type: Sequelize.UUID,
        references: {
          model: "KajianRutins",
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
    await queryInterface.dropTable("Jadwals");
  },
};
