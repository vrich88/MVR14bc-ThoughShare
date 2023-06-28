// required dependencies
const router = require("express").Router();
const userRoutes = require("./userRoutes");
const postRoutes = require("./blogPostRoutes");
const commentRoutes = require("./commentRoutes");

// use pathing routes
router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/comment", commentRoutes);

// export router for api
module.exports = router;