// required dependencies
const router = require("express").Router();
const { BlogPost } = require("../../models");
const authorize = require("../../utils/authorize");

// add new blogPost
router.post("/", authorize, async (req, res) => {
  try {
    const newBlogPost = await BlogPost.create({
      ...req.body,
      userID: req.session.user_id,
    });
    res.status(200).json(newBlogPost);
    // catch error if something wrong
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete blogPost
router.delete("/:id", authorize, async (req, res) => {
  try {
    const blogPostData = await BlogPost.destroy({
      where: { id: req.params.id },
    });
    // if unable to destroy
    if (!blogPostData) {
      res.status(404).json({
        message: "Error...unable to remove BlogPost",
      });
      return;
    }
    res.status(200).json(blogPostData);
    // catch error if something wrong
  } catch (err) {
    res.status(500).json(err);
  }
});

// update blogPost
router.put("/:id", (req, res) => {
    BlogPost.update({
        ...req.body,
        userID: req.session.user_id
    },
    {
        where: { id: req.params.id }
    })
    // .then (() => )
})

// export routes
module.exports = router;