// import Sequelize
const Sequelize = require("sequelize");
// use .env file
require("dotenv").config();
// make sequelize variable
let sequelize;
// check if JAWSDB_URL exists & if yes create new Sequelize & else create new with local .env
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    }
  );
}
// export sequelize
module.exports = sequelize;