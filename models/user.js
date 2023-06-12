// required dependencies
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connections");

// password input verification
class User extends Model {
  checkPassword(passwordInput) {
    return bcrypt.compareSync(passwordInput, this.password);
  }
}

// set up user model params and hooks
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        is: [
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&#$^-=+_])[A-Za-zd@$!%*?&]{8,}$",
        ],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updateUserData) => {
        updateUserData.password = await bcrypt.hash(updateUserData, 10);
        return updateUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

// export user
module.exports = User;
