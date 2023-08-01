// import Sequelize components
const { Model, DataTypes } = require("sequelize");
// import sequelize configs
const sequelize = require("../config/connection");
// make Blogpost class extend Model
class Blogpost extends Model {}
// Blogpost model
Blogpost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userID: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "blogpost",
  }
);
// export Blogpost model
module.exports = Blogpost;
