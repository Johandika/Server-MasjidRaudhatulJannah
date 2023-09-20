const { Divisi } = require("../models");

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
            { penanggung_jawab: { [Op.iLike]: `%${search}%` } },
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

      let dataDivisi = await Divisi.findAndCountAll(pagination);

      let totalPage = Math.ceil(dataDivisi.count / (limit ? limit : 50));

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Divisi",
        data: dataDivisi.rows,
        totaldataDivisi: dataDivisi.count,
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

      const dataDivisi = await Divisi.findOne({
        where: {
          id,
        },
      });

      if (!dataDivisi) {
        throw { name: "Id Divisi Tidak Ditemukan" };
      }

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Divisi",
        data: dataDivisi,
      });
    } catch (error) {
      next(error);
    }
  }

  // CREATE
  static async craete(req, res, next) {
    try {
      const { nama, penanggung_jawab, telepon, deskripsi, catatan } = req.body;
      const dataDivisi = await Divisi.create({
        nama,
        penanggung_jawab,
        telepon,
        deskripsi,
        catatan,
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menambahkan Data Divisi " + tema,
        data: dataDivisi,
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
        penanggung_jawab,
        telepon,
        deskripsi,
        catatan,
        status_aktif,
      } = req.body;

      const dataDivisi = await Divisi.findOne({
        where: {
          id,
        },
      });

      if (!dataDivisi) {
        throw { name: "Id Divisi Tidak Ditemukan" };
      }

      await Divisi.update(
        {
          nama,
          penanggung_jawab,
          telepon,
          deskripsi,
          catatan,
          status_aktif,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Data Divisi",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const dataDivisi = await Divisi.findOne({
        where: {
          id,
        },
      });

      if (!dataDivisi) {
        throw { name: "Id Divisi Tidak Ditemukan" };
      }

      await Divisi.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Divisi",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
