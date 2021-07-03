const express = require("express");
const User = require("../../models/User");

const services = require(".");
const { ErrorHandler } = require("../../utils/errorHandler");

const getOwnProfile = async (id) => {
  const profile = await User.findById(id).populate({ path: "posts" }).exec();
  if (!profile) {
    throw new ErrorHandler(404, "Error in getting profile");
  } else {
    return profile;
  }
};

module.exports = getOwnProfile;
