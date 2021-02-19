const express = require("express");
const router = express.Router();
// const auth = require('../../middleware/auth')

// Question model
const Post = require("../../models/Post");

// @route GET api/posts
// @desc Get All posts "should be get all USER questions"
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts));
});

// @route POST api/posts
// @desc Create a post "Ask a question"
// @accsess Public
router.post("/", (req, res) => {
  const newPost = new Post({
    question: {
      questionTxt: req.body.question,
    },
  });
  newPost.save().then((post) => res.json(post));
});
// @route POST api/posts/:id
// @desc Answer a post "Answer a question"
// @accsess Public
router.post("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => post.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
