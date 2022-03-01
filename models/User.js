const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      roleName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "applicant"
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "First name field is required"
          }
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Last name field is required"
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: "Email is not valid"
          },
          notEmpty: {
            args: true,
            msg: "Email field is required"
          }
        }
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Password field is required"
          }
        }
      }
    },
    { paranoid: true }
  );

  //  relationship
  User.associate = function (models) {};

  // instance method
  User.prototype.generateJwtToken = function () {
    return jwt.sign(
      {
        id: this.id,
        isAdmin: this.isAdmin,
        roleName: this.roleName
      },
      process.env.APP_TOKEN_KEY,
      {
        expiresIn: "2d"
      }
    );
  };

  User.prototype.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};
