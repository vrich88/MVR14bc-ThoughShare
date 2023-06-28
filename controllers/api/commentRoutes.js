// required dependencies
const router = require("express").Router();
const { Comment } = require("../../models");
const authorize = require("../../utilities/authorize");

// add comment to blogPost
router.post("/", authorize, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            userID: req.session.user_id,
        });
    res.json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// export router for comments
module.exports = router;