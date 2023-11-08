const remove = require("../helper/removeFile");
const {
  Kajian,
  KategoriKajian,
  Jadwal,
  Ustadz,
  Sequelize,
} = require("../models");
const moment = require("moment");
const { Op } = require("sequelize");

class Controller {
  // GET ALL RUTIN
  static async getAllRutin(req, res, next) {
    try {
      const { limit, page, search, tanggal, status } = req.query;

      let pagination = {
        where: {
          tipe: "RUTIN",
        },
        include: [
          {
            model: KategoriKajian,
          },
          {
            model: Ustadz,
          },
          {
            model: Jadwal,
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
            { tipe: { [Op.iLike]: `%${search}%` } },
            { nama_ustadz: { [Op.iLike]: `%${search}%` } },
            { nama_penerjemah: { [Op.iLike]: `%${search}%` } },
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

      let dataKajian = await Kajian.findAndCountAll(pagination);

      let totalPage = Math.ceil(dataKajian.count / (limit ? limit : 50));

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Kajian Rutin",
        data: dataKajian.rows,
        totaldataKajian: dataKajian.count,
        totalPage: totalPage,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET ALL
  static async getAllTablighAkbar(req, res, next) {
    try {
      const { limit, page, search, tanggal, status } = req.query;

      let pagination = {
        where: {
          tipe: "TABLIGH_AKBAR",
        },
        include: [
          {
            model: KategoriKajian,
          },
          {
            model: Ustadz,
          },
          {
            model: Jadwal,
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
            { tipe: { [Op.iLike]: `%${search}%` } },
            { nama_ustadz: { [Op.iLike]: `%${search}%` } },
            { nama_penerjemah: { [Op.iLike]: `%${search}%` } },
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

      let dataKajian = await Kajian.findAndCountAll(pagination);

      let totalPage = Math.ceil(dataKajian.count / (limit ? limit : 50));

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Kajian Tabligh Akbar",
        data: dataKajian.rows,
        totaldataKajian: dataKajian.count,
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

      const dataKajian = await Kajian.findOne({
        where: {
          id,
        },
        include: [
          {
            model: KategoriKajian,
          },
          {
            model: Ustadz,
          },
          {
            model: Jadwal,
          },
        ],
      });

      if (!dataKajian) {
        throw { name: "Id Kajian Tidak Ditemukan" };
      }

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Kajian",
        data: dataKajian,
      });
    } catch (error) {
      next(error);
    }
  }

  // CREATE
  static async craete(req, res, next) {
    try {
      const {
        tipe,
        nama_ustadz,
        nama_penerjemah,
        waktu,
        tema,
        catatan,
        waktu_kajian_rutin,
        link,
        UstadzId,
        KategoriKajianId,
        hari,
      } = req.body;

      let body = {
        tipe,
        nama_ustadz,
        nama_penerjemah,
        waktu: waktu ? waktu : null,
        tema,
        catatan,
        waktu_kajian_rutin,
        link,
        status_aktif: true,
        poster_kajian: req.file ? req.file.path : "",
      };

      if (KategoriKajianId) {
        const data = await KategoriKajian.findOne({
          where: {
            id: KategoriKajianId,
          },
        });

        if (!data) {
          throw { name: "Id Kategori Kajian Tidak Ditemukan" };
        } else {
          body.KategoriKajianId = KategoriKajianId;
        }
      }

      if (UstadzId) {
        const data = await Ustadz.findOne({
          where: {
            id: UstadzId,
          },
        });

        if (!data) {
          throw { name: "Id Ustadz Tidak Ditemukan" };
        } else {
          body.UstadzId = UstadzId;
        }
      }

      const dataKajian = await Kajian.create(body);

      if (hari || hari !== "") {
        await Jadwal.create({
          hari,
          KajianId: dataKajian.id,
        });
      }

      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Menambahkan Data Kajian",
        data: dataKajian,
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
        tipe,
        nama_ustadz,
        nama_penerjemah,
        waktu,
        tema,
        catatan,
        waktu_kajian_rutin,
        link,
        status_aktif,
        UstadzId,
        kategoriKajianId,
        hari,
      } = req.body;

      const dataKajian = await Kajian.findOne({
        where: {
          id,
        },
      });

      if (!dataKajian) {
        throw { name: "Id Kajian Tidak Ditemukan" };
      }

      let body = {
        tipe,
        nama_ustadz,
        nama_penerjemah,
        waktu,
        tema,
        catatan,
        waktu_kajian_rutin,
        link,
        status_aktif,
      };

      if (req.file) {
        remove(dataKajian.poster_kajian);
        body.poster_kajian = req.file.path;
      }

      if (kategoriKajianId) {
        const data = await kategoriKajian.findOne({
          where: {
            id: kategoriKajianId,
          },
        });

        if (!data) {
          throw { name: "Id Kategori Kajian Tidak Ditemukan" };
        } else {
          body.kategoriKajianId = kategoriKajianId;
        }
      }

      if (UstadzId) {
        const data = await Ustadz.findOne({
          where: {
            id: UstadzId,
          },
        });

        if (!data) {
          throw { name: "Id Ustadz Tidak Ditemukan" };
        } else {
          body.UstadzId = UstadzId;
        }
      }

      await Kajian.update(body, {
        where: {
          id,
        },
      });

      if (hari || hari !== "") {
        const dataJadwal = await Jadwal.findOne({
          where: {
            KajianId: id,
          },
        });

        if (dataJadwal.hari !== hari) {
          await Jadwal.destroy({
            where: {
              KajianId: id,
            },
          });

          await Jadwal.create({
            KajianId: id,
            hari,
          });
        }
      }

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Data Kajian",
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

      const dataKajian = await Kajian.findOne({
        where: {
          id,
        },
      });

      if (!dataKajian) {
        throw { name: "Id Kajian Tidak Ditemukan" };
      }

      await Kajian.update(
        { status_aktif },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Status Aktif Kajian",
      });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE LINK
  static async updateLink(req, res, next) {
    try {
      const { id } = req.params;
      const { link } = req.body;

      await Kajian.update(
        {
          link,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Link Kajian",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const dataKajian = await Kajian.findOne({
        where: {
          id,
        },
      });

      if (!dataKajian) {
        throw { name: "Id Kajian Tidak Ditemukan" };
      }

      await Kajian.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Kajian",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
