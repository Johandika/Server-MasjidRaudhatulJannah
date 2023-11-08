const formatPhoneNumber = require("../helper/formatPhoneNumber");
const ValidateNumber = require("../helper/validateNumber");
const {
  Ustadz,
  Kajian,
  KategoriKajian,
  Jadwal,
  Sequelize,
} = require("../models");
const moment = require("moment");
const { Op } = require("sequelize");

class Controller {
  // GET ALL
  static async getAll(req, res, next) {
    try {
      const { limit, page, search, tanggal, status } = req.query;

      let pagination = {
        include: [
          {
            model: Kajian,
            // include: [
            //   {
            //     model: KategoriKajian,
            //   },
            //   {
            //     model: Jadwal,
            //   },
            // ],
          },
        ],
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

      let dataUstadz = await Ustadz.findAndCountAll(pagination);

      let totalPage = Math.ceil(dataUstadz.count / (limit ? limit : 50));

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Ustadz",
        data: dataUstadz.rows,
        totaldataUstadz: dataUstadz.count,
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

      const dataUstadz = await Ustadz.findOne({
        where: {
          id,
        },
        include: [
          {
            model: Kajian,
            // include: [
            //   {
            //     model: KategoriKajian,
            //   },
            //   {
            //     model: Jadwal,
            //   },
            // ],
          },
        ],
      });

      if (!dataUstadz) {
        throw { name: "Id Ustadz Tidak Ditemukan" };
      }

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Ustadz",
        data: dataUstadz,
      });
    } catch (error) {
      next(error);
    }
  }

  // CREATE
  static async craete(req, res, next) {
    try {
      const { nama, telepon, alamat, pekerjaan, umur } = req.body;

      let body = {
        nama,
        telepon: formatPhoneNumber(telepon),
        alamat,
        pekerjaan,
        umur: ValidateNumber(umur),
      };

      const dataUstadz = await Ustadz.create(body);

      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Menambahkan Data Ustadz",
        data: dataUstadz,
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

      const dataUstadz = await Ustadz.findOne({
        where: {
          id,
        },
      });

      if (!dataUstadz) {
        throw { name: "Id Ustadz Tidak Ditemukan" };
      }

      let body = {
        nama,
        telepon: formatPhoneNumber(telepon),
        alamat,
        pekerjaan,
        umur: ValidateNumber(umur),
        status_aktif,
      };

      await Ustadz.update(body, {
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Data Ustadz",
      });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE STATUS AKTIF
  static async updateStatusAktif(req, res, next) {
    try {
      const { id } = req.params;
      const { status_aktif } = req.body;

      const dataUstadz = await Ustadz.findOne({
        where: {
          id,
        },
      });

      if (!dataUstadz) {
        throw { name: "Id Ustadz Tidak Ditemukan" };
      }

      await Ustadz.update(
        { status_aktif },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Status Aktif Ustadz",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const dataUstadz = await Ustadz.findOne({
        where: {
          id,
        },
      });

      if (!dataUstadz) {
        throw { name: "Id Ustadz Tidak Ditemukan" };
      }

      await Ustadz.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Ustadz",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
