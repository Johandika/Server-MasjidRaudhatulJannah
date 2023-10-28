const ValidateNumber = require("../helper/validateNumber");
const {
  KelasTahsinDewasa,
  PengajarTahsin,
  PesertaTahsinDewasa,
  Jadwal,
  Sequelize,
} = require("../models");
const moment = require("moment");
const { Op } = require("sequelize");

class Controller {
  // GET ALL
  static async getAll(req, res, next) {
    try {
      const { limit, page, search, tanggal, status, tipe_kelas } = req.query;

      let pagination = {
        include: [
          {
            model: PengajarTahsin,
          },
          {
            model: Jadwal,
          },
          {
            model: PesertaTahsinDewasa,
          },
        ],
        order: [["kelas", "ASC"]],
      };

      if (limit) {
        pagination.limit = limit;
      }

      if (tipe_kelas) {
        pagination.where = {
          tipe_kelas: tipe_kelas,
        };
      }
      if (page && limit) {
        pagination.offset = (page - 1) * limit;
      }

      if (search) {
        pagination.where = {
          [Op.or]: [{ kelas: { [Op.iLike]: `%${search}%` } }],
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

      let dataKelasTahsinDewasa = await KelasTahsinDewasa.findAndCountAll(
        pagination
      );

      let totalPage = Math.ceil(
        dataKelasTahsinDewasa.count / (limit ? limit : 50)
      );

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Kelas Tahsin Dewasa",
        data: dataKelasTahsinDewasa.rows,
        totaldataKelasTahsinDewasa: dataKelasTahsinDewasa.count,
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

      const dataKelasTahsinDewasa = await KelasTahsinDewasa.findOne({
        where: {
          id,
        },
        include: [
          {
            model: PengajarTahsin,
          },
          {
            model: Jadwal,
          },
          {
            model: PesertaTahsinDewasa, // Tambahkan ini untuk menyertakan data peserta
          },
        ],
      });

      if (!dataKelasTahsinDewasa) {
        throw { name: "Id Kelas Tahsin Dewasa Tidak Ditemukan" };
      }

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Kelas Tahsin Dewasa",
        data: dataKelasTahsinDewasa,
      });
    } catch (error) {
      next(error);
    }
  }

  // CREATE
  static async craete(req, res, next) {
    try {
      const { kelas, hari, catatan, kuota, tipe_kelas, PengajarTahsinId } =
        req.body;

      let body = {
        kelas,
        catatan,
        tipe_kelas,
        kuota: ValidateNumber(kuota),
      };

      if (PengajarTahsinId) {
        const data = await PengajarTahsin.findOne({
          where: {
            id: PengajarTahsinId,
          },
        });

        if (!data) {
          throw { name: "Id Pengajar Tahsin Tidak Ditemukan" };
        }
        body.PengajarTahsinId = PengajarTahsinId;
      }

      const dataKelasTahsinDewasa = await KelasTahsinDewasa.create(body);

      const dataJadwal = await Jadwal.create({
        hari,
        KelasTahsinDewasaId: dataKelasTahsinDewasa.id,
      });

      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Menambahkan Data Kelas Tahsin Dewasa",
        data: dataKelasTahsinDewasa,
      });
    } catch (error) {
      next(error);
    }
  }

  // UDPATE
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { kelas, catatan, kuota, tipe_kelas, PengajarTahsinId, hari } =
        req.body;

      const dataKelasTahsinDewasa = await KelasTahsinDewasa.findOne({
        where: {
          id,
        },
      });

      if (!dataKelasTahsinDewasa) {
        throw { name: "Id Kelas Tahsin Dewasa Tidak Ditemukan" };
      }

      let body = {
        kelas,
        catatan,
        kuota: ValidateNumber(kuota),
        tipe_kelas,
      };

      if (PengajarTahsinId) {
        const data = await PengajarTahsin.findOne({
          where: {
            id: PengajarTahsinId,
          },
        });

        if (!data) {
          throw { name: "Id Pengajar Tahsin Tidak Ditemukan" };
        } else {
          body.PengajarTahsinId = PengajarTahsinId;
        }
      }

      await KelasTahsinDewasa.update(body, {
        where: {
          id,
        },
      });

      if (hari) {
        await Jadwal.destroy({
          where: {
            KelasTahsinDewasaId: id,
          },
        });

        await Jadwal.create({
          hari: hari,
          KelasTahsinDewasaId: id,
        });
      }

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Data Kelas Tahsin Dewasa",
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

      const dataKelasTahsinDewasa = await KelasTahsinDewasa.findOne({
        where: {
          id,
        },
      });

      if (!dataKelasTahsinDewasa) {
        throw { name: "Id Kelas Tahsin Dewasa Tidak Ditemukan" };
      }

      await KelasTahsinDewasa.update(
        { status_aktif },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Status Aktif Kelas Tahsin Dewasa",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const dataKelasTahsinDewasa = await KelasTahsinDewasa.findOne({
        where: {
          id,
        },
      });

      if (!dataKelasTahsinDewasa) {
        throw { name: "Id Kelas Tahsin Dewasa Tidak Ditemukan" };
      }

      await KelasTahsinDewasa.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Kelas Tahsin Dewasa",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
