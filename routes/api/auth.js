const express = require("express");
const router = express.Router();
const authenticate = require("../../middleware/auth");
const auth = require("../../controllers/auth");

// @route POST api/auth
// @desc Auth user (login)
// @access Public
router.post("/", auth.login);

router.post("/signup", auth.signup);

// @route GET api/auth/user
// @desc Get user data
// @access Private
router.get("/user", authenticate, auth.getUser);

module.exports = router;
