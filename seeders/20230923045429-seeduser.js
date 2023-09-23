"use strict";
let dataUser = require("../data/user.json");
let { hashingPassword } = require("../helper/helper");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    dataUser.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
      el.password = hashingPassword(el.password);
    });

    await queryInterface.bulkInsert("Users", dataUser, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null);
  },
};
