const {
  KelasTahsinAnak,
  PengajarTahsin,
  PesertaTahsinAnak,
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

      let dataKelasTahsinAnak = await KelasTahsinAnak.findAndCountAll(
        pagination
      );

      let totalPage = Math.ceil(
        dataKelasTahsinAnak.count / (limit ? limit : 50)
      );

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Kelas Tahsin Anak",
        data: dataKelasTahsinAnak.rows,
        totaldataKelasTahsinAnak: dataKelasTahsinAnak.count,
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

      const dataKelasTahsinAnak = await KelasTahsinAnak.findOne({
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

      if (!dataKelasTahsinAnak) {
        throw { name: "Id Kelas Tahsin Anak Tidak Ditemukan" };
      }

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Kelas Tahsin Anak",
        data: dataKelasTahsinAnak,
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
        kuota,
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

      const dataKelasTahsinAnak = await KelasTahsinAnak.create(body);

      const dataJadwal = await Jadwal.create({
        hari,
        KelasTahsinAnakId: dataKelasTahsinAnak.id,
      });

      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Menambahkan Data Kelas Tahsin Anak",
        data: dataKelasTahsinAnak,
      });
    } catch (error) {
      next(error);
    }
  }

  // UDPATE
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { kelas, catatan, kuota, PengajarTahsinId, PesertaTahsinAnakId } =
        req.body;

      const dataKelasTahsinAnak = await KelasTahsinAnak.findOne({
        where: {
          id,
        },
      });

      if (!dataKelasTahsinAnak) {
        throw { name: "Id Kelas Tahsin Anak Tidak Ditemukan" };
      }

      let body = {
        kelas,
        catatan,
        kuota,
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

      if (PesertaTahsinAnakId) {
        const data = await PesertaTahsinAnak.findOne({
          where: {
            id: PesertaTahsinAnakId,
          },
        });

        if (!data) {
          throw { name: "Id Peserta Tahsin Anak Tidak Ditemukan" };
        } else {
          body.PesertaTahsinAnakId = PesertaTahsinAnakId;
        }
      }

      await KelasTahsinAnak.update(body, {
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Data Kelas Tahsin Anak",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const dataKelasTahsinAnak = await KelasTahsinAnak.findOne({
        where: {
          id,
        },
      });

      if (!dataKelasTahsinAnak) {
        throw { name: "Id Kelas Tahsin Anak Tidak Ditemukan" };
      }

      await KelasTahsinAnak.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Kelas Tahsin Anak",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
