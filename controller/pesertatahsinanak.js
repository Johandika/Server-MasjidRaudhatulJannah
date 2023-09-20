const formatPhoneNumber = require("../helper/formatPhoneNumber");
const { PesertaTahsinAnak } = require("../models");

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
            { nama_ayah: { [Op.iLike]: `%${search}%` } },
            { nama_ibu: { [Op.iLike]: `%${search}%` } },
            { nama_anak: { [Op.iLike]: `%${search}%` } },
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

      let dataPesertaTahsinAnak = await PesertaTahsinAnak.findAndCountAll(
        pagination
      );

      let totalPage = Math.ceil(
        dataPesertaTahsinAnak.count / (limit ? limit : 50)
      );

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Peserta Tahsin Anak",
        data: dataPesertaTahsinAnak.rows,
        totaldataPesertaTahsinAnak: dataPesertaTahsinAnak.count,
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

      const dataPesertaTahsinAnak = await PesertaTahsinAnak.findOne({
        where: {
          id,
        },
      });

      if (!dataPesertaTahsinAnak) {
        throw { name: "Id Peserta Tahsin Anak Tidak Ditemukan" };
      }

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Peserta Tahsin Anak",
        data: dataPesertaTahsinAnak,
      });
    } catch (error) {
      next(error);
    }
  }

  // CREATE
  static async craete(req, res, next) {
    try {
      const {
        nama_ayah,
        nama_ibu,
        nama_anak,
        umur_anak,
        telepon,
        alamat,
        baca_quran,
      } = req.body;

      let body = {
        nama_ayah,
        nama_ibu,
        nama_anak,
        umur_anak,
        telepon: formatPhoneNumber(telepon),
        alamat,
        baca_quran,
      };

      const dataPesertaTahsinAnak = await PesertaTahsinAnak.create(body);

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menambahkan Data Peserta Tahsin Anak",
        data: dataPesertaTahsinAnak,
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

      const dataPesertaTahsinAnak = await PesertaTahsinAnak.findOne({
        where: {
          id,
        },
      });

      if (!dataPesertaTahsinAnak) {
        throw { name: "Id Peserta Tahsin Anak Tidak Ditemukan" };
      }

      let body = {
        nama,
        telepon: formatPhoneNumber(telepon),
        alamat,
        pekerjaan,
        umur,
        status_aktif,
      };

      await PesertaTahsinAnak.update(body, {
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Data Peserta Tahsin Anak",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const dataPesertaTahsinAnak = await PesertaTahsinAnak.findOne({
        where: {
          id,
        },
      });

      if (!dataPesertaTahsinAnak) {
        throw { name: "Id Peserta Tahsin Anak Tidak Ditemukan" };
      }

      await PesertaTahsinAnak.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Peserta Tahsin Anak",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
