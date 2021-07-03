const express = require("express");
const User = require("../../models/User");

const services = require("../../services/profiles");
const { ErrorHandler } = require("../../utils/errorHandler");

const getProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
    if (!username) {
      throw new ErrorHandler(404, "Missing values");
    }
    const profile = await services.getProfile(username);
    res.json(profile);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
module.exports = getProfile;
