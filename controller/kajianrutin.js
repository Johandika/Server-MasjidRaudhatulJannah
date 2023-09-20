const { KajianRutin, kategoriKajian } = require("../models");

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

      let dataKajianRutin = await KajianRutin.findAndCountAll(pagination);

      let totalPage = Math.ceil(dataKajianRutin.count / (limit ? limit : 50));

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data KajianRutin",
        data: dataKajianRutin.rows,
        totaldataKajianRutin: dataKajianRutin.count,
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

      const dataKajianRutin = await KajianRutin.findOne({
        where: {
          id,
        },
      });

      if (!dataKajianRutin) {
        throw { name: "Id Kajian Rutin Tidak Ditemukan" };
      }

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data KajianRutin",
        data: dataKajianRutin,
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
      const dataKajianRutin = await KajianRutin.create(body);

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menambahkan Data KajianRutin " + tema,
        data: dataKajianRutin,
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

      const dataKajianRutin = await KajianRutin.findOne({
        where: {
          id,
        },
      });

      if (!dataKajianRutin) {
        throw { name: "Id Kajian Rutin Tidak Ditemukan" };
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

      await KajianRutin.update(body, {
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Data KajianRutin",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const dataKajianRutin = await KajianRutin.findOne({
        where: {
          id,
        },
      });

      if (!dataKajianRutin) {
        throw { name: "Id Kajian Rutin Tidak Ditemukan" };
      }

      await KajianRutin.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data KajianRutin",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
