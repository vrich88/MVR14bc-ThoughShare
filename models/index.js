// required dependencies
const BlogPost = require("./blogPost");
const Comment = require("./comments");
const User = require("./user");

// connecting models
User.hasMany(BlogPost, {
  foreignKey: "userID",
  onDelete: "CASCADE",
});

BlogPost.belongTo(User, {
  foreignKey: "userID",
  onDelete: "CASCADE",
});

BlogPost.hasMany(Comment, {
  foreignKey: "blogID",
  onDelete: "CASCADE",
});

Comment.belongTo(BlogPost, {
  foreignKey: "blogID",
  onDelete: "CASCADE",
});

User.hasMany(Comment, {
  foreignKey: "userID",
  onDelete: "CASCADE",
});

Comment.belongTo(User, {
  foreignKey: "userID",
  onDelete: "CASCADE",
});

module.exports = { BlogPost, Comment, User };
