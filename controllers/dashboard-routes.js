// import express Router
const router = require("express").Router();
// import model
const { User, Blogpost, Comment } = require("../models");
// import authorize middleware
const authorize = require("../utils/authorize");

// find user based on id, excluding password attribute from retrieved data, including blogpost
router.get("/user-home", authorize, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Blogpost }],
    });
    // change data to a javascript object & show home dashboard with spread user data when logged in
    const user = userData.get({ plain: true });
    res.render("user-home", {
      layout: "dashboard",
      ...user,
      logged_in: true,
    });
    // catch & set status 500 & show error in json
  } catch (err) {
    res.status(500).json(err);
  }
});
// get and show the write post view through dashboard
router.get("/write-post", authorize, (req, res) => {
  res.render("write-post", {
    layout: "dashboard",
  });
});

// find blogpost based on id and show it for editing
router.get("/edit-post/:id", authorize, async (req, res) => {
  try {
    const postData = await Blogpost.findByPk(req.params.id);
    // change data to a javascript object & show home dashboard data when logged in
    const blogPost = postData.get({ plain: true });
    res.render("edit-post", {
      layout: "dashboard",
      blogPost,
    });
    // catch error and redirected to login
  } catch (err) {
    res.redirect("login");
  }
});
// export router
module.exports = router;