const ValidateFloat = require("../helper/validateFloat");
const { RekeningDonasi, UangMasuk, UangKeluar } = require("../models");

class Controller {
  // GET ALL
  static async getAll(req, res, next) {
    try {
      const { limit, page, search, tanggal, status } = req.query;

      let pagination = {
        include: [
          {
            separate: true,
            model: UangKeluar,
            order: [["createdAt", "DESC"]],
          },
          {
            separate: true,
            model: UangMasuk,
            order: [["createdAt", "DESC"]],
          },
        ],
        order: [["atas_nama", "ASC"]],
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
            { atas_nama: { [Op.iLike]: `%${search}%` } },
            { nomor_rekening: { [Op.iLike]: `%${search}%` } },
            { catatan: { [Op.iLike]: `%${search}%` } },
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

      let dataRekeningDonasi = await RekeningDonasi.findAndCountAll(pagination);

      let totalPage = Math.ceil(
        dataRekeningDonasi.count / (limit ? limit : 50)
      );

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Rekening Donasi",
        data: dataRekeningDonasi.rows,
        totaldataRekeningDonasi: dataRekeningDonasi.count,
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

      const dataRekeningDonasi = await RekeningDonasi.findOne({
        where: {
          id,
        },
      });

      if (!dataRekeningDonasi) {
        throw { name: "Id Rekening Donasi Tidak Ditemukan" };
      }

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Rekening Donasi",
        data: dataRekeningDonasi,
      });
    } catch (error) {
      next(error);
    }
  }

  // CREATE
  static async craete(req, res, next) {
    try {
      const { atas_nama, nomor_rekening, catatan, nama_bank, saldo } = req.body;

      let body = {
        atas_nama,
        nomor_rekening,
        catatan,
        nama_bank,
        saldo: ValidateFloat(saldo),
      };

      const dataRekeningDonasi = await RekeningDonasi.create(body);

      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Menambahkan Data Rekening Donasi",
        data: dataRekeningDonasi,
      });
    } catch (error) {
      next(error);
    }
  }

  // UDPATE
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { atas_nama, nomor_rekening, nama_bank, catatan, saldo } = req.body;

      const dataRekeningDonasi = await RekeningDonasi.findOne({
        where: {
          id,
        },
      });

      if (!dataRekeningDonasi) {
        throw { name: "Id Rekening Donasi Tidak Ditemukan" };
      }

      let body = {
        atas_nama,
        nomor_rekening,
        catatan,
        nama_bank,
        saldo: ValidateFloat(saldo),
      };

      await RekeningDonasi.update(body, {
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Data Rekening Donasi",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const dataRekeningDonasi = await RekeningDonasi.findOne({
        where: {
          id,
        },
      });

      if (!dataRekeningDonasi) {
        throw { name: "Id Rekening Donasi Tidak Ditemukan" };
      }

      await RekeningDonasi.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Rekening Donasi",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
