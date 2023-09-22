const formatPhoneNumber = require("../helper/formatPhoneNumber");
const { comparePassword, createAccessToken } = require("../helper/helper");
const { User } = require("../models");

class Controller {
  // GET ALL USERS
  static async getAllUser(req, res, next) {
    try {
      const { limit, page, search, tanggal, status } = req.query;

      let pagination = {
        include: [],
        attributes: {
          exclude: ["password"],
        },
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
            { username: { [Op.iLike]: `%${search}%` } },
            { role: { [Op.iLike]: `%${search}%` } },
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

      let dataUser = await User.findAndCountAll(pagination);

      let totalPage = Math.ceil(dataUser.count / (limit ? limit : 50));

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data User",
        data: dataUser.rows,
        totaldataUser: dataUser.count,
        totalPage: totalPage,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET ONE USER
  static async getOneUser(req, res, next) {
    try {
      const { id } = req.params;
      const dataUser = await User.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["password"],
        },
      });

      if (!dataUser) {
        throw { name: "Id User Tidak Ditemukan" };
      }
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data User",
        data: dataUser,
      });
    } catch (error) {
      next(error);
    }
  }

  // REGISTER
  static async register(req, res, next) {
    try {
      const { username, email, password, telepon } = req.body;

      let body = {
        username,
        email,
        password,
        telepon: formatPhoneNumber(telepon),
        role: "Admin",
      };

      const dataUser = await User.create(body);

      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Menambahkan User Baru",
      });
    } catch (error) {
      next(error);
    }
  }

  // LOGIN
  static async login(req, res, next) {
    try {
      const { email, password, deviceId } = req.body;

      if (!email) {
        throw { name: "Mohon Masukkan Email" };
      }
      if (!password) {
        throw { name: "Mohon Masukkan Password" };
      }

      const dataUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!dataUser) {
        throw { name: "Email/Password Salah" };
      }

      if (!comparePassword(password, dataUser.password)) {
        throw { name: "Email/Password Salah" };
      }

      const payload = {
        id: dataUser.id,
        email: dataUser.email,
      };

      const authorization = createAccessToken(payload);

      res.status(200).json({
        statusCode: 200,
        message: "Selamat Datang " + dataUser.username,
        authorization: authorization,
        username: dataUser.username,
        email: dataUser.email,
      });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE
  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { username, email, password, telepon } = req.body;

      const dataUser = await User.findOne({
        where: {
          id,
        },
      });

      if (!dataUser) {
        throw { name: "Id User Tidak Ditemukan" };
      }

      if (dataUser.telepon != telepon) {
        const data = await User.findOne({
          where: {
            telepon: formatPhoneNumber(telepon),
          },
        });

        if (data) {
          throw { name: "Nomor Telepon Sudah Terdaftar" };
        }
      }

      let body = {
        username,
        email,
        password,
        telepon: formatPhoneNumber(telepon),
      };

      await User.update(body, {
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Data User",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const dataUser = await User.findOne({
        where: {
          id,
        },
      });

      if (!dataUser) {
        throw { name: "Id User Tidak Ditemukan" };
      }

      await User.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data User",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
