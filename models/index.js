// required dependencies
const BlogPost = require("./blogPost");
const Comment = require("./comments");
const User = require("./user");

// connecting models
User.hasMany(BlogPost)

BlogPost.belongTo(User, {
    foreignKey: "userID",
    onDelete: "CASCADE"
});

Comment.belongTo(User, {
    foreignKey: "userID",
    
})
