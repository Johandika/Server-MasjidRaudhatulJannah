const remove = require("../helper/removeFile");
const { Layanan, Divisi, Sequelize } = require("../models");
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
            model: Divisi,
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
          [Op.or]: [{ title: { [Op.iLike]: `%${search}%` } }],
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

      let dataLayanan = await Layanan.findAndCountAll(pagination);

      let totalPage = Math.ceil(dataLayanan.count / (limit ? limit : 50));

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Layanan",
        data: dataLayanan.rows,
        totaldataLayanan: dataLayanan.count,
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
      const dataLayanan = await Layanan.findOne({
        where: {
          id,
        },
        include: [
          {
            model: Divisi,
          },
        ],
      });

      if (!dataLayanan) {
        throw { name: "Id Layanan Tidak Ditemukan" };
      }
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampailakan Data Layanan",
        data: dataLayanan,
      });
    } catch (error) {
      next(error);
    }
  }

  // CREATE
  static async create(req, res, next) {
    try {
      const {
        title,
        sub_title,
        waktu,
        lokasi,
        informasi,
        deskripsi,
        deskripsi_gambar,
        DivisiId,
      } = req.body;

      let body = {
        title,
        sub_title,
        waktu: waktu ? waktu : new Date(),
        lokasi,
        informasi,
        deskripsi,
        gambar_layanan: req.file ? req.file.path : "",
        deskripsi_gambar,
      };

      if (DivisiId) {
        const dataDivisi = await Divisi.findOne({
          where: {
            id: DivisiId,
          },
        });
        if (!dataDivisi) {
          throw { name: "Id Divisi Tidak Ditemukan" };
        }
        body.DivisiId = DivisiId;
      }

      const dataLayanan = await Layanan.create(body);

      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Membuat Data Layanan Baru",
        data: dataLayanan,
      });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const {
        title,
        sub_title,
        waktu,
        lokasi,
        informasi,
        deskripsi,
        deskripsi_gambar,
        DivisiId,
      } = req.body;

      const dataLayanan = await Layanan.findOne({
        where: {
          id,
        },
      });

      if (!dataLayanan) {
        throw { name: "Id Layanan Tidak Ditemukan" };
      }

      let body = {
        title,
        sub_title,
        waktu: waktu ? waktu : new Date(),
        lokasi,
        informasi,
        deskripsi,
        deskripsi_gambar,
      };

      if (DivisiId) {
        const dataDivisi = await Divisi.findOne({
          where: {
            id: DivisiId,
          },
        });
        if (!dataDivisi) {
          throw { name: "Id Divisi Tidak Ditemukan" };
        }
        body.DivisiId = DivisiId;
      }

      if (req.file) {
        remove(dataLayanan.gambar_layanan);
        body.gambar_layanan = req.file ? req.file.path : "";
      }

      await Layanan.update(body, {
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Data Layanan",
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

      const dataLayanan = await Layanan.findOne({
        where: {
          id,
        },
      });

      if (!dataLayanan) {
        throw { name: "Id Layanan Tidak Ditemukan" };
      }

      await Layanan.update(
        { status_aktif },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Status Aktif Layanan",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const dataLayanan = await Layanan.findOne({
        where: {
          id,
        },
      });

      if (!dataLayanan) {
        throw { name: "Id Layanan Tidak Ditemukan" };
      }

      remove(dataLayanan.gambar_layanan);

      await Layanan.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Layanan",
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Controller;
