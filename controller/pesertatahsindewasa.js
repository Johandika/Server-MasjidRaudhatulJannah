const { literal } = require("sequelize");
const formatPhoneNumber = require("../helper/formatPhoneNumber");
const ValidateNumber = require("../helper/validateNumber");
const {
  PesertaTahsinDewasa,
  KelasTahsinDewasa,
  PengajarTahsin,
  Jadwal,
  sequelize,
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
        include: [
          {
            model: KelasTahsinDewasa,
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
      const { nama, telepon, alamat, pekerjaan, umur, KelasTahsinDewasaId } =
        req.body;

      let body = {
        nama,
        telepon: formatPhoneNumber(telepon),
        alamat,
        pekerjaan,
        umur: ValidateNumber(umur),
      };

      if (KelasTahsinDewasaId) {
        const data = await KelasTahsinDewasa.findOne({
          where: {
            id: KelasTahsinDewasaId,
          },
        });

        if (!data) {
          throw { name: "Id Kelas Tahsin Dewasa Tidak Ditemukan" };
        }
        if (data.jumlah_peserta >= data.kuota) {
          throw {
            name: "Maaf Kuota Kelas Tahsin Sudah Penuh",
            kelas: "Dewasa",
          };
        }

        body.KelasTahsinDewasaId = KelasTahsinDewasaId;
      }

      const dataPesertaTahsinDewasa = await PesertaTahsinDewasa.create(body);

      await KelasTahsinDewasa.update(
        {
          jumlah_peserta: sequelize.literal("jumlah_peserta + 1"),
        },
        {
          where: {
            id: KelasTahsinDewasaId,
          },
        }
      );

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
        nama,
        telepon,
        alamat,
        pekerjaan,
        umur,
        KelasTahsinDewasaId,
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
        nama,
        telepon: formatPhoneNumber(telepon),
        alamat,
        pekerjaan,
        umur: ValidateNumber(umur),
        status_aktif,
      };

      if (KelasTahsinDewasaId) {
        const data = await KelasTahsinDewasa.findOne({
          where: {
            id: KelasTahsinDewasaId,
          },
        });

        if (!data) {
          throw { name: "Id Kelas Tahsin Dewasa Tidak Ditemukan" };
        }

        body.KelasTahsinDewasaId = KelasTahsinDewasaId;
      }

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

  // UPDATE STATUS AKTIF
  static async updateStatusAktif(req, res, next) {
    try {
      const { id } = req.params;
      const { status_aktif } = req.body;

      const dataPesertaTahsinDewasa = await PesertaTahsinDewasa.findOne({
        where: {
          id,
        },
      });

      if (!dataPesertaTahsinDewasa) {
        throw { name: "Id Peserta Tahsin Dewasa Tidak Ditemukan" };
      }

      await PesertaTahsinDewasa.update(
        { status_aktif },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Status Aktif Peserta Tahsin Dewasa",
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

      await KelasTahsinDewasa.update(
        {
          jumlah_peserta: sequelize.literal("jumlah_peserta - 1"),
        },
        {
          where: {
            id: dataPesertaTahsinDewasa.KelasTahsinDewasaId,
          },
        }
      );

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
