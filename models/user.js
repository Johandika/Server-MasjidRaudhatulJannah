"use strict";
const { Model } = require("sequelize");
const { hashingPassword } = require("../helper/helper");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Username Tidak Boleh Null",
          },
          notEmpty: {
            msg: "Username Tidak Boleh Kosong",
          },
        },
      },
      email: {
        unique: {
          msg: "Email Sudah Terdaftar",
        },
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Email Tidak Boleh Null",
          },
          notEmpty: {
            msg: "Email Tidak Boleh Kosong",
          },
          isEmail: {
            msg: "Mohon Masukkan Format Email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password Tidak Boleh Null",
          },
          notEmpty: {
            msg: "Password Tidak Boleh Kosong",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Role Tidak Boleh Null",
          },
          notEmpty: {
            msg: "Role Tidak Boleh Kosong",
          },
        },
      },
      telepon: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Telepon Tidak Boleh Null",
          },
          notEmpty: {
            msg: "Telepon Tidak Boleh Kosong",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((data) => {
    data.password = hashingPassword(data.password);
  });
  return User;
};
