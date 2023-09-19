"use strict";

const dataHari = require("../data/hari.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    dataHari.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Haris", dataHari, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Haris", null);
  },
};
