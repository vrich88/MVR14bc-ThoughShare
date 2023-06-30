// required dependencies
const router = require("express").Router();
const apiRoutes = require("./api/");
const homeRoutes = require("./homeRoutes");
const dashboardRoutes = require("./dashboardRoutes");

// use pathing routes
router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/api", apiRoutes);

module.exports = router;