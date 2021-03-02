const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Question model
const Post = require("../../models/Post");
// User model
const User = require("../../models/User");

// @route GET api/:id
// @desc Get some user profile
router.get("/:username", (req, res) => {
  User.findOne(
    { username: req.params.username },
    { password: false, email: false, _id: false }
  )
    .orFail()
    .populate({
      path: "posts",
      match: { answer: { $exists: true } },
    })
    .exec()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.status(404).json({ msg: "Not found" }));
});

// @route GET api/account
// @desc Get user own profile
router.get("/", auth, (req, res) => {
  User.findById(req.user.id)
    .populate({ path: "posts" })
    .exec()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.status(404).json({ msg: err }));
});

module.exports = router;
