const express = require("express");
const router = express.Router();
const { requireAuthentication, requireAdmin } = require("../../config/auth");
// import models

const Post = require("../../models/Post");

// @route GET api/posts/
// @desc get all posts in most recent order
// @access only for admin
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts));
});

router.get("/:id", (req, res) => {
  const postId = req.params.id;

  Post.findById(postId).then(post => {
    if (!post) return res.status(400).json({ msg: "Post doesn't exist" });
    res.json(post);
  });
});

// @route POST api/posts/submit
// @desc submit a post
// @access only for admin
router.post("/submit", requireAuthentication, requireAdmin, (req, res) => {
  userId = req.user._id;
  const { body, language, title } = req.body;
  if (!userId || !body || !language || !title) {
    return res.status(400).json({ msg: "Missing field" });
  }

  const newPost = new Post({
    userId: userId,
    title: title,
    body: body,
    language: language,
    author: `${req.user.first} ${req.user.last}`
  });

  newPost.save().then(post => {
    res.json(post);
  });
});

module.exports = router;
