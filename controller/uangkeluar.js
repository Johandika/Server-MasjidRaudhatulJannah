const {
  RekeningDonasi,
  UangMasuk,
  UangKeluar,
  sequelize,
} = require("../models");

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
            { keterangan: { [Op.iLike]: `%${search}%` } },
            { informasi: { [Op.iLike]: `%${search}%` } },
          ],
        };
      }

      if (tanggal) {
        const pagi = moment().format(`${tanggal} 00:00`);
        const Keluar = moment().format(`${tanggal} 23:59`);
        pagination.where = {
          createdAt: {
            [Op.between]: [pagi, Keluar],
          },
        };
      }

      let dataUangKeluar = await UangKeluar.findAndCountAll(pagination);

      let totalPage = Math.ceil(dataUangKeluar.count / (limit ? limit : 50));

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Uang Keluar",
        data: dataUangKeluar.rows,
        totaldataUangKeluar: dataUangKeluar.count,
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

      const dataUangKeluar = await UangKeluar.findOne({
        where: {
          id,
        },
      });

      if (!dataUangKeluar) {
        throw { name: "Id Uang Keluar Tidak Ditemukan" };
      }

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Uang Keluar",
        data: dataUangKeluar,
      });
    } catch (error) {
      next(error);
    }
  }

  // CREATE
  static async create(req, res, next) {
    try {
      const { total, waktu, keterangan, informasi, RekeningDonasiId } =
        req.body;

      let body = {
        total,
        waktu: waktu ? waktu : new Date(),
        keterangan,
        informasi,
      };

      if (RekeningDonasiId) {
        const data = await RekeningDonasi.findOne({
          where: {
            id: RekeningDonasiId,
          },
        });

        if (!data) {
          throw { name: "Id Rekening Donasi Tidak Ditemukan" };
        }

        if (+data.saldo < +total) {
          throw { name: "Maaf Saldo Tidak Cukup" };
        }

        body.RekeningDonasiId = RekeningDonasiId;
      }

      const dataUangKeluar = await UangKeluar.create(body);

      await RekeningDonasi.update(
        {
          saldo: sequelize.literal(`saldo - ${total}`),
        },
        {
          where: {
            id: RekeningDonasiId,
          },
        }
      );

      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Menambahkan Data Uang Keluar",
        data: dataUangKeluar,
      });
    } catch (error) {
      next(error);
    }
  }

  // UDPATE
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { total, keterangan, informasi, RekeningDonasiId } = req.body;

      const dataUangKeluar = await UangKeluar.findOne({
        where: {
          id,
        },
      });

      if (!dataUangKeluar) {
        throw { name: "Id Uang Keluar Tidak Ditemukan" };
      }

      let body = {
        total,
        keterangan,
        informasi,
      };

      let selisih = 0;

      if (RekeningDonasiId) {
        const data = await RekeningDonasi.findOne({
          where: {
            id: RekeningDonasiId,
          },
        });

        if (!data) {
          throw { name: "Id Rekening Donasi Tidak Ditemukan" };
        }

        selisih = +total - +dataUangKeluar.total;

        if (+data.saldo - +selisih < 0) {
          throw { name: "Maaf Saldo Tidak Cukup" };
        }

        body.RekeningDonasiId = RekeningDonasiId;
      }

      await RekeningDonasi.update(
        {
          saldo: sequelize.literal(`saldo - ${selisih}`),
        },
        {
          where: {
            id: RekeningDonasiId,
          },
        }
      );

      await UangKeluar.update(body, {
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Data Uang Keluar",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const dataUangKeluar = await UangKeluar.findOne({
        where: {
          id,
        },
      });

      if (!dataUangKeluar) {
        throw { name: "Id Uang Keluar Tidak Ditemukan" };
      }

      await UangKeluar.destroy({
        where: {
          id,
        },
      });
      await RekeningDonasi.update(
        {
          saldo: sequelize.literal(`saldo + ${dataUangKeluar.total}`),
        },
        {
          where: {
            id: dataUangKeluar.RekeningDonasiId,
          },
        }
      );

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Uang Keluar",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
