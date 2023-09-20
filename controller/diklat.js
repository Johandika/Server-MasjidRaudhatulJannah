const { Diklat } = require("../models");

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
            { tema: { [Op.iLike]: `%${search}%` } },
            { pemateri: { [Op.iLike]: `%${search}%` } },
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

      let dataDiklat = await Diklat.findAndCountAll(pagination);

      let totalPage = Math.ceil(dataDiklat.count / (limit ? limit : 50));

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Diklat",
        data: dataDiklat.rows,
        totaldataDiklat: dataDiklat.count,
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

      const dataDiklat = await Diklat.findOne({
        where: {
          id,
        },
      });

      if (!dataDiklat) {
        throw { name: "Id Diklat Tidak Ditemukan" };
      }

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Diklat",
        data: dataDiklat,
      });
    } catch (error) {
      next(error);
    }
  }

  // CREATE
  static async craete(req, res, next) {
    try {
      const { tema, waktu, pemateri, biaya, catatan, kuota } = req.body;
      const dataDiklat = await Diklat.create({
        tema,
        waktu,
        pemateri,
        biaya,
        catatan,
        kuota,
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menambahkan Data Diklat " + tema,
        data: dataDiklat,
      });
    } catch (error) {
      next(error);
    }
  }

  // UDPATE
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { tema, waktu, pemateri, biaya, catatan, kuota } = req.body;

      const dataDiklat = await Diklat.findOne({
        where: {
          id,
        },
      });

      if (!dataDiklat) {
        throw { name: "Id Diklat Tidak Ditemukan" };
      }

      await Diklat.update(
        {
          tema,
          waktu,
          pemateri,
          biaya,
          catatan,
          kuota,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Data Diklat",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const dataDiklat = await Diklat.findOne({
        where: {
          id,
        },
      });

      if (!dataDiklat) {
        throw { name: "Id Diklat Tidak Ditemukan" };
      }

      await Diklat.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Diklat",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
