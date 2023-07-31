// import Sequelize components
const { Model, DataTypes } = require("sequelize");
// import sequelize configs
const sequelize = require("../config/connection");
// import bcrypt
const bcrypt = require("bcrypt");
// make User class extend Model
class User extends Model {
  checkPassword(passwordInput) {
    return bcrypt.compareSync(passwordInput, this.password);
  }
}
// User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 23],
      },
    },
  },
  {
    // add bcrypt hash to password
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);
// export User model
module.exports = User;
