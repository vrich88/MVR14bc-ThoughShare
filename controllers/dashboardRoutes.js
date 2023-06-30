// required dependencies
const router = require("express").Router();
const { BlogPost } = require("../models");
const authorize = require("../utilities/authorize");
const { post } = require("./homeRoutes");

// show blogPosts for logged in user
router.get("/", authorize, async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll({
      where: {
        userID: req.session.userID,
      },
    });
    const blogPosts = blogPostData.map((blogpost) =>
      blogpost.get({ plain: true })
    );
    res.render("allPostsAdmin", {
      layout: "dashboard",
      blogPosts,
    });
  } catch (err) {
    res.redirect("login");
  }
});

// show logged in user make new blogPost
router.get("/new", authorize, (req, res) => {
  res.render("newPost", {
    layout: "dashboard",
  });
});

// show logged in user blogPost edit
router.get("/edit/:id", authorize, async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id);
    if (blogPostData) {
      const editBlogPost = blogPostData.get({ plain: true });
      res.render("editPost", {
        layout: "dashboard",
        editBlogPost,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect("login");
  }
});

// export logged in user dashboard blogPost routers
module.exports = router;
