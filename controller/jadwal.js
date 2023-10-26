const {
  PengajarTahsin,
  KelasTahsinDewasa,
  KelasTahsinAnak,
  PesertaTahsinDewasa,
  PesertaTahsinAnak,
  Sequelize,
} = require("../models");
const moment = require("moment");
const { Op } = require("sequelize");

class Controller {
  // GET ALL
  static async getAll(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  // GET ONE
  static async getOne(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  // CREATE
  static async craete(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  // UDPATE
  static async update(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  // UDPATE STATUS
  static async updateStatus(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  static async delete(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
