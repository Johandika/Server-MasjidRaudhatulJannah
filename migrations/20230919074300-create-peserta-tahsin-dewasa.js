"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    );
    await queryInterface.createTable("PesertaTahsinDewasas", {
      id: {
        allowNull: true,
        unique: true,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },
      nama: {
        type: Sequelize.STRING,
      },
      telepon: {
        type: Sequelize.STRING,
      },
      alamat: {
        type: Sequelize.STRING,
      },
      pekerjaan: {
        type: Sequelize.STRING,
      },
      umur: {
        type: Sequelize.INTEGER,
      },
      status_aktif: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
    await queryInterface.dropTable("PesertaTahsinDewasas");
  },
};
