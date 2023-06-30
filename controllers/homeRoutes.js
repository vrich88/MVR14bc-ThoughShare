// required dependencies
const router = require("express").Router();
const { User, BlogPost, Comment } = require("../models");
// const authorize = require("../utilities/authorize");

// show blogPosts
router.get("/", async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll({
      include: [User],
    });
    const blogPosts = blogPostData.map((blogpost) => blogpost.get({ plain: true }));
    res.render("allPosts", { blogPosts });
  } catch (err) {
    res.status(500).json(err);
  }
});

// show one blogPost
router.get("/post/:id", async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });
    if (blogPostData) {
      const singleBlogPost = blogPostData.get({ plain: true });
      res.render("singlePost", { singleBlogPost });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// export home page routers
module.exports = router;
