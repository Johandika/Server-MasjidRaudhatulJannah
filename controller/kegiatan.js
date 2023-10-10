const remove = require("../helper/removeFile");
const { Kegiatan, Divisi } = require("../models");

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
            { penanggung_jawab: { [Op.iLike]: `%${search}%` } },
            { tema: { [Op.iLike]: `%${search}%` } },
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

      let dataKegiatan = await Kegiatan.findAndCountAll(pagination);

      let totalPage = Math.ceil(dataKegiatan.count / (limit ? limit : 50));

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Kegiatan",
        data: dataKegiatan.rows,
        totaldataKegiatan: dataKegiatan.count,
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

      const dataKegiatan = await Kegiatan.findOne({
        where: {
          id,
        },
      });

      if (!dataKegiatan) {
        throw { name: "Id Kegiatan Tidak Ditemukan" };
      }

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Kegiatan",
        data: dataKegiatan,
      });
    } catch (error) {
      next(error);
    }
  }

  // CREATE
  static async craete(req, res, next) {
    try {
      const {
        tema,
        penanggung_jawab,
        waktu,
        lokasi,
        deskripsi_gambar,
        catatan,
        deskripsi,
        link,
        headline,
        DivisiId,
      } = req.body;

      let body = {
        tema,
        penanggung_jawab,
        waktu: waktu ? waktu : new Date(),
        lokasi,
        gambar_kegiatan: req.file ? req.file.path : "",
        deskripsi_gambar,
        catatan,
        deskripsi,
        link,
        headline,
      };

      if (DivisiId) {
        const data = await Divisi.findOne({
          where: {
            id: DivisiId,
          },
        });

        if (!data) {
          throw { name: "Id Divisi Tidak Ditemukan" };
        } else {
          body.DivisiId = DivisiId;
        }
      }

      const dataKegiatan = await Kegiatan.create(body);

      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Menambahkan Data Kegiatan",
        data: dataKegiatan,
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
        tema,
        penanggung_jawab,
        waktu,
        lokasi,
        deskripsi_gambar,
        catatan,
        deskripsi,
        link,
        headline,
        DivisiId,
        status_aktif,
      } = req.body;

      const dataKegiatan = await Kegiatan.findOne({
        where: {
          id,
        },
      });

      if (!dataKegiatan) {
        throw { name: "Id Kegiatan Tidak Ditemukan" };
      }

      let body = {
        tema,
        penanggung_jawab,
        waktu: waktu ? waktu : new Date(),
        lokasi,
        deskripsi_gambar,
        catatan,
        deskripsi,
        link,
        headline,
        status_aktif,
      };

      if (req.file) {
        remove(dataKegiatan.gambar_kegiatan);
        body.gambar_kegiatan = req.file ? req.file.path : "";
      }

      if (DivisiId) {
        const data = await Divisi.findOne({
          where: {
            id: DivisiId,
          },
        });

        if (!data) {
          throw { name: "Id Divisi Tidak Ditemukan" };
        } else {
          body.DivisiId = DivisiId;
        }
      }

      await Kegiatan.update(body, {
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Data Kegiatan",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const dataKegiatan = await Kegiatan.findOne({
        where: {
          id,
        },
      });

      if (!dataKegiatan) {
        throw { name: "Id Kegiatan Tidak Ditemukan" };
      }

      remove(dataKegiatan.gambar_kegiatan);

      await Kegiatan.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Kegiatan",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
