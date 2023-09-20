const formatPhoneNumber = require("../helper/formatPhoneNumber");
const { PesertaTahsinDewasa } = require("../models");

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

      let dataPesertaTahsinDewasa = await PesertaTahsinDewasa.findAndCountAll(
        pagination
      );

      let totalPage = Math.ceil(
        dataPesertaTahsinDewasa.count / (limit ? limit : 50)
      );

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Peserta Tahsin Dewasa",
        data: dataPesertaTahsinDewasa.rows,
        totaldataPesertaTahsinDewasa: dataPesertaTahsinDewasa.count,
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

      const dataPesertaTahsinDewasa = await PesertaTahsinDewasa.findOne({
        where: {
          id,
        },
      });

      if (!dataPesertaTahsinDewasa) {
        throw { name: "Id Peserta Tahsin Dewasa Tidak Ditemukan" };
      }

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Peserta Tahsin Dewasa",
        data: dataPesertaTahsinDewasa,
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

      const dataPesertaTahsinDewasa = await PesertaTahsinDewasa.create(body);

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menambahkan Data Peserta Tahsin Dewasa",
        data: dataPesertaTahsinDewasa,
      });
    } catch (error) {
      next(error);
    }
  }

  // UDPATE
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const {
        nama_ayah,
        nama_ibu,
        nama_Dewasa,
        umur_Dewasa,
        telepon,
        alamat,
        baca_quran,
        status_aktif,
      } = req.body;

      const dataPesertaTahsinDewasa = await PesertaTahsinDewasa.findOne({
        where: {
          id,
        },
      });

      if (!dataPesertaTahsinDewasa) {
        throw { name: "Id Peserta Tahsin Dewasa Tidak Ditemukan" };
      }

      let body = {
        nama_ayah,
        nama_ibu,
        nama_Dewasa,
        umur_Dewasa,
        telepon: formatPhoneNumber(telepon),
        alamat,
        baca_quran,
        status_aktif,
      };

      await PesertaTahsinDewasa.update(body, {
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Data Peserta Tahsin Dewasa",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const dataPesertaTahsinDewasa = await PesertaTahsinDewasa.findOne({
        where: {
          id,
        },
      });

      if (!dataPesertaTahsinDewasa) {
        throw { name: "Id Peserta Tahsin Dewasa Tidak Ditemukan" };
      }

      await PesertaTahsinDewasa.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Peserta Tahsin Dewasa",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
