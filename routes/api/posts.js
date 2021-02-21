const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const isPostOwner = require("../../middleware/isOwner");

// Question model
const Post = require("../../models/Post");
// User model
const User = require("../../models/User");

// @route POST api/posts
// @desc Create a post "Ask a question"
// @accsess Public
router.post("/:username", (req, res) => {
  User.findOne({ username: req.params.username })
    .then((user) => {
      const newPost = new Post({
        question: {
          questionTxt: req.body.question,
        },
        questionTo: user,
      });

      newPost.save().then((post) => {
        user.posts.push(post);
        user.save();
        res.json(post);
      });
    })
    .catch((err) => res.status(404).json({ msg: err }));
});
// @route POST api/posts/:id
// @desc Answer a post "Answer a question"
// @accsess Private
router.post("/answer/:id", auth, isPostOwner, (req, res) => {
  const update = {
    answer: {
      answerTxt: req.body.answer,
    },
  };
  Post.findOneAndUpdate(
    { _id: req.params.id, answer: { $exists: false } },
    update,
    { new: true }
  )
    .then((post) => res.json(post))
    .catch((err) => res.status(404).json({ msg: err }));
});

// @route DELETE api/posts
// @desc DELETE a post "a question"
// @accsess Private
router.delete("/:id", auth, isPostOwner, (req, res) => {
  Post.findById(req.params.id)
    .then((post) => post.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
