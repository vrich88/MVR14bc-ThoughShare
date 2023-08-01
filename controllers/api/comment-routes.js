// import express Router 
const router = require("express").Router();
// import Comment model
const { Comment } = require("../../models");
// import the authorize middleware
const authorize = require("../../utils/authorize");
// route to post comment
router.post("/", authorize, async (req, res) => {
  try {
    const comment = await Comment.create({
      // spread operator for request properties with userID
      ...req.body,
      userID: req.session.userID,
    });
    // returns response as new comment JSON
    res.json(comment);
    // if error, set 500 status & JSON error
  } catch (err) {
    res.status(500).json(err);
  }
});
// export router
module.exports = router;