const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const User = require("../../models/User");

// @route POST api/auth
// @desc Auth user (login)
// @access Public
router.post("/", (req, res) => {
  const { username, password } = req.body;

  //simple validation
  if ( !username  || !password) {
    return res.status(400).json({ msg: "missing username or password" });
  }
  // check if user exist by username or email
  User.findOne({ $or: [{ email:username }, { username }] }).then((user) => {
    if (!user) {
      res.status(400).json({ msg: "User does not exsist" });
    }
    // validate pasword
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
      jwt.sign(
        {
          id: user.id,
        },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token: token,
            user: {
              id: user.id,
              username: user.username,
            },
          });
        }
      );
    });
  });
});

// @route GET api/auth/user
// @desc Get user data
// @access Private
router.get('/user',auth,(req,res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
})

module.exports = router;
