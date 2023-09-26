"use strict";

const dataRekeningDonasi = require("../data/rekening.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    dataRekeningDonasi.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("RekeningDonasis", dataRekeningDonasi, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("RekeningDonasis", null);
  },
};
