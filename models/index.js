// import models
const User = require("./user");
const Blogpost = require("./blogpost__");
const Comment = require("./comment");
// model connections
Blogpost.belongsTo(User, {
   foreignKey: 'userID',
   onDelete: 'CASCADE'
});
User.hasMany(Blogpost, {
   foreignKey: 'userID',
});
User.hasMany(Comment, {
   foreignKey: 'userID',
});
Comment.belongsTo(User, {
   foreignKey: 'userID',
   onDelete: 'CASCADE'
});
Blogpost.hasMany(Comment, {
   foreignKey: 'postID',
});
Comment.belongsTo(Blogpost, {
   foreignKey: 'postID',
   onDelete: 'CASCADE'
});
// export models
module.exports = { User, Comment, Blogpost };