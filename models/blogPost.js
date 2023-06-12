// required dependencies
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connections");

// set up blogPost model params
class BlogPost extends Model {}

BlogPost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
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
    // future enhancement idea: take a limited portion of the blog to preview
    // preview: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "blogPost",
  }
);

// export blogPost
module.exports = BlogPost;
