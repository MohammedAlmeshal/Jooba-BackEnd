const express = require("express");
const User = require("../../models/User");

const services = require("../../services/profiles");
const { ErrorHandler } = require("../../utils/errorHandler");

const getOwnProfile = async (req, res, next) => {
  try {
    const { user } = req;
    if (!user.id) {
      throw new ErrorHandler(404, "Missing values");
    }
    const profile = await services.getOwnProfile(user.id);
    res.json(profile);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = getOwnProfile;
