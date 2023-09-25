const formatPhoneNumber = require("../helper/formatPhoneNumber");
const {
  PengajarTahsin,
  KelasTahsinAnak,
  KelasTahsinDewasa,
} = require("../models");

class Controller {
  // GET ALL
  static async getAll(req, res, next) {
    try {
      const { limit, page, search, tanggal, status } = req.query;

      let pagination = {
        include: [
          {
            model: KelasTahsinDewasa,
          },
          {
            model: KelasTahsinAnak,
          },
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

      let dataPengajarTahsin = await PengajarTahsin.findAndCountAll(pagination);

      let totalPage = Math.ceil(
        dataPengajarTahsin.count / (limit ? limit : 50)
      );

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Pengajar Tahsin",
        data: dataPengajarTahsin.rows,
        totaldataPengajarTahsin: dataPengajarTahsin.count,
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

      const dataPengajarTahsin = await PengajarTahsin.findOne({
        where: {
          id,
        },
        include: [
          {
            model: KelasTahsinDewasa,
          },
          {
            model: KelasTahsinAnak,
          },
        ],
      });

      if (!dataPengajarTahsin) {
        throw { name: "Id Pengajar Tahsin Tidak Ditemukan" };
      }

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Pengajar Tahsin",
        data: dataPengajarTahsin,
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
        umur,
      };

      const dataPengajarTahsin = await PengajarTahsin.create(body);

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menambahkan Data Pengajar Tahsin",
        data: dataPengajarTahsin,
      });
    } catch (error) {
      next(error);
    }
  }

  // UDPATE
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { nama, telepon, alamat, pekerjaan, umur } = req.body;

      const dataPengajarTahsin = await PengajarTahsin.findOne({
        where: {
          id,
        },
      });

      if (!dataPengajarTahsin) {
        throw { name: "Id Pengajar Tahsin Tidak Ditemukan" };
      }

      let body = {
        nama,
        telepon: formatPhoneNumber(telepon),
        alamat,
        pekerjaan,
        umur,
      };

      await PengajarTahsin.update(body, {
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Data Pengajar Tahsin",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const dataPengajarTahsin = await PengajarTahsin.findOne({
        where: {
          id,
        },
      });

      if (!dataPengajarTahsin) {
        throw { name: "Id Pengajar Tahsin Tidak Ditemukan" };
      }

      await PengajarTahsin.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Pengajar Tahsin",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
