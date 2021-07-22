const express = require("express");
const User = require("../../models/User");

const services = require(".");
const { ErrorHandler } = require("../../utils/errorHandler");

const getProfile = async (username) => {
  let profile;

  profile = await User.findOne(
    { username },
    { password: false, email: false, _id: false }
  ).populate({
    path: "posts",
    match: { answer: { $exists: true } },
  });

  if (!profile) {
    throw new ErrorHandler(404, "Error in getting profile");
  } else {
    return profile;
  }
};
module.exports = getProfile;
