const { Op } = require("sequelize");
const formatPhoneNumber = require("../helper/formatPhoneNumber");
const remove = require("../helper/removeFile");
const { PesertaDiklat, Diklat, sequelize, Sequelize } = require("../models");

class Controller {
  // GET ALL
  static async getAll(req, res, next) {
    try {
      const { limit, page, search, tanggal, status } = req.query;

      let pagination = {
        include: [],
        order: [["createdAt", "DESC"]],
      };

      if (limit) {
        pagination.limit = limit;
      }

      if (page && limit) {
        pagination.offset = (page - 1) * limit;
      }

      if (search) {
        pagination.where = {
          [Op.or]: [
            { nama: { [Op.iLike]: `%${search}%` } },
            { telepon: { [Op.iLike]: `%${search}%` } },
          ],
        };
      }

      if (tanggal) {
        const pagi = moment().format(`${tanggal} 00:00`);
        const masuk = moment().format(`${tanggal} 23:59`);
        pagination.where = {
          createdAt: {
            [Op.between]: [pagi, masuk],
          },
        };
      }

      let dataPesertaDiklat = await PesertaDiklat.findAndCountAll(pagination);

      let totalPage = Math.ceil(dataPesertaDiklat.count / (limit ? limit : 50));

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Peserta Diklat",
        data: dataPesertaDiklat.rows,
        totaldataPesertaDiklat: dataPesertaDiklat.count,
        totalPage: totalPage,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET ONE
  static async getOne(req, res, next) {
    try {
      const { id } = req.params;

      const dataPesertaDiklat = await PesertaDiklat.findOne({
        where: {
          id,
        },
      });

      if (!dataPesertaDiklat) {
        throw { name: "Id Peserta Diklat Tidak Ditemukan" };
      }

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Peserta Diklat",
        data: dataPesertaDiklat,
      });
    } catch (error) {
      next(error);
    }
  }

  // CREATE
  static async craete(req, res, next) {
    try {
      const { nama, telepon, alamat, pekerjaan, umur, DiklatId } = req.body;

      let body = {
        nama,
        telepon: formatPhoneNumber(telepon),
        alamat,
        pekerjaan,
        umur,
        status_pembayaran: req.file ? "BELUM_VERIFIKASI" : "BELUM_DIBAYAR",
        file_bukti_pembayaran: req.file ? req.file.path : "",
      };

      if (DiklatId) {
        const data = await Diklat.findOne({
          where: {
            id: DiklatId,
          },
        });

        if (!data) {
          throw { name: "Id Peserta Diklat Tidak Ditemukan" };
        } else {
          body.DiklatId = DiklatId;
        }
      }

      const data = await Diklat.findOne({
        where: {
          id: DiklatId,
        },
      });

      const dataPesertaDiklat = await PesertaDiklat.create(body);

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menambahkan Data Peserta Diklat",
        data: dataPesertaDiklat,
      });
    } catch (error) {
      next(error);
    }
  }

  // UDPATE
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { nama, telepon, alamat, pekerjaan, umur, status_aktif } = req.body;

      const dataPesertaDiklat = await PesertaDiklat.findOne({
        where: {
          id,
        },
      });

      if (!dataPesertaDiklat) {
        throw { name: "Id Peserta Diklat Tidak Ditemukan" };
      }

      let body = {
        nama,
        telepon: formatPhoneNumber(telepon),
        alamat,
        pekerjaan,
        umur,
        status_aktif,
      };
      if (req.file) {
        remove(dataPesertaDiklat.file_bukti_pembayaran);
        body.file_bukti_pembayaran = req.file ? req.file.path : "";
      }

      await PesertaDiklat.update(body, {
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Data Peserta Diklat",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const dataPesertaDiklat = await PesertaDiklat.findOne({
        where: {
          id,
        },
      });

      if (!dataPesertaDiklat) {
        throw { name: "Id Peserta Diklat Tidak Ditemukan" };
      }

      await PesertaDiklat.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Peserta Diklat",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
