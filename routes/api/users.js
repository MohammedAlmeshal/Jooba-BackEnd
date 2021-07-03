const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");
const Post = require("../../models/Post");

// @route POST api/users
// @desc Rigister new users
// @access Public
router.post("/", (req, res) => {
  const { name, username, email, password } = req.body;

  //simple validation
  if (!name || !username || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  // check if user exist
  User.findOne({ $or: [{ email }, { username }] }).then((user) => {
    if (user) {
      res.status(400).json({ msg: "User alreday exisit" });
    }
    const newUser = new User({
      name,
      username,
      email,
      password,
    });
    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        // create first question
        const newPost = new Post({
          question: {
            questionTxt:
              "This is your first question! you can choose to reply or to ignore...",
          },
          questionTo: newUser,
        });

        newPost.save().then((post) => {
          newUser.posts.push(post);

          newUser.save().then((user) => {
            // create token and expire in 1 hour
           const token = jwt.sign(
              {
                id: user.id,
              },
              config.get("jwtSecret"),
              { expiresIn: 3600 },
    
            );
          });
        });
      });
    });
  });
});

module.exports = router;
