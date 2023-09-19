"use strict";

const dataKategoriKajian = require("../data/kategorikajian.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    dataKategoriKajian.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("KategoriKajians", dataKategoriKajian, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("KategoriKajians", null);
  },
};
