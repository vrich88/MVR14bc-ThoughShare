// required dependencies
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connections");

// set up comments model
class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 250],
      },
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
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

// export model
module.exports = Comment;
