// import express Router
const router = require("express").Router();
// import model
const { Blogpost } = require("../../models");
// import authorize middleware
const authorize = require("../../utils/authorize");
// route to create blogPost after collecting properties of post & userID
router.post("/", authorize, async (req, res) => {
  const body = req.body;
  try {
    const post = await Blogpost.create({
      ...body,
      userID: req.session.user_id,
    });
    // if good, set 200 status & JSON post
    res.status(200).json(post);
  } catch (err) {
    // if error, catch & set 400 status & JSON error
    res.status(400).json(err);
  }
});
// route to find one blogpost by ID
router.get("/:id", async (req, res) => {
  try {
    const postData = await Blogpost.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(postData);
    // if error, catch & set 500 status & JSON error
  } catch (err) {
    res.status(500).json(err);
  }
});
// route to update one blogPost by ID
router.put("/:id", authorize, (req, res) => {
  try {
    const updated = Blogpost.update(
      {
        ...req.body,
        userID: req.session.user_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!updated) {
      // if NO update, set 404 status & JSON failed message
      res.status(404).json({
        message: `Update failed, try again`,
      });
      return;
    }
    // if good, set 200 status & JSON post
    res.status(200).json(updated);
  } catch (err) {
    // if error, catch & set 500 status & JSON error
    res.status(500).json(err);
  }
});
// route to delete blogPost by ID
router.delete("/:id", authorize, async (req, res) => {
  try {
    const deletedPost = await Blogpost.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedPost) {
      // if NO delete, set 404 status & JSON failed message
      res.status(404).json({
        message: `Post deletion failed, it's too strong`,
      });
      return;
    }
    // if good, set 200 status & JSON post
    res.status(200).json(deletedPost);
  } catch (err) {
    // if error, catch & set 500 status & JSON error
    res.status(500).json(err);
  }
});
// export router
module.exports = router;
