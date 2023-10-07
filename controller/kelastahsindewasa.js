const ValidateNumber = require("../helper/validateNumber");
const {
  KelasTahsinDewasa,
  PengajarTahsin,
  PesertaTahsinDewasa,
  Jadwal,
} = require("../models");

class Controller {
  // GET ALL
  static async getAll(req, res, next) {
    try {
      const { limit, page, search, tanggal, status } = req.query;

      let pagination = {
        include: [
          {
            model: PengajarTahsin,
          },
          {
            model: Jadwal,
          },
        ],
        order: [["kelas", "ASC"]],
      };

      if (limit) {
        pagination.limit = limit;
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
      const { kelas, hari, catatan, kuota, PengajarTahsinId } = req.body;

      let body = {
        kelas,
        catatan,
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
      const { kelas, catatan, kuota, PengajarTahsinId, hari } = req.body;

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
