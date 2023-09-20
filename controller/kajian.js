const { Kajian, kategoriKajian } = require("../models");

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
            { nama_ustadz: { [Op.iLike]: `%${search}%` } },
            { tema: { [Op.iLike]: `%${search}%` } },
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

      let dataKajian = await Kajian.findAndCountAll(pagination);

      let totalPage = Math.ceil(dataKajian.count / (limit ? limit : 50));

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Kajian",
        data: dataKajian.rows,
        totaldataKajian: dataKajian.count,
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

      const dataKajian = await Kajian.findOne({
        where: {
          id,
        },
      });

      if (!dataKajian) {
        throw { name: "Id Kajian Tidak Ditemukan" };
      }

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Kajian",
        data: dataKajian,
      });
    } catch (error) {
      next(error);
    }
  }

  // CREATE
  static async craete(req, res, next) {
    try {
      const { nama_ustadz, tema, catatan, kategoriKajianId } = req.body;

      let body = {
        nama_ustadz,
        tema,
        catatan,
      };

      if (kategoriKajianId) {
        const data = await kategoriKajian.findOne({
          where: {
            id: kategoriKajianId,
          },
        });

        if (!data) {
          throw { name: "Id Kategori Kajian Tidak Ditemukan" };
        } else {
          body.kategoriKajianId = kategoriKajianId;
        }
      }
      const dataKajian = await Kajian.create(body);

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menambahkan Data Kajian " + tema,
        data: dataKajian,
      });
    } catch (error) {
      next(error);
    }
  }

  // UDPATE
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { nama_ustadz, tema, catatan, kategoriKajianId } = req.body;

      const dataKajian = await Kajian.findOne({
        where: {
          id,
        },
      });

      if (!dataKajian) {
        throw { name: "Id Kajian Tidak Ditemukan" };
      }

      let body = {
        nama_ustadz,
        tema,
        catatan,
      };

      if (kategoriKajianId) {
        const data = await kategoriKajian.findOne({
          where: {
            id: kategoriKajianId,
          },
        });

        if (!data) {
          throw { name: "Id Kategori Kajian Tidak Ditemukan" };
        } else {
          body.kategoriKajianId = kategoriKajianId;
        }
      }

      await Kajian.update(body, {
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Data Kajian",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const dataKajian = await Kajian.findOne({
        where: {
          id,
        },
      });

      if (!dataKajian) {
        throw { name: "Id Kajian Tidak Ditemukan" };
      }

      await Kajian.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Kajian",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
