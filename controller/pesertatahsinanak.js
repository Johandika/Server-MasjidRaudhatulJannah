const { literal } = require("sequelize");
const formatPhoneNumber = require("../helper/formatPhoneNumber");
const ValidateNumber = require("../helper/validateNumber");
const {
  PesertaTahsinAnak,
  KelasTahsinAnak,
  Jadwal,
  PengajarTahsin,
  sequelize,
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
            model: KelasTahsinAnak,
            include: [
              {
                model: PengajarTahsin,
              },
              {
                model: Jadwal,
              },
            ],
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
        include: [
          {
            model: KelasTahsinAnak,
            include: [
              {
                model: PengajarTahsin,
              },
              {
                model: Jadwal,
              },
            ],
          },
        ],
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
        KelasTahsinAnakId,
      } = req.body;

      let body = {
        nama_ayah,
        nama_ibu,
        nama_anak,
        umur_anak: ValidateNumber(umur_anak),
        telepon: formatPhoneNumber(telepon),
        alamat,
        baca_quran,
      };

      if (KelasTahsinAnakId) {
        const data = await KelasTahsinAnak.findOne({
          where: {
            id: KelasTahsinAnakId,
          },
        });

        if (!data) {
          throw { name: "Id Kelas Tahsin Anak Tidak Ditemukan" };
        }

        if (data.jumlah_peserta >= data.kuota) {
          throw {
            name: "Maaf Kuota Kelas Tahsin Sudah Penuh",
            kelas: "Anak",
          };
        }

        body.KelasTahsinAnakId = KelasTahsinAnakId;
      }

      const dataPesertaTahsinAnak = await PesertaTahsinAnak.create(body);

      await KelasTahsinAnak.update(
        {
          jumlah_peserta: sequelize.literal("jumlah_peserta + 1"),
        },
        {
          where: {
            id: KelasTahsinAnakId,
          },
        }
      );

      res.status(201).json({
        statusCode: 201,
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
      const {
        nama_ayah,
        nama_ibu,
        nama_anak,
        umur_anak,
        telepon,
        alamat,
        baca_quran,
        status_aktif,
        KelasTahsinAnakId,
      } = req.body;

      const dataPesertaTahsinAnak = await PesertaTahsinAnak.findOne({
        where: {
          id,
        },
      });

      if (!dataPesertaTahsinAnak) {
        throw { name: "Id Peserta Tahsin Anak Tidak Ditemukan" };
      }

      let body = {
        nama_ayah,
        nama_ibu,
        nama_anak,
        umur_anak: ValidateNumber(umur_anak),
        telepon: formatPhoneNumber(telepon),
        alamat,
        baca_quran,
        status_aktif,
      };

      if (KelasTahsinAnakId) {
        const data = await KelasTahsinAnak.findOne({
          where: {
            id: KelasTahsinAnakId,
          },
        });

        if (!data) {
          throw { name: "Id Kelas Tahsin Anak Tidak Ditemukan" };
        }

        body.KelasTahsinAnakId = KelasTahsinAnakId;
      }

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

  // UPDATE STATUS AKTIF
  static async updateStatusAktif(req, res, next) {
    try {
      const { id } = req.params;
      const { status_aktif } = req.body;

      const dataPesertaTahsinAnak = await PesertaTahsinAnak.findOne({
        where: {
          id,
        },
      });

      if (!dataPesertaTahsinAnak) {
        throw { name: "Id Peserta Tahsin Anak Tidak Ditemukan" };
      }

      await PesertaTahsinAnak.update(
        { status_aktif },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Status Aktif Peserta Tahsin Anak",
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

      await KelasTahsinAnak.update(
        {
          jumlah_peserta: sequelize.literal("jumlah_peserta - 1"),
        },
        {
          where: {
            id: dataPesertaTahsinAnak.KelasTahsinAnakId,
          },
        }
      );

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
