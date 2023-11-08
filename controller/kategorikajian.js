const {
  KategoriKajian,
  Kajian,
  Jadwal,
  Ustadz,
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
          // {
          //   model: Kajian,
          //   include: [
          //     {
          //       model: Jadwal,
          //     },
          //     {
          //       model: Ustadz,
          //     },
          //   ],
          // },
        ],
        order: [["nama", "ASC"]],
      };

      if (limit) {
        pagination.limit = limit;
      }

      if (page && limit) {
        pagination.offset = (page - 1) * limit;
      }

      if (search) {
        pagination.where = {
          [Op.or]: [{ nama: { [Op.iLike]: `%${search}%` } }],
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

      let dataKategoriKajian = await KategoriKajian.findAndCountAll(pagination);

      let totalPage = Math.ceil(
        dataKategoriKajian.count / (limit ? limit : 50)
      );

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Kategori Kajian",
        data: dataKategoriKajian.rows,
        totaldataKategoriKajian: dataKategoriKajian.count,
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

      const dataKategoriKajian = await KategoriKajian.findOne({
        where: {
          id,
        },
        // include: [
        //   {
        //     model: Kajian,
        //     include: [
        //       {
        //         model: Jadwal,
        //       },
        //       {
        //         model: Ustadz,
        //       },
        //     ],
        //   },
        // ],
      });

      if (!dataKategoriKajian) {
        throw { name: "Id Kategori Kajian Tidak Ditemukan" };
      }

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Kategori Kajian",
        data: dataKategoriKajian,
      });
    } catch (error) {
      next(error);
    }
  }

  // CREATE
  static async craete(req, res, next) {
    try {
      const { nama, catatan } = req.body;

      let body = {
        nama,
        catatan,
      };

      const dataKategoriKajian = await KategoriKajian.create(body);

      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Menambahkan Data Kategori Kajian",
        data: dataKategoriKajian,
      });
    } catch (error) {
      next(error);
    }
  }

  // UDPATE
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { nama, catatan } = req.body;

      const dataKategoriKajian = await KategoriKajian.findOne({
        where: {
          id,
        },
      });

      if (!dataKategoriKajian) {
        throw { name: "Id Kategori Kajian Tidak Ditemukan" };
      }

      let body = {
        nama,
        catatan,
      };

      await KategoriKajian.update(body, {
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Data Kategori Kajian",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const dataKategoriKajian = await KategoriKajian.findOne({
        where: {
          id,
        },
      });

      if (!dataKategoriKajian) {
        throw { name: "Id Kategori Kajian Tidak Ditemukan" };
      }

      await KategoriKajian.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Kategori Kajian",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
