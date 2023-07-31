// import express Router
const router = require("express").Router();
// import models
const { User, Blogpost, Comment } = require("../models");
// route to login
router.get("/login", (req, res) => {
  res.render("login");
});
// route to signup
router.get('/signup', (req, res) => {
  res.render('signup');
});
// route to find all blogPosts including User
router.get("/", async (req, res) => {
  try {
    const blogPosts = await Blogpost.findAll({
      include: [User],
    });
    // mapping the posts to render for readers in main view layout
    const allPosts = blogPosts.map((bp) => bp.get({ plain: true }));
    res.render("reader-home", {
      layout: "main",
      allPosts
    });
    // if error, catch & set 500 status & JSON error
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// route reading one blogPost by ID including User & Comment data
router.get("/post/:id", async (req, res) => {
  try {
    const blogPostData = await Blogpost.findByPk(req.params.id, {
      include: [
        { model: User },
        { model: Comment }
      ],
    });
    // render response in main view layout
    const blogPost = blogPostData.get({ plain: true });
    res.render("one-post", {
      layout: "main",
      blogPost
    });
    // if error, catch & set 500 status & JSON error
  } catch (err) {
    res.status(500).json(err);
  }
});
// route used for testing to view all users array; not user accessible
// router.get("/list", async (req, res) => {
//   const userData = await User.findAll().catch((err) => {
//     res.json(err);
//   });
//   const users = userData.map((user) => user.get({ plain: true }));
//   res.json(users);
// });
// export router
module.exports = router;