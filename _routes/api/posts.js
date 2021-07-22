const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const isPostOwner = require("../../middleware/isOwner");
const posts = require("../../_controllers/posts");

// @route POST api/posts
// @desc Create a post "Ask a question"
// @accsess Public
router.post("/:username", posts.askQuestion);

// @route POST api/posts/:id
// @desc Answer a post "Answer a question"
// @accsess Private
router.post("/answer/:id", auth, isPostOwner, posts.answerQuestion);

// @route DELETE api/posts
// @desc DELETE a post "a question"
// @accsess Private
router.delete("/:id", auth, isPostOwner, posts.ignoreQuestion);

module.exports = router;
