const express = require("express");
const router = express.Router();
const authenticate = require("../../middleware/auth");

const profiles = require("../../_controllers/profiles");

// @route GET /
// @desc Get user own profile
router.get("/", authenticate, profiles.getOwnProfile);

// @route GET api/:id
// @desc Get some user profile
router.get("/:username", profiles.getProfile);

module.exports = router;
