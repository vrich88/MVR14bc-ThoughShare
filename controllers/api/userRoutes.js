// required dependencies
const router = require("express").Router();
const { User } = require("../../models");

// make new user begin session
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
    // catch error to tell what was wrong
  } catch (err) {
    res.status(400).json(err);
  }
});

// log into ThoughtShare BlogPost
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });
    // check for existing
    if (!userData) {
      res.status(400).json({ message: "Error...Account NOT found" });
      return;
    }
    // check for matching password
    const goodPassword = await userData.checkPassword(req.body.password);
    if (!goodPassword) {
      res.status(400).json({ message: "Error...Account NOT found" });
      return;
    }
    // if good log in and begin session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: "Hello...Successful log in" });
    });
    // catch error to tell what was wrong
  } catch (err) {
    res.status(400).json(err);
  }
});

// log out of ThoughtShare BlogPost
router.post("/logout", (req, res) => {
  // on log out destroy session data
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
    // return an error if something wrong
  } else {
    res.status(404).json({ message: "Goodbye...Successful log out" }).end();
  }
});

module.exports = router;
