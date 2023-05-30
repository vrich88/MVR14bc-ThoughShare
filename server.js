// establish dependencies
const path = require("path");
const express = require("express");
const session = require("express-session");
const hbs = require("express-handlebars");
const helpers = require(".utilities/helpers");
const sequelize = require("./config/connections");
const sessionStorage = require("connect-session-sequelize")(session.Store);

// set up app & port
const app = express();
const PORT = process.env.PORT || 3001;

// session storage for 5 hours (adjust by 3600 per hour)
const secretSession = {
  secret: "sus",
  cookie: {
    maxAge: 18000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new sessionStorage({
    db: sequelize,
  }),
};

// get the app using
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session(secretSession));
app.use(express.static(path.join(__dirname, "public")));
app.use(require("./controllers/"));
const views = hbs.create({ helpers });
app.engine(json());
app.set("view engine", "handlebars");

// app running console log confirmation/location
app.listen(PORT, () => {
  console.log(`Active at: ${PORT}`);
  sequelize.sync({ force: false });
});
