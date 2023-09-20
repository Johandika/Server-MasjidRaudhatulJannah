const { Hari } = require("../models");

class Controller {
  // GET ALL
  static async getAll(req, res, next) {
    try {
      const dataHari = await Hari.findAll();

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Hari",
        data: dataHari,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
