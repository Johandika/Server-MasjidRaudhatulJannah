const { LinkKajianRutin, Kajian } = require("../models");

class Controller {
  // GET ALL
  static async getAll(req, res, next) {
    try {
      const { limit, page, search, tanggal, status } = req.query;

      let pagination = {
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
          [Op.or]: [{ sub_tema: { [Op.iLike]: `%${search}%` } }],
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

      let dataLinkKajianRutin = await LinkKajianRutin.findAndCountAll(
        pagination
      );

      let totalPage = Math.ceil(
        dataLinkKajianRutin.count / (limit ? limit : 50)
      );

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Link Kajian Rutin",
        data: dataLinkKajianRutin.rows,
        totaldataLinkKajianRutin: dataLinkKajianRutin.count,
        totalPage: totalPage,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET ALL BY KAJIAN ID
  static async getAllByKajianId(req, res, next) {
    try {
      const { KajianId } = req.params;
      const { limit, page, search, tanggal, status } = req.query;

      let pagination = {
        order: [["createdAt", "DESC"]],
      };

      let tema = "";
      if (KajianId) {
        const data = await Kajian.findOne({
          where: {
            id: KajianId,
          },
        });
        if (!data) {
          throw { name: "Id Kajian Tidak Ditemukan" };
        }

        tema = data.tema;
        pagination.where = {
          KajianId: KajianId,
        };
      }

      if (limit) {
        pagination.limit = limit;
      }

      if (page && limit) {
        pagination.offset = (page - 1) * limit;
      }

      if (search) {
        pagination.where = {
          [Op.or]: [{ sub_tema: { [Op.iLike]: `%${search}%` } }],
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

      let dataLinkKajianRutin = await LinkKajianRutin.findAndCountAll(
        pagination
      );

      let totalPage = Math.ceil(
        dataLinkKajianRutin.count / (limit ? limit : 50)
      );

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Link Kajian Rutin " + tema,
        data: dataLinkKajianRutin.rows,
        totaldataLinkKajianRutin: dataLinkKajianRutin.count,
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

      const dataLinkKajianRutin = await LinkKajianRutin.findOne({
        where: {
          id,
        },
      });

      if (!dataLinkKajianRutin) {
        throw { name: "Id Link Kajian Tidak Ditemukan" };
      }

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Link Kajian",
        data: dataLinkKajianRutin,
      });
    } catch (error) {
      next(error);
    }
  }

  // CREATE
  static async create(req, res, next) {
    try {
      const { sub_tema, link_kajian, KajianId } = req.body;

      let body = { sub_tema, link_kajian };

      if (KajianId) {
        const data = await Kajian.findOne({
          where: {
            id: KajianId,
          },
        });
        if (!data) {
          throw { name: "Id Kajian Tidak Ditemukan" };
        }
        body.KajianId = KajianId;
      }

      const dataLinkKajianRutin = await LinkKajianRutin.create(body);

      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Menambahkan Data Link Kajian",
        data: dataLinkKajianRutin,
      });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE
  static async update(req, res, next) {
    try {
      const { id } = req.params;

      const { sub_tema, link_kajian } = req.body;

      const dataLinkKajianRutin = await LinkKajianRutin.findOne({
        where: {
          id,
        },
      });

      if (!dataLinkKajianRutin) {
        throw { name: "Id Link Kajian Tidak Ditemukan" };
      }

      let body = { sub_tema, link_kajian };

      await LinkKajianRutin.update(body, {
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Data Link Kajian",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const dataLinkKajianRutin = await LinkKajianRutin.findOne({
        where: {
          id,
        },
      });

      if (!dataLinkKajianRutin) {
        throw { name: "Id Link Kajian Tidak Ditemukan" };
      }

      await LinkKajianRutin.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Link Kajian",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
