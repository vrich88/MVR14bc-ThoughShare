// importing express Router
const router = require('express').Router();
// import routes
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const dashRoutes = require('./dashboard-routes');
// make routes use paths
router.use('/', homeRoutes);
router.use('/dashboard', dashRoutes);
router.use('/api', apiRoutes);
// export router
module.exports = router;