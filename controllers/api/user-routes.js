// importing express Router
const router = require("express").Router();
// importing model
const { User } = require("../../models");
// route to signup new user from provided data & login & start session
router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      // if good, set 200 status & JSON user
      res.status(200).json(userData);
    });
    // if error, catch & set 400 status & JSON error
  } catch (err) {
    res.status(400).json(err);
  }
});
// route to login & start session
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });
    if (!userData) {
      res
        // if NO user to login, set 400 status & JSON alert message
        .status(400)
        .json({ alert: "User not found" });
      return;
    }
    // if wrong password to login, set 400 status & JSON message
    const correctPassword = await userData.checkPassword(req.body.password);
    if (!correctPassword) {
      res
        .status(400)
        .json({ message: "Password Incorrect" });
      return;
    }
    // if good, login & JSON message
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: "You're in" });
    });
  } catch (err) {
    // if error, catch & set 400 status & JSON error
    res.status(400).json(err);
  }
});
// route to logout and delete session
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      // if good, set 204 status & end
      res.status(204).end();
    });
  } else {
    // if NO logout, set 404 status & end
    res.status(404).end();
  }
});
// export router
module.exports = router;
